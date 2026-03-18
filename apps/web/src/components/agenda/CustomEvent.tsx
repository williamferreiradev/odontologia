"use client"

export type EventColorVariant = 'purple' | 'amber' | 'emerald' | 'rose' | 'blue' | 'gray'

export interface CalendarEvent {
    title: string
    start: Date
    end: Date
    colorVariant?: EventColorVariant
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resource?: any
}

const COLOR_MAP: Record<EventColorVariant, string> = {
    purple: 'bg-purple-50 border-purple-500 text-purple-900',
    amber: 'bg-amber-50 border-amber-500 text-amber-900',
    emerald: 'bg-emerald-50 border-emerald-500 text-emerald-900',
    rose: 'bg-rose-50 border-rose-500 text-rose-900',
    blue: 'bg-blue-50 border-blue-500 text-blue-900',
    gray: 'bg-gray-50 border-gray-400 text-gray-800',
}

export function CustomEvent(props: { event: CalendarEvent }) {
    const variant = props.event.resource?.colorVariant || props.event.colorVariant || 'blue'
    const colorClasses = COLOR_MAP[variant as EventColorVariant] || COLOR_MAP.blue

    return (
        <div className={`h-full w-full rounded-md border-l-4 p-1 px-1.5 overflow-hidden shadow-sm flex flex-col justify-start ${colorClasses}`}>
            <span className="text-xs font-bold truncate leading-tight">
                {props.event.title}
            </span>
        </div>
    )
}
