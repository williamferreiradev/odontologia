import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

import { AgendaViewManager } from "@/components/agenda/AgendaViewManager"

export default async function AgendaPage({
    searchParams
}: {
    searchParams: { date?: string }
}) {
    const supabase = createClient()

    // 1. Auth Validation
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        redirect('/login')
    }

    // 2. Load Clinic ID
    const { data: userData } = await supabase
        .from('users')
        .select('clinic_id')
        .eq('id', user.id)
        .single()

    const clinicId = userData?.clinic_id
    if (!clinicId) {
        // Fallback robusto caso não tenhamos clinic_id amarrado (deveria estar, mas previne quebra)
        return <div className="p-8">Configuração da Clínica Incompleta</div>
    }

    // 3. Define target Date
    // Se não passou param, pega "hoje" real no fuso
    const today = new Date().toISOString().split('T')[0]
    const targetDate = searchParams.date || today

    const titleDate = targetDate === today
        ? "Hoje"
        : new Date(targetDate + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })

    // 4. Fetch Appointments (All for now, so calendar week/month views work)
    const { data: appointments } = await supabase
        .from('appointments')
        .select(`
            *,
            leads ( id, name, phone ),
            procedures ( id, name )
        `)
        .eq('clinic_id', clinicId) // ISOLAMENTO DA CLÍNICA
        .order('start_time', { ascending: true })

    // 5. Fetch Leads to populate the New Appointment Modal
    const { data: leads } = await supabase
        .from('leads')
        .select('id, clinic_id, name, phone, stage, source, about, created_at, expected_value, agent_active')
        .eq('clinic_id', clinicId)
        .order('name', { ascending: true })

    const apps = appointments || []
    const leadsList = leads || []

    return (
        <AgendaViewManager
            date={targetDate}
            titleDate={titleDate}
            appointments={apps}
            leads={leadsList}
        />
    )
}
