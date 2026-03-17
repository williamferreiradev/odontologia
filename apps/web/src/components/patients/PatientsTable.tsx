"use client"

import { PatientHistoryItem } from "@/types"
import { Phone, Eye, MessageSquare } from "lucide-react"

export interface PatientRecord {
    id: string | number
    name: string
    phone: string
    treatment: string
    status: 'Pendente' | 'Aprovado' | 'Travado'
    history?: PatientHistoryItem[]
}

interface PatientsTableProps {
    data: PatientRecord[]
    onViewDetails?: (patient: PatientRecord) => void
}

const getStatusBadge = (status: PatientRecord['status']) => {
    switch (status) {
        case 'Pendente':
            return "bg-amber-50 text-amber-700 border-amber-200"
        case 'Aprovado':
            return "bg-emerald-50 text-emerald-700 border-emerald-200"
        case 'Travado':
            return "bg-rose-50 text-rose-700 border-rose-200"
        default:
            return "bg-gray-50 text-gray-700 border-gray-200"
    }
}

// Helper to get initials for the Avatar
const getInitials = (name: string) => {
    const parts = name.trim().split(" ")
    if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
}

export function PatientsTable({ data, onViewDetails }: PatientsTableProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden w-full">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
                        <tr>
                            <th scope="col" className="px-6 py-4">Paciente</th>
                            <th scope="col" className="px-6 py-4">Avaliação / Tratamento</th>
                            <th scope="col" className="px-6 py-4">Status</th>
                            <th scope="col" className="px-6 py-4 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data.length > 0 ? (
                            data.map((patient) => (
                                <tr key={patient.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {/* Circular Avatar */}
                                            <div className="w-10 h-10 shrink-0 bg-blue-50 text-blue-600 font-bold rounded-full flex items-center justify-center text-sm border border-blue-100">
                                                {getInitials(patient.name)}
                                            </div>

                                            {/* Name & Phone Col */}
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-gray-900">{patient.name}</span>
                                                <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                                                    <Phone className="w-3 h-3" />
                                                    <span>{patient.phone}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 font-medium">{patient.treatment}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 text-xs font-medium rounded-md border ${getStatusBadge(patient.status)}`}>
                                            {patient.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-3">
                                            <button
                                                onClick={() => onViewDetails && onViewDetails(patient)}
                                                className="text-gray-500 p-1.5 rounded-md transition-colors hover:bg-clinic-50 hover:text-clinic-600"
                                                title="Ver Ficha"
                                            >
                                                <Eye className="w-5 h-5" />
                                            </button>
                                            <button
                                                className="text-gray-500 p-1.5 rounded-md transition-colors hover:bg-clinic-50 hover:text-clinic-600"
                                                title="Enviar Mensagem / CRM"
                                            >
                                                <MessageSquare className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                    Nenhum paciente encontrado com esses filtros.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
