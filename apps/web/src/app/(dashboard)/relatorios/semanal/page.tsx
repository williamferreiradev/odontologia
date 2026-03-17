"use client"

import { ArrowLeft, Trophy, TrendingUp, Calendar, Lightbulb, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function RelatorioSemanalPage() {
    return (
        <div className="w-full min-h-screen p-8 flex flex-col gap-6 bg-slate-50">
            {/* Botão Voltar */}
            <Link
                href="/relatorios"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors w-fit mb-4"
            >
                <ArrowLeft className="w-4 h-4" />
                Voltar para Relatórios
            </Link>

            {/* Cabeçalho */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Relatório Semanal Completo</h1>
                <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    Semana 24 Fev - 02 Mar
                </p>
            </div>

            {/* Layout Principal do Relatório */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200 flex flex-col gap-10">

                {/* Resumo Executivo */}
                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                        Resumo Executivo
                    </h2>
                    <div className="text-gray-700 leading-relaxed space-y-4 text-[15px]">
                        <p>
                            A semana apresentou uma performance excepcional no topo do funil, com um aumento de 35% no volume de leads qualificados
                            provenientes das campanhas de Instagram. A conversão em agendamentos manteve-se estável, porém observamos uma melhoria significativa
                            na qualidade das avaliações realizadas, resultando em 4 fechamentos em tratamentos de alto valor agregado (Implantes e Harmonização).
                        </p>
                        <p>
                            A atuação da Inteligência Artificial no pré-atendimento reduziu o tempo médio de primeira resposta para menos de 2 minutos,
                            coletando as principais queixas dos pacientes antes mesmo do contato humano. O foco para a próxima semana deve ser a
                            reativação dos pacientes que realizaram avaliação há mais de 15 dias e não retornaram.
                        </p>
                    </div>
                </section>

                <hr className="border-gray-100" />

                {/* Destaques da Semana */}
                <section>
                    <h2 className="flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">
                        <Trophy className="w-4 h-4 text-amber-500" />
                        Destaques da Semana
                    </h2>
                    <div className="flex flex-col gap-3">
                        <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex items-center gap-4 shadow-sm">
                            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex justify-center items-center shrink-0">
                                <Trophy className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-gray-900">Fechamento Recorde</h4>
                                <p className="text-sm text-gray-600 mt-0.5">Paciente Roberto Carlos fechou protocolo completo superior e inferior.</p>
                            </div>
                        </div>
                        <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex items-center gap-4 shadow-sm">
                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex justify-center items-center shrink-0">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-gray-900">Metas de Agendamento Atingidas</h4>
                                <p className="text-sm text-gray-600 mt-0.5">A equipe da recepção conseguiu agendar 80% dos leads frios da campanha de clareamento.</p>
                            </div>
                        </div>
                        <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex items-center gap-4 shadow-sm">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex justify-center items-center shrink-0">
                                <Calendar className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-gray-900">Agenda Lotada</h4>
                                <p className="text-sm text-gray-600 mt-0.5">Quinta e Sexta-feira com 100% de ocupação nas cadeiras de avaliação.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Conselhos (IA) */}
                <section>
                    <h2 className="flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">
                        <Lightbulb className="w-4 h-4 text-blue-600" />
                        Análise e Conselhos Práticos
                    </h2>
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-4 p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-8 h-8 shrink-0 rounded-full bg-blue-600 text-white flex justify-center items-center font-bold text-sm shadow-sm">
                                1
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-gray-900">Foque na Confirmação de Consultas</h4>
                                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                                    Historicamente, as segundas-feiras apresentam uma taxa de falta de 15%. Recomendamos que a recepção inicie o
                                    disparo de mensagens manuais (ou via IA) com 48h de antecedência, reforçando a importância do comparecimento.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-8 h-8 shrink-0 rounded-full bg-blue-600 text-white flex justify-center items-center font-bold text-sm shadow-sm">
                                2
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-gray-900">Ofereça Up-sell de Clareamento</h4>
                                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                                    Para 12 pacientes agendados para limpeza profilática nesta semana, sugerimos oferecer um pacote especial de
                                    clareamento caseiro ao final da consulta.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-8 h-8 shrink-0 rounded-full bg-blue-600 text-white flex justify-center items-center font-bold text-sm shadow-sm">
                                3
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-gray-900">Acelere o Follow-up de Implantes</h4>
                                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                                    Existem 5 orçamentos de Implante abertos há mais de 7 dias. Entre em contato oferecendo flexibilidade nas
                                    condições de pagamento para fechar o plano de tratamento neste mês.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pontos de Atenção (Alertas) */}
                <section>
                    <h2 className="flex items-center gap-2 text-sm font-bold text-amber-500 uppercase tracking-widest mb-4">
                        <AlertTriangle className="w-4 h-4" />
                        Pontos de Atenção Críticos
                    </h2>
                    <div className="bg-amber-50 border border-amber-200 p-5 rounded-xl flex flex-col gap-4">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="text-sm font-bold text-amber-900">Gargalo no Atendimento da Tarde</h4>
                                <p className="text-sm text-amber-800 mt-1">
                                    Notamos que leads que entram entre 14h e 16h demoram, em média, 45 minutos para a primeira resposta humana.
                                    Sugerimos alocar um atendente prioritário neste horário para não perder lances quentes.
                                </p>
                            </div>
                        </div>
                        <hr className="border-amber-200/50" />
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="text-sm font-bold text-amber-900">Taxa de Rejeição de Orçamentos de Alto Valor</h4>
                                <p className="text-sm text-amber-800 mt-1">
                                    3 tratamentos orçados acima de R$ 15.000 foram recusados alegando &quot;concorrência mais barata&quot;. Avalie a estratégia
                                    de ancoragem de valor durante a consulta de avaliação com os dentistas responsáveis.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    )
}
