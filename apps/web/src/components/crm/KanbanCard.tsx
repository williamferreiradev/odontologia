"use client"

import { Eye, MessageSquare, Clock, GripVertical } from "lucide-react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { MouseEvent } from "react"
import { Lead } from "@/components/shared/PatientDetailsPanel"

interface KanbanCardProps {
    lead: Lead
    onViewDetails?: (lead: Lead) => void
}

export function KanbanCard({ lead, onViewDetails }: KanbanCardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: lead.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    // Stop propagation on action buttons so dragging doesn't trigger
    const stopPropagation = (e: MouseEvent) => {
        e.stopPropagation()
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`bg-white border rounded-lg p-4 group flex flex-col gap-3 relative select-none touch-none ${isDragging ? 'opacity-50 z-50 shadow-xl ring-2 ring-blue-500 border-blue-500' : 'border-gray-200 shadow-sm hover:shadow-md transition-shadow'}`}
        >
            {/* Header Area */}
            <div className="flex items-start gap-2">
                <div
                    className="mt-1 text-gray-300 group-hover:text-gray-500"
                >
                    <GripVertical className="w-4 h-4" />
                </div>
                <div>
                    <h4 className="font-bold text-gray-900">{lead.name}</h4>
                    <p className="text-sm text-gray-500 mt-0.5 capitalize">{lead.source || 'Lead Manual'}</p>
                </div>
            </div>

            {/* Value & Info Area */}
            <div className="flex items-center justify-between mt-1 pl-6">
                {lead.expected_value ? (
                    <span className="text-sm font-semibold text-gray-700 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(lead.expected_value)}
                    </span>
                ) : (
                    <span className="text-sm font-semibold text-gray-400 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                        R$ 0,00
                    </span>
                )}

                {lead.created_at && (
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(lead.created_at).toLocaleDateString('pt-BR')}</span>
                    </div>
                )}
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100 w-full mt-1 mb-1"></div>

            {/* Action Area */}
            <div className="flex items-center justify-between pl-6">
                {lead.agent_active ? (
                    <span className="text-xs font-semibold text-clinic-600 bg-clinic-50 border border-clinic-100 px-2 rounded-md">IA Ativa</span>
                ) : (
                    <span className="text-xs font-medium text-gray-400">Ações Rápidas</span>
                )}

                <div className="flex items-center gap-2">
                    <button
                        onPointerDown={stopPropagation}
                        onClick={() => onViewDetails && onViewDetails(lead)}
                        className="text-gray-400 p-1.5 rounded-md transition-colors hover:bg-clinic-50 hover:text-clinic-600"
                        title="Ver Detalhes do Paciente"
                    >
                        <Eye className="w-4 h-4" />
                    </button>
                    <button
                        onPointerDown={stopPropagation}
                        className={`p-1.5 rounded-md transition-colors ${lead.agent_active ? 'text-clinic-600 bg-clinic-50 shadow-sm' : 'text-gray-400 hover:bg-clinic-50 hover:text-clinic-600'}`}
                        title={lead.agent_active ? "IA acompanhando via Chat" : "Abrir Chat"}
                    >
                        <MessageSquare className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}
