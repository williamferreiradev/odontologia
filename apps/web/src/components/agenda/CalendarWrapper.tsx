"use client"

import { Calendar, dateFnsLocalizer, View } from "react-big-calendar"
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { format, parse, startOfWeek, getDay } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CustomEvent, CalendarEvent } from "./CustomEvent"

const locales = {
    'pt-BR': ptBR,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

interface CalendarWrapperProps {
    events: CalendarEvent[]
    currentDate: Date
    view: View
    onNavigate: (date: Date) => void
    onViewChange: (view: View) => void
    eventPropGetter?: (event: CalendarEvent) => { style?: React.CSSProperties; className?: string }
}

export function CalendarWrapper({ events, currentDate, view, onNavigate, onViewChange, eventPropGetter }: CalendarWrapperProps) {
    return (
        <div className="w-full h-full 
            [&_.rbc-calendar]:font-sans
            /* Toolbar General */
            [&_.rbc-toolbar]:flex [&_.rbc-toolbar]:justify-between [&_.rbc-toolbar]:items-center [&_.rbc-toolbar]:mb-4
            
            /* Toolbar Buttons Container */
            [&_.rbc-btn-group]:flex [&_.rbc-btn-group]:gap-1
            
            /* Individual Buttons */
            [&_.rbc-btn-group_button]:border [&_.rbc-btn-group_button]:border-gray-200 [&_.rbc-btn-group_button]:bg-white [&_.rbc-btn-group_button]:px-4 [&_.rbc-btn-group_button]:py-1.5 [&_.rbc-btn-group_button]:rounded-md [&_.rbc-btn-group_button]:text-sm [&_.rbc-btn-group_button]:font-medium [&_.rbc-btn-group_button]:text-gray-700 [&_.rbc-btn-group_button]:transition-colors
            [&_.rbc-btn-group_button:hover]:bg-gray-50
            
            /* Active Button */
            [&_.rbc-btn-group_.rbc-active]:bg-gray-100 [&_.rbc-btn-group_.rbc-active]:text-gray-900 [&_.rbc-btn-group_.rbc-active]:shadow-inner
            
            /* Label (Month Year) */
            [&_.rbc-toolbar-label]:font-bold [&_.rbc-toolbar-label]:text-lg [&_.rbc-toolbar-label]:text-gray-900
            
            /* Header Cells */
            [&_.rbc-header]:border-gray-200 [&_.rbc-header]:py-2 [&_.rbc-header]:text-sm [&_.rbc-header]:font-semibold [&_.rbc-header]:text-gray-600 [&_.rbc-header]:bg-slate-50
            
            /* Month View specific */
            [&_.rbc-month-view]:border-gray-200 [&_.rbc-month-row]:border-gray-200
            [&_.rbc-day-bg]:border-gray-200
            [&_.rbc-off-range-bg]:bg-gray-50/50
            [&_.rbc-date-cell]:text-sm [&_.rbc-date-cell]:pr-2 [&_.rbc-date-cell]:pt-1 [&_.rbc-date-cell]:text-gray-600 [&_.rbc-date-cell]:font-medium
            [&_.rbc-now_.rbc-date-cell]:text-blue-600 [&_.rbc-now_.rbc-date-cell]:font-bold
            
            /* Time View (Week/Day) specific */
            [&_.rbc-time-view]:border-gray-200
            [&_.rbc-time-header]:border-gray-200
            [&_.rbc-time-header-content]:border-gray-200
            [&_.rbc-time-content]:border-gray-200
            [&_.rbc-timeslot-group]:border-gray-200 [&_.rbc-timeslot-group]:min-h-[60px]
            [&_.rbc-time-slot]:border-gray-100
            [&_.rbc-allday-cell]:border-gray-200
            [&_.rbc-day-slot_.rbc-events-container]:mr-0
            
            /* Time Labels */
            [&_.rbc-time-gutter]:text-xs [&_.rbc-time-gutter]:text-gray-400 [&_.rbc-time-gutter]:font-medium
            
            /* Today Highlight */
            [&_.rbc-today]:bg-blue-50/30
            
            /* Event Wrapper Overrides */
            [&_.rbc-event]:bg-transparent [&_.rbc-event]:border-none [&_.rbc-event]:p-0 [&_.rbc-event]:!rounded-none
            [&_.rbc-event-label]:hidden
            [&_.rbc-event-content]:p-0 [&_.rbc-event-content]:h-full
        ">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                date={currentDate}
                view={view}
                onNavigate={onNavigate}
                onView={onViewChange}
                culture="pt-BR"
                messages={{
                    showMore: (total: number) => `+ ${total} mais`,
                    allDay: 'Dia inteiro',
                    previous: '<',
                    next: '>',
                    today: 'Hoje',
                    month: 'Mês',
                    week: 'Semana',
                    day: 'Dia'
                }}
                formats={{
                    timeGutterFormat: (date: Date, culture?: string, localizer?: any) =>
                        localizer!.format(date, 'HH:mm', culture),
                    dayFormat: (date: Date, culture?: string, localizer?: any) =>
                        localizer!.format(date, 'EEEE - dd/MM', culture),
                }}
                components={{
                    event: CustomEvent,
                }}
                className="w-full h-full"
                step={30} // 30 minute chunks
                timeslots={2} // Subdivide hours into 2 blocks
                min={new Date(0, 0, 0, 7, 0, 0)} // Starts at 7 AM
                max={new Date(0, 0, 0, 20, 0, 0)} // Ends at 8 PM
                eventPropGetter={eventPropGetter}
            />
        </div>
    )
}
