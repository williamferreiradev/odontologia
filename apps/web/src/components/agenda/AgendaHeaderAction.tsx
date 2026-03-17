"use client"

import { useState } from "react"
import { AppointmentModal } from "./AppointmentModal"

export function AgendaHeaderAction({ leads }: { leads: any[] }) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
            >
                + Novo Agendamento
            </button>

            <AppointmentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                leads={leads}
            />
        </>
    )
}
