export interface PatientHistoryItem {
    id: string | number
    date: string
    title: string
    description?: string
}

export interface Lead {
    id: string | number
    clinic_id?: string
    name: string
    phone?: string
    stage?: string
    status?: string
    agent_active?: boolean
    created_at?: string
    source?: string | null
    expected_value?: number | null
    about?: string | null
    treatment?: string
}

export interface Appointment {
    id: string | number
    appointment_date: string
    start_time: string
    end_time: string
    status: string
    about?: string
    lead_id?: string | number
    procedure_name?: string
    leads?: { name: string }
    procedures?: { name: string }
}

export interface CalendarEvent {
    id: string | number
    title: string
    start: Date
    end: Date
    resource?: {
        status: string
        colorVariant: 'blue' | 'emerald' | 'amber' | 'gray' | 'rose'
        about?: string
        [key: string]: unknown
    }
}
