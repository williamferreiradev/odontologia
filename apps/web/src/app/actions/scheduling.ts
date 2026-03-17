"use server"

import { createClient } from "@/lib/supabase/server"

function timeToMins(timeStr: string | null | undefined): number {
    if (!timeStr) return 0
    const [h, m] = timeStr.split(':').map(Number)
    return h * 60 + m
}

function minsToTime(mins: number): string {
    const h = Math.floor(mins / 60).toString().padStart(2, '0')
    const m = (mins % 60).toString().padStart(2, '0')
    return `${h}:${m}`
}

export async function getAvailableSlots(date: string, durationMinutes: number = 30) {
    const supabase = createClient()

    // 1. Get Clinic ID
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    const { data: userData } = await supabase
        .from('users')
        .select('clinic_id')
        .eq('id', user.id)
        .single()

    const clinicId = userData?.clinic_id
    if (!clinicId) return []

    // 2. Parse Day of Week (0 = Sunday, 1 = Monday, etc)
    // Usamos T12:00:00 para evitar que problemas de timezone pulem um dia para trás
    const parsedDate = new Date(date + 'T12:00:00')
    const dayOfWeek = parsedDate.getDay()

    // 3. Fetch Clinic Hours
    const { data: hours } = await supabase
        .from('clinic_hours')
        .select('*')
        .eq('clinic_id', clinicId)
        .eq('day_of_week', dayOfWeek)
        .single()

    if (!hours || hours.is_closed) {
        return [] // Clínica não abre neste dia ou não está configurada
    }

    // 4. Fetch Appointments for the date
    const { data: appointments } = await supabase
        .from('appointments')
        .select('*')
        .eq('clinic_id', clinicId)
        .eq('appointment_date', date)

    // 5. Build Intervals
    const openMins = timeToMins(hours.open_time)
    const closeMins = timeToMins(hours.close_time)

    let lunchStartMins: number | null = null
    let lunchEndMins: number | null = null

    if (hours.lunch_start && hours.lunch_end) {
        lunchStartMins = timeToMins(hours.lunch_start)
        lunchEndMins = timeToMins(hours.lunch_end)
    }

    const availableSlots: string[] = []

    for (let current = openMins; current + durationMinutes <= closeMins; current += durationMinutes) {
        const slotStart = current
        const slotEnd = current + durationMinutes

        // Check lunch collision (if slot overlaps strictly with lunch break)
        if (lunchStartMins !== null && lunchEndMins !== null) {
            if (slotStart < lunchEndMins && slotEnd > lunchStartMins) {
                continue // Pula horário de almoço
            }
        }

        // Check appointment collisions
        let hasCollision = false
        if (appointments) {
            for (const app of appointments) {
                const appStart = timeToMins(app.start_time)
                const appEnd = timeToMins(app.end_time)

                if (slotStart < appEnd && slotEnd > appStart) {
                    hasCollision = true
                    break
                }
            }
        }

        if (hasCollision) {
            continue
        }

        // Se chegou até aqui, o slot está livre
        availableSlots.push(minsToTime(slotStart))
    }

    return availableSlots
}
