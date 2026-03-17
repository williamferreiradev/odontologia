"use client"

import { Camera, Shield, Bell, User } from "lucide-react"

export default function ConfiguracoesPage() {
    return (
        <div className="w-full max-w-4xl mx-auto p-8 flex flex-col gap-8">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                    <User className="w-6 h-6 text-blue-600" />
                    Configurações do Perfil
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Gerencie suas informações pessoais e de segurança
                </p>
            </div>

            {/* Seção 1: Informações Pessoais */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 border-b border-gray-100 flex items-center gap-2 bg-slate-50/50">
                    <User className="w-5 h-5 text-gray-400" />
                    <h2 className="text-[15px] font-bold text-gray-900">Informações Pessoais</h2>
                </div>

                <div className="p-8 flex flex-col md:flex-row gap-10">
                    {/* Esquerda: Avatar */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative group cursor-pointer">
                            <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-blue-50 flex items-center justify-center text-blue-600 overflow-hidden">
                                {/* Placeholder image or initials */}
                                <span className="text-4xl font-black opacity-50">JS</span>
                            </div>
                            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera className="w-8 h-8 text-white" />
                            </div>
                            <button className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md border-2 border-white hover:bg-blue-700 transition-colors">
                                <Camera className="w-4 h-4" />
                            </button>
                        </div>
                        <span className="text-xs font-semibold text-gray-400 text-center w-32">
                            JPG, GIF ou PNG. Máxima de 2MB.
                        </span>
                    </div>

                    {/* Direita: Formulário */}
                    <form className="flex-1 flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2 md:col-span-2">
                                <label className="text-sm font-semibold text-gray-700" htmlFor="fullName">Nome Completo</label>
                                <input
                                    id="fullName"
                                    type="text"
                                    defaultValue="Dr. João Silva"
                                    className="w-full h-11 px-4 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium text-gray-900"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-700" htmlFor="profileEmail">E-mail</label>
                                <input
                                    id="profileEmail"
                                    type="email"
                                    defaultValue="dr.joao@clinica.com"
                                    className="w-full h-11 px-4 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium text-gray-900"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-700" htmlFor="phone">Telefone</label>
                                <input
                                    id="phone"
                                    type="text"
                                    defaultValue="(11) 98765-4321"
                                    className="w-full h-11 px-4 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium text-gray-900"
                                />
                            </div>
                        </div>
                    </form>
                </div>

                <div className="p-5 bg-slate-50 border-t border-gray-100 flex justify-end">
                    <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm transition-all text-sm">
                        Salvar Alterações
                    </button>
                </div>
            </div>

            {/* Seção 2: Segurança */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 border-b border-gray-100 flex items-center gap-2 bg-slate-50/50">
                    <Shield className="w-5 h-5 text-gray-400" />
                    <h2 className="text-[15px] font-bold text-gray-900">Segurança</h2>
                </div>

                <div className="p-8">
                    <form className="flex flex-col gap-6 max-w-xl" onSubmit={(e) => e.preventDefault()}>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-700" htmlFor="currentPassword">Senha Atual</label>
                            <input
                                id="currentPassword"
                                type="password"
                                placeholder="Digite sua senha atual"
                                className="w-full h-11 px-4 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium text-gray-900"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-700" htmlFor="newPassword">Nova Senha</label>
                                <input
                                    id="newPassword"
                                    type="password"
                                    placeholder="Nova senha"
                                    className="w-full h-11 px-4 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium text-gray-900"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-700" htmlFor="confirmNewPassword">Confirmar Nova Senha</label>
                                <input
                                    id="confirmNewPassword"
                                    type="password"
                                    placeholder="Repita a nova senha"
                                    className="w-full h-11 px-4 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium text-gray-900"
                                />
                            </div>
                        </div>
                    </form>
                </div>

                <div className="p-5 bg-slate-50 border-t border-gray-100 flex justify-end">
                    <button className="px-6 py-2.5 bg-gray-900 hover:bg-black text-white font-bold rounded-xl shadow-sm transition-all text-sm">
                        Atualizar Senha
                    </button>
                </div>
            </div>

            {/* Seção 3: Preferências */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 border-b border-gray-100 flex items-center gap-2 bg-slate-50/50">
                    <Bell className="w-5 h-5 text-gray-400" />
                    <h2 className="text-[15px] font-bold text-gray-900">Preferências</h2>
                </div>

                <div className="p-8">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <h3 className="text-sm font-bold text-gray-900">Notificações por E-mail</h3>
                            <p className="text-sm text-gray-500">Receba resumos diários e alertas de reativação no seu e-mail.</p>
                        </div>
                        {/* Toggle Ativo */}
                        <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer shadow-inner">
                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ring-4 ring-blue-600/20"></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
