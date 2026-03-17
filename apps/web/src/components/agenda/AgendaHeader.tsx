"use client"

import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface AgendaHeaderProps {
    currentDate: Date
    view: 'month' | 'week' | 'day'
    onViewChange: (view: 'month' | 'week' | 'day') => void
    onNavigate: (action: 'PREV' | 'NEXT' | 'TODAY') => void
    totalToday: number
    pendingToday: number
}

export function AgendaHeader({
    currentDate,
    view,
    onViewChange,
    onNavigate,
    totalToday,
    pendingToday
}: AgendaHeaderProps) {
    const formattedDate = format(currentDate, "MMMM yyyy", { locale: ptBR })
    const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Left Area - Title & Badge */}
            <div className="flex items-center gap-4 border-r border-gray-200 pr-6">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Agenda</h1>
                <div className="flex items-center justify-center bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full border border-blue-100">
                    Hoje: {totalToday} consultas ({pendingToday} pendentes)
                </div>
            </div>

            {/* Center Area - Navigation */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => onNavigate('TODAY')}
                    className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
                >
                    Hoje
                </button>
                <div className="flex items-center">
                    <button
                        onClick={() => onNavigate('PREV')}
                        className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="w-40 text-center font-bold text-gray-900 capitalize">
                        {capitalizedDate}
                    </span>
                    <button
                        onClick={() => onNavigate('NEXT')}
                        className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Right Area - View Toggle */}
            <div className="flex items-center bg-gray-100/80 p-1 rounded-lg border border-gray-200 shadow-inner">
                <button
                    onClick={() => onViewChange('month')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${view === 'month'
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                        }`}
                >
                    Mês
                </button>
                <button
                    onClick={() => onViewChange('week')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${view === 'week'
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                        }`}
                >
                    Semana
                </button>
                <button
                    onClick={() => onViewChange('day')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${view === 'day'
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                        }`}
                >
                    Dia
                </button>
            </div>
        </div>
    )
}
