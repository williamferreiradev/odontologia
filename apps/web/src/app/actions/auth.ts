"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function signUpAction(formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const fullName = formData.get("name") as string
    const inviteClinicId = formData.get("inviteClinicId") as string | null
    const clinicName = formData.get("clinicName") as string | null

    const supabase = createClient()

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
                ...(inviteClinicId ? { invite_clinic_id: inviteClinicId } : { clinic_name: clinicName })
            }
        }
    })

    if (error) {
        return { error: error.message }
    }

    redirect("/dashboard")
}
