"use client"

import { useState } from "react"
import { Search, Filter } from "lucide-react"

interface PatientsHeaderProps {
    searchTerm: string
    onSearchChange: (value: string) => void
    statusFilter: string
    onFilterChange: (value: string) => void
    dateRange: { from: string, to: string }
    onDateRangeChange: (range: { from: string, to: string }) => void
}

export function PatientsHeader({
    searchTerm,
    onSearchChange,
    statusFilter,
    onFilterChange,
    dateRange,
    onDateRangeChange
}: PatientsHeaderProps) {
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    // Local state for popover inputs before applying
    const [localFrom, setLocalFrom] = useState(dateRange.from)
    const [localTo, setLocalTo] = useState(dateRange.to)

    const handleApplyFilter = () => {
        onDateRangeChange({ from: localFrom, to: localTo })
        setIsFilterOpen(false)
    }

    const handleClearFilter = () => {
        setLocalFrom('')
        setLocalTo('')
        onDateRangeChange({ from: '', to: '' })
        setIsFilterOpen(false)
    }

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Pacientes</h1>
                <p className="text-gray-500 mt-1">Navegue, pesquise e filtre todo o banco de pacientes da clínica.</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
                {/* Search Input */}
                <div className="relative w-full sm:w-64">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm text-gray-900"
                        placeholder="Buscar nome ou telefone..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>

                {/* Status Filter */}
                <select
                    value={statusFilter}
                    onChange={(e) => onFilterChange(e.target.value)}
                    className="block w-full sm:w-40 py-2 px-3 border border-gray-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm text-gray-700 cursor-pointer"
                >
                    <option value="Todos">Todos os Status</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Aprovado">Aprovado</option>
                    <option value="Travado">Travado</option>
                </select>

                {/* Date Filter Popover Container */}
                <div className="relative">
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className={`flex items-center justify-center p-2 border border-gray-200 rounded-lg bg-white transition-colors shadow-sm ${isFilterOpen || (dateRange.from || dateRange.to) ? 'text-blue-600 border-blue-200 bg-blue-50' : 'text-gray-500 hover:text-blue-600 hover:bg-gray-50'
                            }`}
                        title="Filtrar por Período"
                    >
                        <Filter className="w-5 h-5" />
                    </button>

                    {/* Popover */}
                    {isFilterOpen && (
                        <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 shadow-xl rounded-xl p-5 z-50">
                            <h4 className="font-bold text-gray-900 text-sm">Filtros Avançados</h4>
                            <p className="text-xs text-gray-500 mt-0.5 mb-4">Filtrar por Período de Entrada</p>

                            <div className="flex flex-col gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1">De:</label>
                                    <input
                                        type="date"
                                        value={localFrom}
                                        onChange={(e) => setLocalFrom(e.target.value)}
                                        className="block w-full py-2 px-3 border border-gray-200 bg-white rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1">Até:</label>
                                    <input
                                        type="date"
                                        value={localTo}
                                        onChange={(e) => setLocalTo(e.target.value)}
                                        className="block w-full py-2 px-3 border border-gray-200 bg-white rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mt-5">
                                <button
                                    onClick={handleClearFilter}
                                    className="flex-1 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                                >
                                    Limpar
                                </button>
                                <button
                                    onClick={handleApplyFilter}
                                    className="flex-1 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition-colors"
                                >
                                    Aplicar
                                </button>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}
