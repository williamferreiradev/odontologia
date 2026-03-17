"use client"

import { ReactNode } from "react"
import { MoreHorizontal } from "lucide-react"

interface ChartCardProps {
    title: string
    children: ReactNode
}

export function ChartCard({ title, children }: ChartCardProps) {
    return (
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 flex flex-col h-full w-full">
            <div className="flex items-center justify-between mb-6 shrink-0">
                <h3 className="font-bold text-gray-900 text-base">{title}</h3>
                <button className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-50 transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>

            <div className="flex-1 min-h-[300px] w-full relative">
                {children}
            </div>
        </div>
    )
}
