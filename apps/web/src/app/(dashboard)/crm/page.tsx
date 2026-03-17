import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Lead } from "@/components/shared/PatientDetailsPanel"
import { CRMViewManager } from "@/components/crm/CRMViewManager"

export default async function CrmPage() {
    const supabase = createClient()

    // 1. Validar Usuário
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // 2. Buscar clinic_id
    const { data: userData } = await supabase
        .from('users')
        .select('clinic_id')
        .eq('id', user.id)
        .single()

    const clinicId = userData?.clinic_id

    // 3. Buscar Leads
    let leads: Lead[] = []
    if (clinicId) {
        const { data } = await supabase
            .from('leads')
            .select('*')
            .eq('clinic_id', clinicId)
            .order('created_at', { ascending: false })

        if (data) leads = data
    }

    return <CRMViewManager leads={leads} />
}
