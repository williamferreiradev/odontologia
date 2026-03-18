"use client"

import { Calendar, View } from "react-big-calendar"
import { CSSProperties } from "react"
import { CustomEvent } from "./CustomEvent"
import { CalendarEvent } from "@/types"
import { calendarLocalizer } from "@/lib/calendar-localizer"

interface CalendarWrapperProps {
    events: CalendarEvent[]
    currentDate: Date
    view: View
    onNavigate: (date: Date) => void
    onViewChange: (view: View) => void
    eventPropGetter?: (event: CalendarEvent) => { style?: CSSProperties; className?: string }
}

export function CalendarWrapper({
    events,
    currentDate,
    view,
    onNavigate,
    onViewChange,
    eventPropGetter
}: CalendarWrapperProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const CalendarComponent = Calendar as any;

    return (
        <div className="
            w-full h-full p-4 bg-white rounded-xl border border-gray-200 shadow-sm
            flex flex-col overflow-hidden
            [&_.rbc-calendar]:h-full
            [&_.rbc-main-container]:h-full
            [&_.rbc-toolbar]:mb-4
            [&_.rbc-off-range-bg]:bg-slate-50/50
            [&_.rbc-today]:bg-clinic-50/30
            [&_.rbc-header]:py-3 [&_.rbc-header]:font-bold [&_.rbc-header]:text-gray-600 [&_.rbc-header]:text-xs [&_.rbc-header]:uppercase
            [&_.rbc-month-view]:border-gray-100 [&_.rbc-month-view]:rounded-lg
            [&_.rbc-day-bg]:border-gray-100
            [&_.rbc-month-row]:border-gray-100
            /* Event Styles */
            [&_.rbc-event]:bg-transparent [&_.rbc-event]:border-none [&_.rbc-event]:p-0 [&_.rbc-event]:!rounded-none
            /* Time Slots */
            [&_.rbc-time-slot]:border-gray-50
            [&_.rbc-timeslot-group]:border-gray-100
            /* Time Labels */
            [&_.rbc-time-gutter]:text-xs [&_.rbc-time-gutter]:text-gray-400 [&_.rbc-time-gutter]:font-medium
            
            /* Today Highlight */
            [&_.rbc-today]:bg-blue-50/30
            
            /* Event Wrapper Overrides */
            [&_.rbc-event]:bg-transparent [&_.rbc-event]:border-none [&_.rbc-event]:p-0 [&_.rbc-event]:!rounded-none
            [&_.rbc-event-label]:hidden
            [&_.rbc-event-content]:p-0 [&_.rbc-event-content]:h-full
        ">
            <CalendarComponent
                localizer={calendarLocalizer}
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
                    timeGutterFormat: (date: Date, culture?: string, localizer?: { format: (date: Date, f: string, c?: string) => string }) =>
                        localizer!.format(date, 'HH:mm', culture),
                    dayFormat: (date: Date, culture?: string, localizer?: { format: (date: Date, f: string, c?: string) => string }) =>
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
