"use client"

import { useState } from "react"
import { Calendar as CalendarIcon, Clock, MoreVertical, Plus } from "lucide-react"
import { MiniCalendar } from "@/components/agenda/MiniCalendar"
import { AppointmentModal } from "@/components/agenda/AppointmentModal"
import { Lead } from "@/components/shared/PatientDetailsPanel"

import { Appointment } from "@/components/agenda/AgendaViewManager"

interface AgendaClientWrapperProps {
    date: string
    appointments: Appointment[]
    leads: Lead[]
}

export function AgendaClientWrapper({ date, appointments, leads }: AgendaClientWrapperProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Formatação de data para o cabeçalho
    const todayStr = new Date().toISOString().split('T')[0]
    const titleDate = date === todayStr
        ? "Hoje"
        : new Date(date + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })

    return (
        <div className="p-8 w-full min-h-screen flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Agenda de Consultas</h1>
                    <p className="text-gray-500 mt-1">Gerencie os horários e procedimentos da clínica.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-clinic-600 text-white font-medium px-4 py-2.5 rounded-lg shadow-sm hover:bg-clinic-700 transition-colors shrink-0"
                >
                    <Plus className="w-5 h-5" />
                    Novo Agendamento
                </button>
            </div>

            {/* Layout em 2 Colunas */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-2 items-start">

                {/* Esquerda: Calendário de Navegação */}
                <div className="md:col-span-4 lg:col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 w-full">
                    <MiniCalendar selectedDate={date} />
                </div>

                {/* Direita: Lista do Dia */}
                <div className="md:col-span-8 lg:col-span-9 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[500px] w-full">
                    {/* List Header */}
                    <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-clinic-100 rounded-lg text-clinic-600">
                                <CalendarIcon className="w-5 h-5" />
                            </div>
                            <h2 className="text-lg font-bold text-gray-900 capitalize">{titleDate}</h2>
                        </div>
                        <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                            {appointments.length} {appointments.length === 1 ? 'consulta' : 'consultas'}
                        </span>
                    </div>

                    {/* Timeline de Consultas */}
                    <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto w-full">
                        {appointments.length === 0 ? (
                            <div className="h-full w-full flex flex-col items-center justify-center text-center py-20">
                                <Clock className="w-12 h-12 text-gray-300 mb-4" />
                                <h3 className="text-gray-900 font-bold mb-1">Dia livre</h3>
                                <p className="text-gray-400 text-sm max-w-xs">Não encontramos nenhum agendamento para esta data. Que tal marcar alguém?</p>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="mt-6 text-sm font-semibold text-clinic-600 bg-clinic-50 px-4 py-2 rounded-lg hover:bg-clinic-100 transition-colors"
                                >
                                    Agendar Paciente
                                </button>
                            </div>
                        ) : (
                            appointments.map((app) => (
                                <div key={app.id} className="flex group w-full gap-4">
                                    {/* Horário Linha lateral */}
                                    <div className="flex flex-col items-center shrink-0 w-16">
                                        <span className="text-sm font-bold text-gray-900">{app.start_time?.slice(0, 5)}</span>
                                        <span className="text-xs font-semibold text-gray-400 mt-0.5">{app.end_time?.slice(0, 5)}</span>
                                        <div className="w-0.5 flex-1 bg-gray-200 mt-2 group-last:bg-transparent" />
                                    </div>

                                    {/* Card */}
                                    <div className="flex-1 bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-clinic-200 transition-all">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="text-base font-bold text-gray-900">
                                                    {/* Provisoriamente pegamos o lead_id se não possuirmos o join de leads no bd mock, mas podemos tentar app.leads?.name fallback */}
                                                    {app.leads?.name || `Paciente #${app.lead_id}`}
                                                </h3>
                                                <p className="text-sm text-gray-500 mt-1">{app.procedure_name || 'Consulta Padrão'}</p>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <span className={`px-2.5 py-1 text-xs font-bold rounded-md ${app.status === 'confirmed' ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                                                    app.status === 'canceled' ? "bg-red-50 text-red-700 border border-red-200" :
                                                        "bg-amber-50 text-amber-700 border border-amber-200"
                                                    }`}>
                                                    {app.status === 'confirmed' ? 'Confirmada' : app.status === 'canceled' ? 'Cancelada' : 'Agendada'}
                                                </span>
                                                <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
                                                    <MoreVertical className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Modal de Novo Agendamento */}
            <AppointmentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                leads={leads}
            />
        </div>
    )
}
