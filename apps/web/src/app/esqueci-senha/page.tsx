"use client"

import Link from 'next/link'
import { KeyRound } from 'lucide-react'

export default function EsqueciSenhaPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 py-12">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 flex flex-col gap-8 border border-gray-100">

                {/* Header do Card */}
                <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center shadow-sm">
                        <KeyRound className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Recuperar Senha</h1>
                        <p className="text-sm text-gray-500 mt-2 leading-relaxed max-w-[280px] mx-auto">
                            Digite seu e-mail e enviaremos um link para redefinir sua senha.
                        </p>
                    </div>
                </div>

                {/* Formulário */}
                <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-700" htmlFor="email">E-mail cadastrado</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="dr.joao@clinica.com"
                            className="w-full h-12 px-4 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium text-gray-900 placeholder:text-gray-400"
                        />
                    </div>

                    <div className="flex flex-col gap-3">
                        <button
                            type="submit"
                            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                        >
                            Enviar link de recuperação
                        </button>

                        <Link
                            href="/login"
                            className="w-full h-12 bg-white border border-gray-200 text-gray-700 hover:bg-slate-50 font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                            Voltar para o login
                        </Link>
                    </div>
                </form>

            </div>
        </div>
    )
}
