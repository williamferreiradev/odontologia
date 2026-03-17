"use client"

import { Calendar, Download, Trophy, TrendingUp, AlertTriangle, Lightbulb, Clock, CheckCircle2, Bot } from "lucide-react"
import Link from "next/link"
export default function RelatoriosPage() {
    return (
        <div className="w-full min-h-screen p-8 flex flex-col gap-6 bg-[#f8fafc]">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-blue-600" />
                        Relatórios & Performance
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Análise semanal do pipeline e automação IA
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium shadow-sm hover:bg-gray-50 transition-all">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        Esta Semana
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 text-gray-400"><path d="m6 9 6 6 6-6" /></svg>
                    </button>

                    <button className="flex items-center gap-2 px-4 py-2 border border-transparent bg-blue-600 text-white rounded-lg text-sm font-semibold shadow-sm hover:bg-blue-700 transition-all">
                        <Download className="w-4 h-4" />
                        Exportar
                    </button>
                </div>
            </div>

            {/* KPI Strip */}
            <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <h2 className="text-lg font-bold text-gray-900">Semana 24 Fev - 02 Mar</h2>
                    <span className="text-xs font-medium text-gray-400">8 leads nesta semana</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-6 divide-x divide-gray-100">
                    <div className="flex flex-col px-4 first:pl-0">
                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-2 shadow-sm border border-blue-100">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Leads</span>
                        <span className="text-3xl font-bold text-gray-900">8</span>
                    </div>

                    <div className="flex flex-col px-4">
                        <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 shadow-sm border border-emerald-100">
                            <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Qualificados</span>
                        <span className="text-3xl font-bold text-gray-900">3</span>
                    </div>

                    <div className="flex flex-col px-4">
                        <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mb-2 shadow-sm border border-amber-100">
                            <Calendar className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Agendamentos</span>
                        <span className="text-3xl font-bold text-gray-900">2</span>
                    </div>

                    <div className="flex flex-col px-4">
                        <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-2 shadow-sm border border-purple-100">
                            <Trophy className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Convertidos</span>
                        <span className="text-3xl font-bold text-gray-900">1</span>
                    </div>

                    <div className="flex flex-col px-4">
                        <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mb-2 shadow-sm border border-orange-100">
                            <TrendingUp className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Conversão</span>
                        <span className="text-3xl font-bold text-gray-900">12.5%</span>
                    </div>

                    <div className="flex flex-col px-4">
                        <div className="w-8 h-8 rounded-full bg-green-50 text-green-700 flex items-center justify-center mb-2 shadow-sm border border-green-100">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Receita</span>
                        <span className="text-3xl font-bold text-gray-900">R$ 17.8k</span>
                    </div>
                </div>
            </div>

            {/* Main Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column (2/3) */}
                <div className="lg:col-span-2 flex flex-col gap-6">

                    {/* Weekly Report Card */}
                    <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-8 flex flex-col">

                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <TrendingUp className="w-5 h-5 text-blue-600" />
                                <div className="flex flex-col">
                                    <h2 className="text-xl font-bold text-gray-900 tracking-tight">Relatório Semanal</h2>
                                </div>
                            </div>
                            <Link href="/relatorios/semanal" className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors">
                                Ver completo
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" x2="21" y1="14" y2="3" /></svg>
                            </Link>
                        </div>

                        <p className="text-[15px] text-gray-700 leading-relaxed mb-6">
                            Operamos um volume excepcional. Fechamento de alto ticket (Locação Tamboré - Pgmt Anual). Pipeline possui 3 contatos ultrarrápidos qualificados e alto volume em luxo.
                        </p>

                        {/* Destaques */}
                        <div className="mb-6">
                            <h3 className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                                Destaques
                            </h3>
                            <div className="flex flex-col gap-2">
                                <div className="bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-medium text-gray-800">
                                    <span className="text-lg">🏆</span>
                                    Fechamento Roberto Drummond — Pagamento pacote anual
                                </div>
                                <div className="bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-medium text-gray-800">
                                    <span className="text-lg">📈</span>
                                    Vicente Navarro iniciando flip-invest — 500m² visitados.
                                </div>
                                <div className="bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-medium text-gray-800">
                                    <span className="text-lg">📅</span>
                                    2 reuniões no Jardim Europa já avançando documentação
                                </div>
                            </div>
                        </div>

                        {/* Conselhos */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <Lightbulb className="w-4 h-4 text-blue-600" />
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                                    Conselhos para o Vendedor
                                </h3>
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="flex gap-3">
                                    <div className="w-6 h-6 shrink-0 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                                        1
                                    </div>
                                    <p className="text-sm font-medium text-gray-700 pt-0.5">
                                        Eduardo e Vicente precisam de velocidade documental: foquem nisso em caso de proposta
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-6 h-6 shrink-0 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                                        2
                                    </div>
                                    <p className="text-sm font-medium text-gray-700 pt-0.5">
                                        Fale sobre as opções B32 ou Pátio Malzoni c/ Henrique o mais breve
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Alertas */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <AlertTriangle className="w-4 h-4 text-amber-500" />
                                <h3 className="text-xs font-bold text-amber-500 uppercase tracking-widest">
                                    Alertas e Atenção
                                </h3>
                            </div>
                            <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl flex items-start gap-3 shadow-sm">
                                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                                <p className="text-sm font-medium leading-relaxed">
                                    Os investidores costumam mudar o foco se não tiver reposte ráp.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Registro de Atividade */}
                    <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-8 flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-gray-400" />
                                <h2 className="text-lg font-bold text-gray-900 tracking-tight">Registro de Atividade</h2>
                            </div>
                            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">7 registros</span>
                        </div>

                        <div className="flex flex-col gap-6 relative before:absolute before:inset-y-0 before:left-[19px] before:w-px before:bg-gray-200">

                            {/* Item 1 */}
                            <div className="relative flex gap-4">
                                <div className="w-10 h-10 shrink-0 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 flex items-center justify-center z-10 shadow-sm">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                                </div>
                                <div className="flex flex-col pt-1">
                                    <p className="text-[15px] text-gray-800 font-medium">
                                        Roberto Drummond fechou a locação do imóvel Tamboré (anual)
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[11px] font-bold text-gray-400">30min atrás</span>
                                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Fechamento</span>
                                    </div>
                                </div>
                            </div>

                            {/* Item 2 */}
                            <div className="relative flex gap-4">
                                <div className="w-10 h-10 shrink-0 bg-amber-50 text-amber-600 rounded-xl border border-amber-100 flex items-center justify-center z-10 shadow-sm">
                                    <Calendar className="w-[18px] h-[18px]" />
                                </div>
                                <div className="flex flex-col pt-1">
                                    <p className="text-[15px] text-gray-800 font-medium">
                                        Helena Bittencourt agendou visita: Mansão em Alphaville
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[11px] font-bold text-gray-400">2h atrás</span>
                                        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">Agendamento</span>
                                    </div>
                                </div>
                            </div>

                            {/* Item 3 */}
                            <div className="relative flex gap-4">
                                <div className="w-10 h-10 shrink-0 bg-teal-50 text-teal-600 rounded-xl border border-teal-100 flex items-center justify-center z-10 shadow-sm">
                                    <CheckCircle2 className="w-[18px] h-[18px]" />
                                </div>
                                <div className="flex flex-col pt-1">
                                    <p className="text-[15px] text-gray-800 font-medium">
                                        Alexandre Diniz está qualificado para cobertura de 22M
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[11px] font-bold text-gray-400">5h atrás</span>
                                        <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md">Qualificação</span>
                                    </div>
                                </div>
                            </div>

                            {/* Item 4 */}
                            <div className="relative flex gap-4">
                                <div className="w-10 h-10 shrink-0 bg-purple-50 text-purple-600 rounded-xl border border-purple-100 flex items-center justify-center z-10 shadow-sm">
                                    <Bot className="w-[18px] h-[18px]" />
                                </div>
                                <div className="flex flex-col pt-1">
                                    <p className="text-[15px] text-gray-800 font-medium">
                                        IA enviou follow-up de opções para locação na Vila Nova Conceição
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[11px] font-bold text-gray-400">8h atrás</span>
                                        <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">IA</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                {/* Right Column (1/3) */}
                <div className="flex flex-col gap-6">

                    {/* Funnel Chart Card */}
                    <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-8 flex flex-col">
                        <div className="flex items-center gap-2 mb-8">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                            <h2 className="text-lg font-bold text-gray-900 tracking-tight">Funil de Leads</h2>
                        </div>

                        <div className="flex flex-col mt-2">
                            {/* Bar 1 */}
                            <div className="flex items-center gap-4 mb-4">
                                <span className="w-24 text-sm text-gray-600 text-right font-medium">Novos</span>
                                <div className="flex-1 h-7 bg-slate-100 rounded-full overflow-hidden flex">
                                    <div
                                        style={{ width: '100%' }}
                                        className="h-full rounded-full flex items-center justify-end px-3 text-xs font-bold text-white transition-all bg-blue-400"
                                    >
                                        28
                                    </div>
                                </div>
                            </div>

                            {/* Bar 2 */}
                            <div className="flex items-center gap-4 mb-4">
                                <span className="w-24 text-sm text-gray-600 text-right font-medium">Contato</span>
                                <div className="flex-1 h-7 bg-slate-100 rounded-full overflow-hidden flex">
                                    <div
                                        style={{ width: '75%' }}
                                        className="h-full rounded-full flex items-center justify-end px-3 text-xs font-bold text-white transition-all bg-blue-500"
                                    >
                                        15
                                    </div>
                                </div>
                            </div>

                            {/* Bar 3 */}
                            <div className="flex items-center gap-4 mb-4">
                                <span className="w-24 text-sm text-gray-600 text-right font-medium">Qualificados</span>
                                <div className="flex-1 h-7 bg-slate-100 rounded-full overflow-hidden flex">
                                    <div
                                        style={{ width: '50%' }}
                                        className="h-full rounded-full flex items-center justify-end px-3 text-xs font-bold text-white transition-all bg-blue-600"
                                    >
                                        11
                                    </div>
                                </div>
                            </div>

                            {/* Bar 4 */}
                            <div className="flex items-center gap-4 mb-4">
                                <span className="w-24 text-sm text-gray-600 text-right font-medium">Agendados</span>
                                <div className="flex-1 h-7 bg-slate-100 rounded-full overflow-hidden flex">
                                    <div
                                        style={{ width: '40%' }}
                                        className="h-full rounded-full flex items-center justify-end px-3 text-xs font-bold text-white transition-all bg-blue-700"
                                    >
                                        10
                                    </div>
                                </div>
                            </div>

                            {/* Bar 5 */}
                            <div className="flex items-center gap-4 mb-4">
                                <span className="w-24 text-sm text-gray-600 text-right font-medium">Convertidos</span>
                                <div className="flex-1 h-7 bg-slate-100 rounded-full overflow-hidden flex">
                                    <div
                                        style={{ width: '20%' }}
                                        className="h-full rounded-full flex items-center justify-end px-3 text-xs font-bold text-white transition-all bg-blue-800"
                                    >
                                        4
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Weekly Summary Card */}
                    <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-8 flex flex-col">
                        <div className="flex items-center gap-2 mb-8">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" /></svg>
                            <h2 className="text-lg font-bold text-gray-900 tracking-tight">Resumo por Semana</h2>
                        </div>

                        <div className="flex flex-col gap-5">

                            {/* Sem 1 */}
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-semibold text-gray-500 w-10 shrink-0">Sem 1</span>
                                <div className="flex-1 flex flex-col gap-0.5">
                                    <div className="w-full flex items-center h-2">
                                        <div className="bg-blue-200 h-full rounded-r-full" style={{ width: '35%' }}></div>
                                    </div>
                                    <div className="w-full flex items-center h-2">
                                        <div className="bg-blue-600 h-full rounded-r-full" style={{ width: '0%' }}></div>
                                    </div>
                                </div>
                                <div className="flex gap-2 text-[10px] font-bold text-gray-400 w-8 justify-end">
                                    <span>4</span>
                                    <span className="text-emerald-500">0</span>
                                </div>
                            </div>

                            {/* Sem 2 */}
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-semibold text-gray-500 w-10 shrink-0">Sem 2</span>
                                <div className="flex-1 flex flex-col gap-0.5">
                                    <div className="w-full flex items-center h-2">
                                        <div className="bg-blue-200 h-full rounded-r-full" style={{ width: '45%' }}></div>
                                    </div>
                                    <div className="w-full flex items-center h-2">
                                        <div className="bg-emerald-500 h-full rounded-r-full" style={{ width: '15%' }}></div>
                                    </div>
                                </div>
                                <div className="flex gap-2 text-[10px] font-bold text-gray-400 w-8 justify-end">
                                    <span>5</span>
                                    <span className="text-emerald-500">1</span>
                                </div>
                            </div>

                            {/* Sem 3 */}
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-semibold text-gray-500 w-10 shrink-0">Sem 3</span>
                                <div className="flex-1 flex flex-col gap-0.5">
                                    <div className="w-full flex items-center h-2">
                                        <div className="bg-blue-200 h-full rounded-r-full" style={{ width: '55%' }}></div>
                                    </div>
                                    <div className="w-full flex items-center h-2">
                                        <div className="bg-emerald-500 h-full rounded-r-full" style={{ width: '25%' }}></div>
                                    </div>
                                </div>
                                <div className="flex gap-2 text-[10px] font-bold text-gray-400 w-8 justify-end">
                                    <span>6</span>
                                    <span className="text-emerald-500">2</span>
                                </div>
                            </div>

                            {/* Sem 4 */}
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-semibold text-gray-500 w-10 shrink-0">Sem 4</span>
                                <div className="flex-1 flex flex-col gap-0.5">
                                    <div className="w-full flex items-center h-2">
                                        <div className="bg-blue-200 h-full rounded-r-full" style={{ width: '75%' }}></div>
                                    </div>
                                    <div className="w-full flex items-center h-2">
                                        <div className="bg-emerald-500 h-full rounded-r-full" style={{ width: '15%' }}></div>
                                    </div>
                                </div>
                                <div className="flex gap-2 text-[10px] font-bold text-gray-400 w-8 justify-end">
                                    <span>8</span>
                                    <span className="text-emerald-500">1</span>
                                </div>
                            </div>

                        </div>

                        {/* Legend */}
                        <div className="flex items-center gap-4 mt-8 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-sm bg-blue-200"></div>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Leads</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></div>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Conversões</span>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}
