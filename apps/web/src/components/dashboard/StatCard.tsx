"use client"

import { Users, Calendar, Kanban, Activity, Download, Settings, TrendingUp, TrendingDown } from "lucide-react"

const iconMap: Record<string, React.ElementType> = {
    users: Users,
    calendar: Calendar,
    kanban: Kanban,
    activity: Activity,
    settings: Settings,
    download: Download,
}

interface StatCardProps {
    title: string
    value: string | number
    icon: string // Passed as string from server
    description?: string
    trend?: {
        value: string
        positive?: boolean
    }
}

export function StatCard({ title, value, icon, description, trend }: StatCardProps) {
    const IconComponent = iconMap[icon] || Activity // Fallback icon

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col justify-between h-full">
            <div className="flex items-start justify-between mb-4">
                <span className="text-sm font-medium text-gray-500">{title}</span>
                <div className="bg-blue-50 p-2 rounded-lg shrink-0">
                    <IconComponent className="w-5 h-5 text-blue-600" />
                </div>
            </div>

            <div>
                <span className="text-2xl font-bold text-gray-900">{value}</span>
                {description && (
                    <p className="text-sm text-gray-500 mt-1">{description}</p>
                )}
                {trend && (
                    <div className="mt-2 flex items-center gap-1 text-xs">
                        {trend.positive ? (
                            <TrendingUp className="w-4 h-4 text-emerald-600" />
                        ) : (
                            <TrendingDown className="w-4 h-4 text-rose-600" />
                        )}
                        <span className={trend.positive ? "text-emerald-600 font-medium" : "text-rose-600 font-medium"}>
                            {trend.value}
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}
