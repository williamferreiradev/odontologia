"use client"

import { EventProps } from "react-big-calendar"

export type EventColorVariant = 'purple' | 'orange' | 'emerald' | 'rose' | 'blue'

export interface CalendarEvent {
    title: string
    start: Date
    end: Date
    colorVariant?: EventColorVariant
    resource?: any
}

const COLOR_MAP: Record<EventColorVariant, string> = {
    purple: 'bg-purple-50 border-purple-500 text-purple-900',
    orange: 'bg-orange-50 border-orange-500 text-orange-900',
    emerald: 'bg-emerald-50 border-emerald-500 text-emerald-900',
    rose: 'bg-rose-50 border-rose-500 text-rose-900',
    blue: 'bg-blue-50 border-blue-500 text-blue-900',
}

export function CustomEvent(props: EventProps<CalendarEvent>) {
    const variant = props.event.colorVariant || 'blue'
    const colorClasses = COLOR_MAP[variant as EventColorVariant]

    return (
        <div className={`h-full w-full rounded-md border-l-4 p-1 px-1.5 overflow-hidden shadow-sm flex flex-col justify-start ${colorClasses}`}>
            <span className="text-xs font-bold truncate leading-tight">
                {props.event.title}
            </span>
        </div>
    )
}
