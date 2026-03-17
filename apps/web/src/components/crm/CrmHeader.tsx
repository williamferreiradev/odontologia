"use client"

import { LayoutGrid, List, Plus } from "lucide-react"
import { BaseButton } from "@/components/ui/BaseButton"

interface CrmHeaderProps {
    viewMode: 'kanban' | 'list'
    onViewChange?: (mode: 'kanban' | 'list') => void
}

export function CrmHeader({ viewMode, onViewChange }: CrmHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Pipeline de Pacientes</h1>
                <p className="text-gray-500 mt-1">Gerencie suas negociações e acompanhe o funil de vendas da clínica.</p>
            </div>

            <div className="flex items-center gap-4">
                {/* View Toggle */}
                <div className="flex items-center bg-gray-100/80 p-1 rounded-lg border border-gray-200 shadow-inner">
                    <button
                        onClick={() => onViewChange && onViewChange('kanban')}
                        className={`flex items-center justify-center p-2 rounded-md transition-all ${viewMode === 'kanban'
                            ? "bg-white text-gray-900 shadow-sm"
                            : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                            }`}
                        title="Visualização Kanban"
                    >
                        <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onViewChange && onViewChange('list')}
                        className={`flex items-center justify-center p-2 rounded-md transition-all ${viewMode === 'list'
                            ? "bg-white text-gray-900 shadow-sm"
                            : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                            }`}
                        title="Visualização em Lista"
                    >
                        <List className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}
