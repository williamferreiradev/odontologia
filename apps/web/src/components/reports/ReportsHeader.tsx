"use client"

import { Download } from "lucide-react"

export function ReportsHeader() {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Relatórios de Desempenho</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Análise completa de conversões, atendimentos e origem de pacientes.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm rounded-lg p-1">
                    <input
                        type="date"
                        title="De"
                        lang="pt-BR"
                        className="px-2 py-1.5 text-sm text-gray-700 bg-transparent border-none focus:ring-0 outline-none cursor-pointer"
                    />
                    <span className="text-gray-300 font-medium">-</span>
                    <input
                        type="date"
                        title="Até"
                        lang="pt-BR"
                        className="px-2 py-1.5 text-sm text-gray-700 bg-transparent border-none focus:ring-0 outline-none cursor-pointer"
                    />
                </div>

                <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold shadow-sm hover:bg-blue-700 hover:shadow transition-all whitespace-nowrap">
                    <Download className="w-4 h-4" />
                    Exportar CSV
                </button>
            </div>
        </div>
    )
}
