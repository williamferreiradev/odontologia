"use client"

import { Calendar } from "lucide-react"

export default function HistoryTab() {
    return (
        <div className="w-full bg-white border border-gray-200 rounded-xl shadow-sm p-8 flex flex-col">
            <h2 className="text-lg font-bold text-gray-900 mb-8">Histórico de Reativações</h2>

            <div className="flex flex-col divide-y divide-gray-100">

                {/* Item 1 */}
                <div className="py-6 flex items-center justify-between first:pt-0 last:pb-0">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-slate-50 text-gray-500 flex items-center justify-center border border-gray-200">
                            <Calendar className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-[15px] font-bold text-gray-900">Campanha de 28/02/2026</h3>
                            <p className="text-sm text-gray-400 font-medium mt-0.5">15 enviados • 4 respostas • 2 reativados</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-8 pr-4">
                        <div className="flex flex-col items-center">
                            <span className="text-xl font-black text-gray-600 tracking-tight">27%</span>
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Resposta</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-xl font-black text-emerald-500 tracking-tight">13%</span>
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Reativado</span>
                        </div>
                    </div>
                </div>

                {/* Item 2 */}
                <div className="py-6 flex items-center justify-between first:pt-0 last:pb-0">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-slate-50 text-gray-500 flex items-center justify-center border border-gray-200">
                            <Calendar className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-[15px] font-bold text-gray-900">Campanha de 21/02/2026</h3>
                            <p className="text-sm text-gray-400 font-medium mt-0.5">8 enviados • 2 respostas • 1 reativados</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-8 pr-4">
                        <div className="flex flex-col items-center">
                            <span className="text-xl font-black text-gray-600 tracking-tight">25%</span>
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Resposta</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-xl font-black text-emerald-500 tracking-tight">13%</span>
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Reativado</span>
                        </div>
                    </div>
                </div>

                {/* Item 3 */}
                <div className="py-6 flex items-center justify-between first:pt-0 last:pb-0">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-slate-50 text-gray-500 flex items-center justify-center border border-gray-200">
                            <Calendar className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-[15px] font-bold text-gray-900">Campanha de 14/02/2026</h3>
                            <p className="text-sm text-gray-400 font-medium mt-0.5">12 enviados • 5 respostas • 3 reativados</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-8 pr-4">
                        <div className="flex flex-col items-center">
                            <span className="text-xl font-black text-gray-600 tracking-tight">42%</span>
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Resposta</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-xl font-black text-emerald-500 tracking-tight">25%</span>
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Reativado</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
