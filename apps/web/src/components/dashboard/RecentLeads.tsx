"use client"

import { useState } from "react"
import { Eye, MessageSquare, Inbox } from "lucide-react"
import { PatientDetailsPanel, Lead } from "@/components/shared/PatientDetailsPanel"

const getStatusBadge = (status: string) => {
    switch (status) {
        case 'Novo':
        case 'novo':
            return "bg-blue-50 text-blue-700 border-blue-200"
        case 'Agendado':
        case 'agendado':
            return "bg-emerald-50 text-emerald-700 border-emerald-200"
        case 'Em Qualificação':
        case 'qualificando':
            return "bg-amber-50 text-amber-700 border-amber-200"
        case 'Fechado':
        case 'fechado':
            return "bg-gray-100 text-gray-700 border-gray-300"
        default:
            return "bg-gray-50 text-gray-700 border-gray-200"
    }
}

export function RecentLeads({ leads = [] }: { leads?: Lead[] }) {
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleViewDetails = (lead: Lead) => {
        setSelectedLead(lead)
        setIsModalOpen(true)
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden w-full">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Pacientes Recentes</h2>
                <button className="text-clinic-600 hover:text-clinic-700 text-sm font-medium transition-colors">
                    Ver todos
                </button>
            </div>

            <div className="overflow-x-auto">
                {leads.length === 0 ? (
                    <div className="py-12 flex flex-col items-center justify-center text-center">
                        <Inbox className="text-gray-300 w-12 h-12 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">Nenhum lead encontrado</h3>
                        <p className="text-sm text-gray-500">Os leads que entrarem pelo WhatsApp aparecerão aqui</p>
                    </div>
                ) : (
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
                            <tr>
                                <th scope="col" className="px-6 py-4">Nome</th>
                                <th scope="col" className="px-6 py-4">Origem</th>
                                <th scope="col" className="px-6 py-4">Tratamento</th>
                                <th scope="col" className="px-6 py-4">Status</th>
                                <th scope="col" className="px-6 py-4 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {leads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4 font-medium text-gray-900">{lead.name}</td>
                                    <td className="px-6 py-4 text-gray-600 capitalize">{lead.source || 'Manual'}</td>
                                    <td className="px-6 py-4 text-gray-600">{lead.treatment || '-'}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 text-xs font-medium rounded-md border ${getStatusBadge(lead.stage ?? lead.status ?? '')} capitalize`}>
                                            {lead.stage || lead.status}
                                        </span>
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
                                                className="text-gray-500 p-1.5 rounded-md transition-colors hover:bg-clinic-50 hover:text-clinic-600"
                                                title="Abrir Chat"
                                            >
                                                <MessageSquare className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Modal de Detalhes do Lead Renderizado no Client */}
            <PatientDetailsPanel
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                patient={selectedLead}
            />
        </div>
    )
}
