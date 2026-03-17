"use client"

import { useState, useEffect } from "react"
import { X, Calendar as CalendarIcon, Clock, User, FileText } from "lucide-react"
import { Lead } from "@/components/shared/PatientDetailsPanel"
import { getAvailableSlots } from "@/app/actions/scheduling"

interface AppointmentModalProps {
    isOpen: boolean
    onClose: () => void
    leads: Lead[]
}

export function AppointmentModal({ isOpen, onClose, leads }: AppointmentModalProps) {
    const [selectedLeadId, setSelectedLeadId] = useState("")
    const [selectedDate, setSelectedDate] = useState("")
    const [slots, setSlots] = useState<string[]>([])
    const [selectedSlot, setSelectedSlot] = useState("")
    const [procedure, setProcedure] = useState("")
    const [loadingSlots, setLoadingSlots] = useState(false)

    useEffect(() => {
        if (!isOpen) {
            // Reset when closed
            setSelectedLeadId("")
            setSelectedDate("")
            setProcedure("")
            setSlots([])
            setSelectedSlot("")
        }
    }, [isOpen])

    useEffect(() => {
        if (!selectedDate) {
            setSlots([])
            setSelectedSlot("")
            return
        }

        const fetchSlots = async () => {
            setLoadingSlots(true)
            setSelectedSlot("")
            try {
                // Chama a Server Action passando a data escolhida
                const available = await getAvailableSlots(selectedDate, 30)
                setSlots(available)
            } catch (err) {
                console.error("Erro ao buscar horários", err)
                setSlots([])
            } finally {
                setLoadingSlots(false)
            }
        }

        fetchSlots()
    }, [selectedDate])

    if (!isOpen) return null

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // No futuro isso chamará uma Server Action para dar INSERT no BD
        alert(`Agendamento de ${selectedSlot} (${selectedDate}) mock salvo!`)
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Body */}
            <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900">Novo Agendamento</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto w-full">
                    <form id="appointmentForm" onSubmit={handleSubmit} className="flex flex-col gap-6">

                        {/* 1. Paciente */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Paciente <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-4 w-4 text-gray-400" />
                                </div>
                                <select
                                    required
                                    value={selectedLeadId}
                                    onChange={(e) => setSelectedLeadId(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-clinic-500 focus:border-transparent transition-colors"
                                >
                                    <option value="" disabled>Selecione um paciente...</option>
                                    {leads.map(lead => (
                                        <option key={lead.id} value={lead.id}>{lead.name} ({lead.phone})</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* 2. Procedimento */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Procedimento
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FileText className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    value={procedure}
                                    onChange={(e) => setProcedure(e.target.value)}
                                    placeholder="Ex: Avaliação Inicial, Canal, Limpeza..."
                                    className="block w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-clinic-500 transition-colors"
                                />
                            </div>
                        </div>

                        {/* 3. Data */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Data da Consulta <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <CalendarIcon className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    required
                                    type="date"
                                    value={selectedDate}
                                    min={new Date().toISOString().split('T')[0]}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-clinic-500 transition-colors cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* 4. Horários Dinâmicos */}
                        {selectedDate && (
                            <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                                <div className="flex items-center gap-2 mb-3">
                                    <Clock className="w-4 h-4 text-gray-500" />
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Horários Disponíveis <span className="text-red-500">*</span>
                                    </label>
                                </div>

                                {loadingSlots ? (
                                    <div className="flex items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-xl">
                                        <div className="animate-spin w-6 h-6 border-2 border-clinic-600 border-t-transparent rounded-full" />
                                        <span className="ml-3 text-sm text-gray-500">Calculando horários...</span>
                                    </div>
                                ) : slots.length > 0 ? (
                                    <div className="grid grid-cols-4 gap-2">
                                        {slots.map(slot => (
                                            <button
                                                key={slot}
                                                type="button"
                                                onClick={() => setSelectedSlot(slot)}
                                                className={`
                                                    py-2 text-sm font-bold rounded-lg transition-all border
                                                    ${selectedSlot === slot
                                                        ? "bg-clinic-600 text-white border-clinic-600 shadow-md ring-2 ring-clinic-600/20"
                                                        : "bg-gray-50 text-gray-700 border-gray-200 hover:border-clinic-300 hover:bg-clinic-50"
                                                    }
                                                `}
                                            >
                                                {slot}
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl">
                                        <p className="text-sm font-medium text-orange-800 text-center">
                                            Nenhum horário disponível para a data selecionada. Tente outro dia.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                    </form>
                </div>

                {/* Footer Buttons */}
                <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 font-medium text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        form="appointmentForm"
                        disabled={!selectedLeadId || !selectedDate || !selectedSlot}
                        className="px-5 py-2 font-medium text-sm text-white bg-clinic-600 rounded-lg shadow-sm hover:bg-clinic-700 hover:shadow disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        Confirmar Agendamento
                    </button>
                </div>
            </div>
        </div>
    )
}
