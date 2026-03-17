"use client"

import { useState } from "react"
import { CrmHeader } from "./CrmHeader"
import { KanbanBoard, ColumnsKey } from "./KanbanBoard"
import { ListView } from "./ListView"
import { Lead } from "@/components/shared/PatientDetailsPanel"

interface CRMViewManagerProps {
    leads: Lead[]
}

export function CRMViewManager({ leads }: CRMViewManagerProps) {
    const [view, setView] = useState<'kanban' | 'list'>('kanban')

    // Agrupar Leads por Stage para o Kanban
    const initialColumns: Record<ColumnsKey, Lead[]> = {
        novo: leads.filter(l => l.stage === 'novo'),
        qualificando: leads.filter(l => l.stage === 'qualificando'),
        qualificado: leads.filter(l => l.stage === 'qualificado'),
        fechado: leads.filter(l => l.stage === 'fechado'),
    }

    return (
        <div className="p-8 w-full h-full flex flex-col gap-6">
            <CrmHeader viewMode={view} onViewChange={setView} />

            {/* Main CRM Area rendering dynamically */}
            <div className="flex-1 w-full min-h-0 overflow-hidden">
                {view === 'kanban' ? (
                    <KanbanBoard initialData={initialColumns} />
                ) : (
                    <ListView leads={leads} />
                )}
            </div>
        </div>
    )
}
