"use client"

import { useState } from "react"
import { Eye, Search } from "lucide-react"
import { Lead, PatientDetailsPanel } from "@/components/shared/PatientDetailsPanel"

interface PatientDataTableProps {
    initialData: Lead[]
}

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

export function PatientDataTable({ initialData }: PatientDataTableProps) {
    // Busca
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('Todos os Status')
    const [sourceFilter, setSourceFilter] = useState('Todas as Origens')
    const [sortBy, setSortBy] = useState('Mais recentes')

    // Modal
    const [selectedPatient, setSelectedPatient] = useState<Lead | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Filtros Multiplos
    let filteredPatients = initialData.filter(p => {
        // Busca textual
        const term = searchTerm.toLowerCase()
        const matchName = p.name.toLowerCase().includes(term)
        const matchPhone = p.phone?.includes(term) || false
        const matchesSearch = matchName || matchPhone

        // Status
        let matchesStatus = true
        if (statusFilter !== 'Todos os Status') {
            matchesStatus = p.stage === statusFilter.toLowerCase()
        }

        // Origem
        let matchesSource = true
        if (sourceFilter !== 'Todas as Origens') {
            const origemStr = p.source || 'Manual'
            matchesSource = origemStr.toLowerCase() === sourceFilter.toLowerCase()
        }

        return matchesSearch && matchesStatus && matchesSource
    })

    // Ordenação
    filteredPatients = filteredPatients.sort((a, b) => {
        if (sortBy === 'Mais recentes') {
            return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
        } else if (sortBy === 'Mais antigos') {
            return new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime()
        } else if (sortBy === 'A-Z') {
            return a.name.localeCompare(b.name)
        }
        return 0
    })

    const handleOpenModal = (patient: Lead) => {
        setSelectedPatient(patient)
        setIsModalOpen(true)
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                    {/* Search Input */}
                    <div className="relative w-full sm:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-clinic-500 focus:border-transparent transition-all shadow-sm text-gray-900"
                            placeholder="Buscar nome ou telefone..."
                        />
                    </div>

                    {/* Status Filter */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="block w-full sm:w-40 py-2 px-3 border border-gray-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-clinic-500 focus:border-transparent transition-all shadow-sm text-gray-700 cursor-pointer"
                    >
                        <option value="Todos os Status">Todos os Status</option>
                        <option value="Novo">Novo</option>
                        <option value="Qualificando">Qualificando</option>
                        <option value="Qualificado">Qualificado</option>
                        <option value="Fechado">Fechado</option>
                    </select>

                    {/* Origem Filter */}
                    <select
                        value={sourceFilter}
                        onChange={(e) => setSourceFilter(e.target.value)}
                        className="block w-full sm:w-40 py-2 px-3 border border-gray-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-clinic-500 focus:border-transparent transition-all shadow-sm text-gray-700 cursor-pointer"
                    >
                        <option value="Todas as Origens">Todas as Origens</option>
                        <option value="Manual">Manual</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Google">Google</option>
                        <option value="WhatsApp">WhatsApp</option>
                    </select>

                    {/* Ordenação Filter */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="block w-full sm:w-40 py-2 px-3 border border-gray-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-clinic-500 focus:border-transparent transition-all shadow-sm text-gray-700 cursor-pointer"
                    >
                        <option value="Mais recentes">Mais recentes</option>
                        <option value="Mais antigos">Mais antigos</option>
                        <option value="A-Z">A-Z</option>
                    </select>
                </div>
            </div>

            {/* Tabela de Pacientes */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden w-full">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
                            <tr>
                                <th scope="col" className="px-6 py-4">Nome do Paciente</th>
                                <th scope="col" className="px-6 py-4">Telefone</th>
                                <th scope="col" className="px-6 py-4">Origem</th>
                                <th scope="col" className="px-6 py-4">Estágio</th>
                                <th scope="col" className="px-6 py-4">Data de Cadastro</th>
                                <th scope="col" className="px-6 py-4 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredPatients.map((patient) => (
                                <tr key={patient.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-gray-900">{patient.name}</td>
                                    <td className="px-6 py-4 text-gray-600">{patient.phone || '-'}</td>
                                    <td className="px-6 py-4 text-gray-600 capitalize">{patient.source || 'Manual'}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 text-xs font-medium rounded-md border ${getStatusBadge(patient.stage)} capitalize`}>
                                            {patient.stage || 'Novo'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {patient.created_at ? new Date(patient.created_at).toLocaleDateString('pt-BR') : '-'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-3">
                                            <button
                                                onClick={() => handleOpenModal(patient)}
                                                className="text-gray-500 p-1.5 rounded-md transition-colors hover:bg-clinic-50 hover:text-clinic-600"
                                                title="Ver Detalhes do Paciente"
                                            >
                                                <Eye className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {filteredPatients.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                                        Nenhum paciente encontrado com essa busca.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal de Detalhes Dinâmico */}
            <PatientDetailsPanel
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                patient={selectedPatient}
            />
        </div>
    )
}
