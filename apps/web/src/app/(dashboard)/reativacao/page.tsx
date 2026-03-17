"use client"

import { useState } from "react"
import { RefreshCw, Send, Clock, FileText } from "lucide-react"
import BlastTab from "@/components/reactivation/BlastTab"
import FollowUpTab from "@/components/reactivation/FollowUpTab"
import HistoryTab from "@/components/reactivation/HistoryTab"

export default function ReativacaoPage() {
    const [activeTab, setActiveTab] = useState<'disparo' | 'followup' | 'historico'>('disparo')

    return (
        <div className="w-full min-h-screen p-8 flex flex-col gap-8 bg-[#f8fafc]">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                    <RefreshCw className="w-6 h-6 text-blue-600" />
                    Reativar Interessados
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Disparos de reativação, follow-up e nutrição de base
                </p>
            </div>

            {/* Tabs & Content Container */}
            <div className="flex flex-col gap-6">
                {/* Tabs */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setActiveTab('disparo')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'disparo'
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-slate-50'
                            }`}
                    >
                        <Send className="w-4 h-4" />
                        Disparo
                    </button>
                    <button
                        onClick={() => setActiveTab('followup')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'followup'
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-slate-50'
                            }`}
                    >
                        <Clock className="w-4 h-4" />
                        Follow-up
                    </button>
                    <button
                        onClick={() => setActiveTab('historico')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'historico'
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-slate-50'
                            }`}
                    >
                        <FileText className="w-4 h-4" />
                        Histórico
                    </button>
                </div>

                {/* Tab Content */}
                <div className="flex-1 w-full relative">
                    {activeTab === 'disparo' && <BlastTab />}
                    {activeTab === 'followup' && <FollowUpTab />}
                    {activeTab === 'historico' && <HistoryTab />}
                </div>
            </div>
        </div>
    )
}
