"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function MiniCalendar({ selectedDate }: { selectedDate: string }) {
    const router = useRouter()
    const [currentMonth, setCurrentMonth] = useState(() => new Date(selectedDate + 'T12:00:00'))

    // Generate days in a month
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)

    const daysInMonth = lastDayOfMonth.getDate()
    const startDayOfWeek = firstDayOfMonth.getDay() // 0 = Sunday

    // previous month trailing days
    const prevMonthDays = new Date(year, month, 0).getDate()

    const calendarGrid = []

    // Fill trailing previous month days
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
        calendarGrid.push({ day: prevMonthDays - i, isCurrentMonth: false, date: null })
    }

    // Fill current month
    for (let day = 1; day <= daysInMonth; day++) {
        const strMonth = (month + 1).toString().padStart(2, '0')
        const strDay = day.toString().padStart(2, '0')
        calendarGrid.push({ day, isCurrentMonth: true, date: `${year}-${strMonth}-${strDay}` })
    }

    // Fill leading next month days
    let nextMonthDay = 1
    while (calendarGrid.length % 7 !== 0) {
        calendarGrid.push({ day: nextMonthDay++, isCurrentMonth: false, date: null })
    }

    const nextMonth = () => {
        setCurrentMonth(new Date(year, month + 1, 1))
    }

    const prevMonth = () => {
        setCurrentMonth(new Date(year, month - 1, 1))
    }

    const handleSelectDate = (dateStr: string | null) => {
        if (!dateStr) return
        router.push(`/agenda?date=${dateStr}`)
    }

    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

    return (
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm w-full max-w-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <button onClick={prevMonth} className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <h2 className="text-sm font-bold text-gray-800">
                    {monthNames[month]} de {year}
                </h2>
                <button onClick={nextMonth} className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Days row */}
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => (
                    <div key={i} className="text-xs font-semibold text-gray-400 py-1">
                        {d}
                    </div>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-7 gap-1">
                {calendarGrid.map((cell, i) => {
                    const isSelected = cell.date === selectedDate
                    const isToday = cell.date === new Date().toLocaleDateString('en-CA')

                    return (
                        <button
                            key={i}
                            disabled={!cell.isCurrentMonth}
                            onClick={() => handleSelectDate(cell.date)}
                            className={`
                                h-10 w-full flex items-center justify-center rounded-lg text-sm transition-all
                                ${isSelected
                                    ? "bg-clinic-600 text-white font-bold shadow-md"
                                    : cell.isCurrentMonth
                                        ? "text-gray-700 hover:bg-clinic-50 font-medium"
                                        : "text-gray-300 cursor-default"
                                }
                                ${!isSelected && isToday && cell.isCurrentMonth ? "ring-2 ring-clinic-600/30 text-clinic-700" : ""}
                            `}
                        >
                            {cell.day}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
