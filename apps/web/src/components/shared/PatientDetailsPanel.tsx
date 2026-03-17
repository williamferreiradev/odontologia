"use client"

import { useState, useEffect } from "react"
import { X, Phone, MessageSquare, Save } from "lucide-react"
import { Lead } from "@/types"
export type { Lead }


interface PatientDetailsPanelProps {
    isOpen: boolean
    onClose: () => void
    patient: Lead | null
}

const getInitials = (name: string) => {
    if (!name) return "LD"
    const parts = name.trim().split(" ")
    if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
}

const getStatusBadge = (status: string) => {
    const s = status?.toLowerCase()
    switch (s) {
        case 'novo':
            return "bg-blue-100 text-blue-800 border bg-blue-50 border-blue-200"
        case 'agendado':
            return "bg-emerald-100 text-emerald-800 border-emerald-200"
        case 'qualificando':
            return "bg-amber-100 text-amber-800 border-amber-200"
        case 'fechado':
            return "bg-gray-100 text-gray-800 border-gray-300"
        case 'perdido':
            return "bg-rose-100 text-rose-800 border-rose-200"
        default:
            return "bg-slate-100 text-slate-800 border-slate-200"
    }
}

export function PatientDetailsPanel({ isOpen, onClose, patient }: PatientDetailsPanelProps) {
    const [formData, setFormData] = useState<Partial<Lead>>({})
    const [isSaving, setIsSaving] = useState(false)

    // Sincronizar form local quando o patient muda
    useEffect(() => {
        if (patient) {
            setFormData({
                name: patient.name || "",
                phone: patient.phone || "",
                source: patient.source || "",
                expected_value: patient.expected_value || 0,
                about: patient.about || ""
            })
        }
    }, [patient])

    if (!isOpen || !patient) return null

    const handleSave = async () => {
        setIsSaving(true)
        try {
            // TODO: Integrar chamada Server Action de Update AQUI depois
            console.log("Salvando Lead:", { id: patient.id, ...formData })
            await new Promise(res => setTimeout(res, 800)) // Mock delay
            onClose()
        } catch (error) {
            console.error(error)
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Slide-over Panel */}
            <div className="relative w-full max-w-[500px] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out h-full border-l border-gray-200">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0 bg-slate-50">
                    <h2 className="text-lg font-bold text-gray-900 tracking-tight">Detalhes do Lead</h2>
                    <button
                        onClick={onClose}
                        className="p-2 -mr-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200/50 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body (Formulário) */}
                <div className="flex-1 overflow-y-auto w-full">
                    {/* Panel Intro & Badges */}
                    <div className="p-6 border-b border-gray-100 bg-white">
                        <div className="flex items-start gap-4">
                            <div className="w-14 h-14 shrink-0 bg-clinic-50 text-clinic-600 font-bold rounded-xl flex items-center justify-center text-lg border border-clinic-100 shadow-sm">
                                {getInitials(patient.name)}
                            </div>
                            <div className="flex flex-col flex-1 pt-0.5">
                                <h3 className="text-xl font-bold text-gray-900 leading-tight">{patient.name}</h3>

                                <div className="flex items-center gap-2 mt-2 flex-wrap">
                                    <span className={`px-2.5 py-1 text-xs font-bold rounded-md uppercase tracking-wider border ${getStatusBadge(patient.stage || 'NOVO')}`}>
                                        {patient.stage || 'NOVO'}
                                    </span>
                                    <span className={`px-2.5 py-1 text-xs font-bold rounded-md uppercase tracking-wider border ${patient.agent_active ? 'bg-clinic-50 text-clinic-700 border-clinic-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                                        {patient.agent_active ? 'IA Ativa' : 'IA Pausada'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Inputs Section */}
                    <div className="p-6 bg-slate-50/50 flex flex-col gap-5">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-700">Nome Completo</label>
                            <input
                                type="text"
                                value={formData.name || ''}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full h-11 px-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-clinic-600/20 focus:border-clinic-600 transition-all font-medium"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-gray-700">Telefone</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        value={formData.phone || ''}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full h-11 pl-9 pr-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-clinic-600/20 focus:border-clinic-600 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-gray-700">Origem</label>
                                <input
                                    type="text"
                                    placeholder="Ex: WhatsApp, Instagram"
                                    value={formData.source || ''}
                                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                                    className="w-full h-11 px-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-clinic-600/20 focus:border-clinic-600 transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-700">Valor Esperado (R$)</label>
                            <input
                                type="number"
                                placeholder="0.00"
                                value={formData.expected_value || ''}
                                onChange={(e) => setFormData({ ...formData, expected_value: parseFloat(e.target.value) || 0 })}
                                className="w-full h-11 px-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-clinic-600/20 focus:border-clinic-600 transition-all font-medium"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5 mt-2">
                            <label className="text-sm font-semibold text-gray-700">Sobre o Paciente / Notas da IA</label>
                            <textarea
                                value={formData.about || ''}
                                onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                                placeholder="Adicione observações sobre o paciente ou tratamento..."
                                className="w-full min-h-[140px] p-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 resize-y focus:ring-2 focus:ring-clinic-600/20 focus:border-clinic-600 transition-all font-medium leading-relaxed"
                            />
                        </div>

                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-5 border-t border-gray-200 bg-white shrink-0 grid grid-cols-2 gap-3">
                    <button
                        onClick={() => { /* lógica futura de chat caso estoure a modal */ }}
                        className="flex items-center justify-center gap-2 h-11 px-4 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        <MessageSquare className="w-4 h-4" />
                        Abrir Chat
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center justify-center gap-2 h-11 px-4 bg-clinic-600 text-white text-sm font-semibold rounded-lg hover:bg-clinic-700 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-wait"
                    >
                        {isSaving ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        {isSaving ? "Salvando..." : "Salvar Dados"}
                    </button>
                </div>
            </div>
        </div>
    )
}
