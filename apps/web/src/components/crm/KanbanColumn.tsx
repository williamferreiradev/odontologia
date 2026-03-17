"use client"

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { KanbanCard } from "./KanbanCard"
import { Lead } from "@/components/shared/PatientDetailsPanel"

interface KanbanColumnProps {
    id: string
    title: string
    items: Lead[]
    onViewDetails?: (lead: Lead) => void
}

export function KanbanColumn({ id, title, items, onViewDetails }: KanbanColumnProps) {
    const { setNodeRef, isOver } = useDroppable({
        id,
    })

    const itemsIds = items.map(item => item.id)

    return (
        <div
            ref={setNodeRef}
            className={`rounded-xl border border-gray-200 p-4 min-w-[320px] max-w-[320px] flex flex-col h-full transition-colors ${isOver ? 'bg-blue-50/50 border-blue-200' : 'bg-slate-100/50'
                }`}
        >
            {/* Column Header */}
            <div className="flex justify-between items-center mb-4 select-none">
                <h3 className="font-bold text-gray-900 text-sm tracking-wide">{title}</h3>
                <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                    {items.length}
                </span>
            </div>

            {/* Column Content Area */}
            <div className="flex-1 flex flex-col gap-3 overflow-y-auto scrollbar-hide">
                <SortableContext
                    items={itemsIds}
                    strategy={verticalListSortingStrategy}
                >
                    {items.map((lead) => (
                        <KanbanCard key={lead.id} lead={lead} onViewDetails={onViewDetails} />
                    ))}
                </SortableContext>

                {items.length === 0 && (
                    <div className="text-center p-4 border-2 border-dashed border-gray-200 rounded-lg text-sm text-gray-400">
                        Nenhum paciente
                    </div>
                )}
            </div>
        </div>
    )
}
