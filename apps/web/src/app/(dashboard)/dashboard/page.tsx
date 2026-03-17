import { Users, Calendar, Kanban, Activity, Download } from "lucide-react"
import { StatCard } from "@/components/dashboard/StatCard"
import { RecentLeads } from "@/components/dashboard/RecentLeads"
import { BaseButton } from "@/components/ui/BaseButton"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
    const supabase = createClient()

    // 1. Validar Usuário Logado e redirecionar
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // 2. Buscar `clinic_id` do usuário
    const { data: userData } = await supabase
        .from('users')
        .select('clinic_id')
        .eq('id', user.id)
        .single()

    const clinicId = userData?.clinic_id

    // Fallback counts and lists
    let totalLeads = 0
    let convertedLeads = 0
    let activeLeads = 0
    let recentLeadsList: any[] = []

    if (clinicId) {
        // 3. Buscar métricas do banco de dados vinculados à clínica do usuário
        const [
            { count: totalCount },
            { count: convertedCount },
            { count: activeCount },
            { data: recentDesc }
        ] = await Promise.all([
            // Total Leads
            supabase.from('leads').select('*', { count: 'exact', head: true }).eq('clinic_id', clinicId),
            // leads Fechados
            supabase.from('leads').select('*', { count: 'exact', head: true }).eq('clinic_id', clinicId).eq('stage', 'fechado'),
            // leads Em Qualificação / Novos
            supabase.from('leads').select('*', { count: 'exact', head: true }).eq('clinic_id', clinicId).in('stage', ['qualificando', 'novo']),
            // Últimos 5 Leads recentes do DB
            supabase.from('leads').select('*').eq('clinic_id', clinicId).order('created_at', { ascending: false }).limit(5)
        ])

        totalLeads = totalCount || 0
        convertedLeads = convertedCount || 0
        activeLeads = activeCount || 0
        recentLeadsList = recentDesc || []
    }

    // 4. Calcular Taxa de Conversão
    const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(0) : 0

    return (
        <div className="p-8 w-full flex flex-col gap-6">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Visão Geral</h1>
                </div>
                <BaseButton variant="secondary" className="gap-2">
                    <Download className="w-4 h-4" />
                    Baixar Relatório
                </BaseButton>
            </div>

            {/* KPIs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                <StatCard
                    title="Total de Pacientes"
                    value={totalLeads.toString()}
                    icon="users"
                    description="Pacientes cadastrados"
                    trend={{ value: "Geral", positive: true }}
                />
                <StatCard
                    title="Em Negociação"
                    value={activeLeads.toString()}
                    icon="kanban"
                    description="Pacientes ativos no pipeline"
                />
                <StatCard
                    title="Avaliações"
                    value={convertedLeads.toString()}
                    icon="calendar"
                    description="Total de pacientes ganhos"
                />
                <StatCard
                    title="Taxa de Fechamento"
                    value={`${conversionRate}%`}
                    icon="activity"
                    description="Pacientes / Fechados"
                    trend={{ value: "No geral", positive: true }}
                />
            </div>

            {/* Main Content Area */}
            <div className="w-full">
                {/* Note: In Next.js 14, modals and handlers must be inside Client Components.
                    You will need to wrap RecentLeads inside a Client wrapper if you want to
                    keep passing `onViewDetails` to it, or keep the state inside RecentLeads itself. */}
                <RecentLeads leads={recentLeadsList} />
            </div>
        </div>
    )
}
