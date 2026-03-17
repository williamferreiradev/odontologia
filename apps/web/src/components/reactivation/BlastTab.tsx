"use client"

import { useState } from "react"
import { UploadCloud, Sparkles, Send } from "lucide-react"

export default function BlastTab() {
    const mockLeads = [
        { id: 1, name: "Ana Clara Moreira", treatment: "Cobertura Duplex", daysInactive: 15, tag: "Sem resposta", tagColor: "amber" },
        { id: 2, name: "Dr. Paulo Ribeiro", treatment: "Casa de Condomínio", daysInactive: 22, tag: "Esfriou", tagColor: "blue" },
        { id: 3, name: "Juliana Ferreira", treatment: "Apartamento Luxo", daysInactive: 30, tag: "Sem resposta", tagColor: "amber" },
        { id: 4, name: "Marcos Vinícius", treatment: "Loteamento Exclusivo", daysInactive: 18, tag: "Esfriou", tagColor: "blue" },
        { id: 5, name: "Patrícia Gomes", treatment: "Mansão", daysInactive: 45, tag: "Sem resposta", tagColor: "amber" },
        { id: 6, name: "Ricardo Santos", treatment: "Cobertura Duplex", daysInactive: 12, tag: "Esfriou", tagColor: "blue" },
    ]

    const [selectedIds, setSelectedIds] = useState<number[]>([])

    const handleSelectAll = () => {
        if (selectedIds.length === mockLeads.length) {
            setSelectedIds([])
        } else {
            setSelectedIds(mockLeads.map(lead => lead.id))
        }
    }

    const handleSelectOne = (id: number) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(selectedId => selectedId !== id))
        } else {
            setSelectedIds([...selectedIds, id])
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Coluna Esquerda */}
            <div className="lg:col-span-2 flex flex-col gap-6">
                {/* Upload CSV */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col gap-4">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900">
                        <UploadCloud className="w-4 h-4 text-blue-600" />
                        Importar Base (CSV)
                    </h3>
                    <div className="border-dashed border-2 border-gray-200 bg-slate-50/50 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition-colors">
                        <p className="text-sm font-medium text-gray-400 flex items-center gap-2">
                            <UploadCloud className="w-4 h-4" />
                            Arraste ou clique para enviar CSV
                        </p>
                    </div>
                </div>

                {/* Lista */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
                    <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-white">
                        <div className="flex items-center gap-2">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                            <span className="text-sm font-bold text-gray-900">Interessados Inativos</span>
                            <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full text-xs font-bold">{mockLeads.length}</span>
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <span className="text-xs font-semibold text-gray-500 group-hover:text-gray-700 transition-colors">Selecionar todos</span>
                            <input
                                type="checkbox"
                                checked={selectedIds.length === mockLeads.length && mockLeads.length > 0}
                                onChange={handleSelectAll}
                                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 bg-white cursor-pointer"
                            />
                        </label>
                    </div>
                    <div className="max-h-96 overflow-y-auto flex flex-col divide-y divide-gray-100">

                        {mockLeads.map(lead => (
                            <label key={lead.id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.includes(lead.id)}
                                        onChange={() => handleSelectOne(lead.id)}
                                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 bg-white cursor-pointer"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-[15px] font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{lead.name}</span>
                                        <span className="text-xs text-gray-400 font-medium mt-0.5">{lead.treatment} - {lead.daysInactive} dias atrás</span>
                                    </div>
                                </div>
                                <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border border-${lead.tagColor}-100/50 bg-${lead.tagColor}-50 text-${lead.tagColor}-600`}>
                                    {lead.tag}
                                </span>
                            </label>
                        ))}

                    </div>
                </div>
            </div>

            {/* Coluna Direita */}
            <div className="flex flex-col gap-6">
                {/* Mensagem */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-4">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        Mensagem de Reativação
                    </h3>
                    <textarea
                        className="w-full h-32 p-4 bg-slate-50 border border-gray-200 rounded-xl text-sm text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all leading-relaxed"
                        defaultValue="Olá, [Nome]! Tudo bem? Vi que você demonstrou interesse em nossos tratamentos odontológicos exclusivos recentemente. Temos novas novidades e horários disponíveis. Gostaria de agendar uma avaliação?"
                    />
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-[11px] text-gray-400 font-medium flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3" />
                            A IA vai personalizar a mensagem com o nome do lead e produto de interesse.
                        </p>
                    </div>
                </div>

                {/* Resumo */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col">
                    <h3 className="text-[15px] font-bold text-gray-900 mb-5">Resumo do Disparo</h3>
                    <div className="flex flex-col gap-3.5 mb-8">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500 font-medium">Selecionados</span>
                            <span className="text-sm font-bold text-gray-900">{selectedIds.length} {selectedIds.length === 1 ? 'lead' : 'leads'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500 font-medium">CSV Importado</span>
                            <span className="text-sm font-bold text-gray-900">Não</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500 font-medium">Follow-up</span>
                            <span className="text-sm font-bold text-emerald-600">Ativo</span>
                        </div>
                    </div>
                    <button
                        disabled={selectedIds.length === 0}
                        className={`w-full h-12 flex items-center justify-center gap-2 rounded-xl font-bold transition-all text-sm shadow-sm ${selectedIds.length > 0
                                ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md cursor-pointer'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                            }`}
                    >
                        <Send className="w-4 h-4" />
                        Iniciar Reativação
                    </button>
                </div>
            </div>
        </div>
    )
}
