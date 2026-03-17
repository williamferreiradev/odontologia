"use client"

import { Sparkles, Settings } from "lucide-react"

export default function FollowUpTab() {
    return (
        <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-xl shadow-sm p-8 flex flex-col">

            {/* Topo */}
            <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50/50 text-blue-600 flex items-center justify-center border border-blue-100/50">
                        <Settings className="w-5 h-5" />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900">Configuração de Follow-up</h2>
                </div>
                {/* Toggle ativo */}
                <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer shadow-inner">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
            </div>

            <div className="flex flex-col gap-10">

                {/* Intervalo */}
                <div className="flex flex-col gap-4">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Intervalo Entre Mensagens</span>
                    <div className="flex gap-3">
                        <button className="px-6 py-2 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:bg-slate-50 transition-colors">24h</button>
                        <button className="px-6 py-2 rounded-lg text-sm font-bold bg-blue-600/90 text-white shadow-sm transition-colors ring-4 ring-blue-600/20">48h</button>
                        <button className="px-6 py-2 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:bg-slate-50 transition-colors">72h</button>
                    </div>
                </div>

                {/* Quantidade */}
                <div className="flex flex-col gap-4">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Quantidade de Follow-ups</span>
                    <div className="flex gap-3">
                        <button className="px-6 py-2 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:bg-slate-50 transition-colors">1x</button>
                        <button className="px-6 py-2 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:bg-slate-50 transition-colors">2x</button>
                        <button className="px-6 py-2 rounded-lg text-sm font-bold bg-blue-600/90 text-white shadow-sm transition-colors ring-4 ring-blue-600/20">3x</button>
                        <button className="px-6 py-2 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:bg-slate-50 transition-colors">5x</button>
                    </div>
                </div>

                {/* Mensagem */}
                <div className="flex flex-col gap-4">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Mensagem de Follow-up (Base)</span>
                    <textarea
                        className="w-full h-32 p-4 bg-slate-50/50 border border-gray-200 rounded-xl text-[15px] text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all leading-relaxed"
                        defaultValue="Oi! Passando para saber se conseguiu pensar sobre os tratamentos que conversamos. Temos horários disponíveis esta semana para avaliações presenciais. Posso te ajudar a encontrar o horário ideal? 🔑"
                    />
                </div>

                {/* Box IA */}
                <div className="bg-blue-50/50 border border-blue-100 p-5 rounded-xl flex items-start gap-4">
                    <Sparkles className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <p className="text-sm font-medium text-blue-900/80 leading-relaxed">
                        A IA vai adaptar automaticamente a mensagem de follow-up com base no contexto da conversa anterior e o produto de interesse do lead.
                    </p>
                </div>

            </div>
        </div>
    )
}
