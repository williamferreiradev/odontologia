import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { PatientDataTable } from "@/components/patients/PatientDataTable"
import { Lead } from "@/components/shared/PatientDetailsPanel"

export default async function PatientsPage() {
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

    // 3. Buscar Pacientes (Leads)
    let patients: Lead[] = []
    if (clinicId) {
        const { data } = await supabase
            .from('leads')
            .select('*')
            .eq('clinic_id', clinicId)
            .order('created_at', { ascending: false })

        if (data) patients = data
    }

    return (
        <div className="p-8 w-full min-h-screen flex flex-col gap-6">
            {/* Header Simples Temporário para substituir Components antigos travados no Client State */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Base de Pacientes</h1>
                    <p className="text-gray-500 mt-1">Gerencie todos os pacientes registrados na clínica.</p>
                </div>
            </div>

            {/* Data Table Dinâmica */}
            <div className="w-full">
                <PatientDataTable initialData={patients} />
            </div>
        </div>
    )
}
