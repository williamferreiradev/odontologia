"use client"

import Link from 'next/link'
import { Activity } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { signUpAction } from '../actions/auth'

function CadastroForm() {
    const searchParams = useSearchParams()
    const inviteId = searchParams?.get('invite')

    return (
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 flex flex-col gap-8 border border-gray-100">
            {/* Header do Card */}
            <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                    <Activity className="w-6 h-6 text-white" />
                </div>
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Criar Conta</h1>
                    <p className="text-sm text-gray-500 mt-1">Junte-se ao Dental Revenue OS</p>
                </div>
            </div>

            {/* Formulário */}
            <form className="flex flex-col gap-6" action={async (formData) => {
                const result = await signUpAction(formData)
                // Se retornar erro (ex: senha curta, email em uso), vc pode tratar depois num useState
                if (result?.error) {
                    console.error("Erro no cadastro:", result.error)
                }
            }}>

                {inviteId && (
                    <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
                        <Activity className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                        <p className="text-sm font-medium text-blue-900/80 leading-relaxed">
                            Você está aceitando um convite para entrar em uma clínica.
                        </p>
                    </div>
                )}

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-700" htmlFor="name">Nome Completo</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Dr. João Silva"
                            className="w-full h-12 px-4 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium text-gray-900 placeholder:text-gray-400"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-700" htmlFor="email">E-mail</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="dr.joao@clinica.com"
                            className="w-full h-12 px-4 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium text-gray-900 placeholder:text-gray-400"
                        />
                    </div>

                    {!inviteId && (
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-700" htmlFor="clinicName">Nome da sua Clínica</label>
                            <input
                                id="clinicName"
                                name="clinicName"
                                type="text"
                                placeholder="Ex: Clínica Odontológica XYZ"
                                className="w-full h-12 px-4 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium text-gray-900 placeholder:text-gray-400"
                            />
                        </div>
                    )}

                    {inviteId && <input type="hidden" name="inviteClinicId" value={inviteId} />}

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-700" htmlFor="password">Senha</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Mínimo 8 caracteres"
                            className="w-full h-12 px-4 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium text-gray-900 placeholder:text-gray-400"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-700" htmlFor="confirm_password">Confirmar Senha</label>
                        <input
                            id="confirm_password"
                            name="confirm_password"
                            type="password"
                            placeholder="Repita sua senha"
                            className="w-full h-12 px-4 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium text-gray-900 placeholder:text-gray-400"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                    Criar Conta
                </button>
            </form>

            {/* Footer do Card */}
            <div className="text-center pt-2 border-t border-gray-100">
                <p className="text-sm text-gray-600">
                    Já tem conta?{' '}
                    <Link href="/login" className="font-bold text-blue-600 hover:text-blue-800 transition-colors">
                        Faça login
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default function CadastroPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 py-12">
            <Suspense fallback={<div className="w-full max-w-md h-96 bg-white shadow-xl rounded-2xl flex items-center justify-center text-gray-400 text-sm font-medium">Carregando...</div>}>
                <CadastroForm />
            </Suspense>
        </div>
    )
}
