"use client"

import { Sparkles } from "lucide-react"

const AGENTS_MOCK = [
    {
        id: 1,
        name: "Assistente Virtual",
        avatar: "IA",
        isAI: true,
        leads: 450,
        avgTime: "1 min",
        conversion: "28%"
    },
    {
        id: 2,
        name: "Dr. Roberto Silva",
        avatar: "RS",
        isAI: false,
        leads: 120,
        avgTime: "45 mins",
        conversion: "45%"
    },
    {
        id: 3,
        name: "Carla (Recepção)",
        avatar: "CR",
        isAI: false,
        leads: 380,
        avgTime: "15 mins",
        conversion: "18%"
    }
]

export function AgentTable() {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden w-full">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-bold text-gray-900 text-base">Desempenho por Atendente / IA</h3>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-gray-500 uppercase text-xs font-semibold">
                        <tr>
                            <th scope="col" className="px-6 py-4">Nome</th>
                            <th scope="col" className="px-6 py-4">Leads Atendidos</th>
                            <th scope="col" className="px-6 py-4">Tempo Médio</th>
                            <th scope="col" className="px-6 py-4">Taxa de Conversão</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {AGENTS_MOCK.map((agent) => (
                            <tr key={agent.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border shadow-sm ${agent.isAI ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-blue-50 text-blue-700 border-blue-100'
                                        }`}>
                                        {agent.isAI ? <Sparkles className="w-4 h-4" /> : agent.avatar}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-gray-900">{agent.name}</span>
                                        {agent.isAI && (
                                            <span className="text-[10px] font-semibold text-amber-600 uppercase tracking-widest mt-0.5">Automático</span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-700">{agent.leads}</td>
                                <td className="px-6 py-4 text-gray-600">{agent.avgTime}</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2 py-1 rounded bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
                                        {agent.conversion}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
