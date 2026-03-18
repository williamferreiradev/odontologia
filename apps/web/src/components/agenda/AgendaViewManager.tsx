"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Calendar as CalendarIcon, Clock, List } from "lucide-react"
import { View } from "react-big-calendar"

import { AgendaHeaderAction } from "@/components/agenda/AgendaHeaderAction"
import { CalendarWrapper } from "@/components/agenda/CalendarWrapper"
import { Lead, Appointment, CalendarEvent } from "@/types"

// Maps a DB appointment status to the UI color token required by CalendarEvent.resource
function appointmentToColorVariant(status: string): CalendarEvent['resource'] extends { colorVariant: infer C } | undefined ? C : never {
    switch (status?.toLowerCase()) {
        case 'concluido': return 'emerald'
        case 'cancelado': return 'rose'
        case 'falta':     return 'amber'
        case 'agendado':  return 'blue'
        default:          return 'gray'
    }
}

interface AgendaViewManagerProps {
    date: string
    titleDate: string
    appointments: Appointment[]
    leads: Lead[]
}

export function AgendaViewManager({ date, titleDate, appointments, leads }: AgendaViewManagerProps) {
    const router = useRouter()
    const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list')
    const [calendarView, setCalendarView] = useState<View>('week')

    // Status helpers
    const getStatusBorderColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'agendado': return 'border-l-blue-500';
            case 'concluido': return 'border-l-green-500';
            case 'cancelado': return 'border-l-red-500';
            case 'falta': return 'border-l-orange-500';
            default: return 'border-l-gray-300';
        }
    }
    const getStatusBadgeColors = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'agendado': return 'bg-blue-100 text-blue-700';
            case 'concluido': return 'bg-green-100 text-green-700';
            case 'cancelado': return 'bg-red-100 text-red-700';
            case 'falta': return 'bg-orange-100 text-orange-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    }
    const getStatusLabel = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'agendado': return 'Agendado';
            case 'concluido': return 'Concluído';
            case 'cancelado': return 'Cancelado';
            case 'falta': return 'Falta';
            default: return status || 'Agendado';
        }
    }

    // Removido getEventStyles (as cores agora são controladas globalmente pelo CustomEvent com Tailwind)

    // Parse data to react-big-calendar event format - Memoized to prevent rebuilds
    const mappedEvents = useMemo(() => {
        return appointments.map(app => {
            // Fix: Create date objects safely in local time
            const [year, month, day] = (app.appointment_date || date).split('-').map(Number);
            const startStrs = (app.start_time || '00:00').split(':').map(Number);
            const endStrs = (app.end_time || '00:30').split(':').map(Number);

            const start = new Date(year, month - 1, day, startStrs[0], startStrs[1], 0)
            const end = new Date(year, month - 1, day, endStrs[0], endStrs[1], 0)

            // 'about' overrides name and procedure, else compose both
            const patientName = app.leads?.name || "Paciente sem cadastro";
            const procName = app.procedures?.name || "Consulta Geral";
            const title = app.about ? app.about : `${patientName} - ${procName}`;

            return {
                id: app.id,
                title,
                start,
                end,
                resource: {
                    status: app.status,
                    colorVariant: appointmentToColorVariant(app.status),
                    about: app.about,
                    leads: app.leads,
                    procedures: app.procedures,
                    lead_id: app.lead_id,
                }
            }
        })
    }, [appointments, date])

    // Usar apenas os eventos vindos do banco de dados
    const events = mappedEvents;

    const currentDateParsed = useMemo(() => {
        // Fix: parse target date as local
        const [y, m, d] = date.split('-').map(Number);
        return new Date(y, m - 1, d);
    }, [date])

    // Derive appointments for the list view from `events`
    const listAppointments = useMemo(() => {
        return events.filter(ev => {
            const evDateStr = ev.start.toLocaleDateString('en-CA');
            return evDateStr === date;
        }).sort((a, b) => a.start.getTime() - b.start.getTime());
    }, [events, date]);



    return (
        <div className="w-full min-h-screen flex flex-col bg-slate-50/50">
            {/* Cabeçalho Fixo (Sticky) */}
            <div className="bg-white border-b border-gray-200 p-6 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Agenda de Consultas</h1>
                    <div className="flex items-center gap-4">
                        {/* Toggle */}
                        <div className="flex items-center bg-gray-100/80 p-1 rounded-lg border border-gray-200 shadow-inner">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-semibold transition-all ${viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <List className="w-4 h-4" />
                                Lista
                            </button>
                            <button
                                onClick={() => setViewMode('calendar')}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-semibold transition-all ${viewMode === 'calendar' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <CalendarIcon className="w-4 h-4" />
                                Calendário
                            </button>
                        </div>

                        {/* Botão Novo Agendamento */}
                        <AgendaHeaderAction leads={leads} />
                    </div>
                </div>
            </div>

            {/* Renderização Condicional do Layout */}
            {viewMode === 'list' ? (
                /* Container da Visão de Lista */
                <div className="p-6 max-w-7xl mx-auto w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full mt-4">

                        {/* Coluna Esquerda: Seletor de Dia (4 colunas) */}
                        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4 w-full">
                            <h2 className="text-lg font-bold text-gray-900">Selecione o Dia</h2>
                            <p className="text-sm text-gray-500">Escolha uma data para ver os agendamentos.</p>
                            <input
                                type="date"
                                value={date} // Certifique-se de ligar ao estado da data
                                onChange={(e) => {
                                    if (e.target.value) {
                                        router.push(`/agenda?date=${e.target.value}`)
                                    }
                                }}
                                className="w-full p-3 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                            />
                        </div>

                        {/* Coluna Direita: Lista de Consultas (8 colunas) */}
                        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm min-h-[70vh]">
                            <h2 className="text-xl font-bold mb-6 text-gray-800">Consultas de {titleDate}</h2>

                            {/* Lógica condicional para Empty State ou Lista */}
                            {listAppointments.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                                    <Clock className="w-12 h-12 mb-4 opacity-50" />
                                    <p className="text-base font-medium text-gray-900">Dia livre</p>
                                    <p className="text-sm">Nenhuma consulta agendada para este dia.</p>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    {listAppointments.map((apt) => {
                                        const res = (apt.resource || {}) as unknown as Appointment;
                                        // Formatting times
                                        const startTimeStr = apt.start.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                                        const endTimeStr = apt.end.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                                        
                                        const patientName = res.leads?.name || 'Paciente';
                                        const procName = res.procedures?.name || 'Consulta Geral';
                                        const status = res.status || 'agendado';
                                        const about = res.about;
                                        
                                        return (
                                            <div key={apt.id} className={`flex items-center bg-white border-y border-r border-gray-100 border-l-4 rounded-xl p-4 hover:bg-slate-50 hover:shadow-md transition-all cursor-pointer ${getStatusBorderColor(status)}`}>
                                                {/* Horário na esquerda */}
                                                <div className="flex flex-col items-center justify-center pr-6 border-r border-gray-200 min-w-[100px]">
                                                    <span className="text-lg font-bold text-gray-900">{startTimeStr}</span>
                                                    <span className="text-xs text-gray-500">até {endTimeStr}</span>
                                                </div>
                                                {/* Dados no meio */}
                                                <div className="flex flex-col pl-6 flex-1">
                                                    <span className="font-bold text-gray-900">
                                                        {apt.title}
                                                    </span>
                                                    <span className="text-sm text-gray-500">
                                                        {about ? `${patientName} - ${procName}` : procName}
                                                    </span>
                                                </div>
                                                {/* Status na direita */}
                                                <div>
                                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${getStatusBadgeColors(status)}`}>
                                                        {getStatusLabel(status)}
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                /* Visão de Calendário (Google Calendar Style) */
                <div className="flex-1 w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-4 min-h-[700px] overflow-hidden">
                  <CalendarWrapper
                    events={events}
                    currentDate={currentDateParsed}
                    view={calendarView}
                    onNavigate={(d: Date) => {
                        // Força hora local ao meio-dia para evitar bug de UTC -> local time shift (fuso BRT UTC-3)
                        const localDate = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12, 0, 0);
                        const year = localDate.getFullYear();
                        const month = String(localDate.getMonth() + 1).padStart(2, '0');
                        const day = String(localDate.getDate()).padStart(2, '0');
                        router.push(`/agenda?date=${year}-${month}-${day}`);
                    }}
                    onViewChange={(v: View) => setCalendarView(v)}
                    eventPropGetter={() => ({
                        style: { backgroundColor: 'transparent', border: 'none' }
                    })}
                  />
                </div>
            )}
        </div>
    )
}
