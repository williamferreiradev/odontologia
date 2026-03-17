"use client"

import Link from 'next/link'
import { Activity } from 'lucide-react'

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 flex flex-col gap-8 border border-gray-100">

                {/* Header do Card */}
                <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                        <Activity className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dental Revenue OS</h1>
                        <p className="text-sm text-gray-500 mt-1">Acesse sua conta para continuar</p>
                    </div>
                </div>

                {/* Formulário */}
                <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-700" htmlFor="email">E-mail</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="dr.joao@clinica.com"
                                className="w-full h-12 px-4 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium text-gray-900 placeholder:text-gray-400"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-semibold text-gray-700" htmlFor="password">Senha</label>
                                <Link href="/esqueci-senha" className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors">
                                    Esqueci minha senha
                                </Link>
                            </div>
                            <input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="w-full h-12 px-4 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium text-gray-900 placeholder:text-gray-400"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                    >
                        Entrar
                    </button>
                </form>

                {/* Footer do Card */}
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Não tem conta?{' '}
                        <Link href="/cadastro" className="font-bold text-blue-600 hover:text-blue-800 transition-colors">
                            Cadastre-se
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    )
}
