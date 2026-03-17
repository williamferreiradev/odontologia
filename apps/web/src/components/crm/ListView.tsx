"use client"

import { useState } from "react"
import { Eye, MessageSquare } from "lucide-react"
import { Lead, PatientDetailsPanel } from "@/components/shared/PatientDetailsPanel"

const getStatusBadge = (status?: string) => {
    switch (status?.toLowerCase()) {
        case 'novo':
            return "bg-clinic-50 text-clinic-700 border-clinic-200"
        case 'qualificando':
            return "bg-amber-50 text-amber-700 border-amber-200"
        case 'qualificado':
            return "bg-emerald-50 text-emerald-700 border-emerald-200"
        case 'fechado':
            return "bg-gray-100 text-gray-700 border-gray-300"
        default:
            return "bg-gray-50 text-gray-700 border-gray-200"
    }
}

interface ListViewProps {
    leads: Lead[]
}

export function ListView({ leads }: ListViewProps) {
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleViewDetails = (lead: Lead) => {
        setSelectedLead(lead)
        setIsModalOpen(true)
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden w-full h-full flex flex-col">
            <div className="overflow-x-auto flex-1 h-full scrollbar-hide">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold sticky top-0 z-10">
                        <tr>
                            <th scope="col" className="px-6 py-4">Nome do Paciente</th>
                            <th scope="col" className="px-6 py-4">Origem</th>
                            <th scope="col" className="px-6 py-4">Estágio</th>
                            <th scope="col" className="px-6 py-4">Valor Esperado</th>
                            <th scope="col" className="px-6 py-4">Status IA</th>
                            <th scope="col" className="px-6 py-4 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {leads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 font-bold text-gray-900">{lead.name}</td>
                                <td className="px-6 py-4 text-gray-600 capitalize">{lead.source || 'Manual'}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 text-xs font-medium rounded-md border ${getStatusBadge(lead.stage)} capitalize`}>
                                        {lead.stage || 'Novo'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-600 font-medium">
                                    {lead.expected_value
                                        ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(lead.expected_value)
                                        : 'R$ 0,00'}
                                </td>
                                <td className="px-6 py-4 text-gray-500">
                                    {lead.agent_active ? (
                                        <span className="text-xs font-semibold text-clinic-600 bg-clinic-50 border border-clinic-100 px-2.5 py-1 rounded-md">Ativa</span>
                                    ) : (
                                        <span className="text-xs font-medium text-gray-400 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-md">Pausada</span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-3">
                                        <button
                                            onClick={() => handleViewDetails(lead)}
                                            className="text-gray-500 p-1.5 rounded-md transition-colors hover:bg-clinic-50 hover:text-clinic-600"
                                            title="Ver Detalhes"
                                        >
                                            <Eye className="w-5 h-5" />
                                        </button>
                                        <button
                                            className={`p-1.5 rounded-md transition-colors ${lead.agent_active ? 'text-clinic-600 bg-clinic-50 shadow-sm' : 'text-gray-400 hover:bg-clinic-50 hover:text-clinic-600'}`}
                                            title={lead.agent_active ? "IA acompanhando via Chat" : "Abrir Chat"}
                                        >
                                            <MessageSquare className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {leads.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                                    Nenhum paciente encontrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <PatientDetailsPanel
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                patient={selectedLead}
            />
        </div>
    )
}
