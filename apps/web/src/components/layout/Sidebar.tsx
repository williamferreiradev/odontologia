"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    Activity,
    LayoutDashboard,
    KanbanSquare,
    Users,
    CalendarDays,
    MessageSquare,
    Settings,
    ChevronsLeft,
    ChevronsRight,
    LogOut,
    BarChart3,
    RefreshCw
} from "lucide-react"

const MAIN_MENU = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "CRM/Negociações", href: "/crm", icon: KanbanSquare, badge: "Novo" },
    { name: "Pacientes", href: "/pacientes", icon: Users },
    { name: "Agenda", href: "/agenda", icon: CalendarDays },
]

const MANAGEMENT_MENU = [
    { name: "Conversas", href: "/conversas", icon: MessageSquare },
    { name: "Relatórios", href: "/relatorios", icon: BarChart3 },
    { name: "Reativar Interessados", href: "/reativacao", icon: RefreshCw },
    { name: "Configurações", href: "/configuracoes", icon: Settings },
]

export function Sidebar() {
    const pathname = usePathname()
    const [isCollapsed, setIsCollapsed] = useState(false)

    const renderLinks = (items: typeof MAIN_MENU) => {
        return items.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            const Icon = item.icon

            return (
                <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center relative gap-3 px-3 py-2.5 mx-3 rounded-md transition-colors ${isActive
                        ? "bg-clinic-50 text-clinic-600 font-medium"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                    title={isCollapsed ? item.name : undefined}
                >
                    {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-clinic-500 rounded-r-full" />
                    )}

                    <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-clinic-600" : "text-gray-400 group-hover:text-gray-600"}`} />

                    {!isCollapsed && (
                        <span className="truncate flex-1">{item.name}</span>
                    )}

                    {/* Badge */}
                    {!isCollapsed && 'badge' in item && (
                        <span className="flex items-center justify-center bg-clinic-100 text-clinic-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                            {item.badge}
                        </span>
                    )}

                    {/* Tooltip for collapsed state */}
                    {isCollapsed && (
                        <div className="absolute left-full ml-4 w-max bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                            {item.name}
                        </div>
                    )}
                </Link>
            )
        })
    }

    return (
        <aside
            className={`bg-white border-r border-gray-200 flex flex-col h-screen transition-all duration-300 ease-in-out relative ${isCollapsed ? "w-20" : "w-72"
                }`}
        >
            {/* Collapse Toggle */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-6 bg-white border border-gray-200 rounded-full p-1 text-gray-400 hover:text-clinic-600 hover:border-clinic-200 shadow-sm z-50 transition-colors"
            >
                {isCollapsed ? <ChevronsRight className="w-4 h-4" /> : <ChevronsLeft className="w-4 h-4" />}
            </button>

            {/* Logo Area */}
            <div className={`h-20 flex items-center border-b border-gray-100 transition-all ${isCollapsed ? 'justify-center px-0' : 'px-6'}`}>
                <div className="flex items-center gap-3">
                    <div className="bg-clinic-50 p-2 rounded-lg shrink-0">
                        <Activity className="w-6 h-6 text-clinic-600" />
                    </div>
                    {!isCollapsed && (
                        <div className="flex flex-col min-w-0 overflow-hidden">
                            <span className="font-bold text-gray-900 text-lg leading-tight truncate">Dental Revenue OS</span>
                            <span className="text-xs text-gray-500 font-medium tracking-wide">GESTÃO DE CLÍNICAS</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 overflow-y-auto overflow-x-hidden flex flex-col gap-6 scrollbar-hide">

                {/* Main Section */}
                <div>
                    {!isCollapsed && (
                        <p className="px-6 mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                            Principal
                        </p>
                    )}
                    <div className="space-y-1">
                        {renderLinks(MAIN_MENU)}
                    </div>
                </div>

                {/* Management Section */}
                <div>
                    {!isCollapsed && (
                        <p className="px-6 mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                            Gestão
                        </p>
                    )}
                    <div className="space-y-1">
                        {renderLinks(MANAGEMENT_MENU)}
                    </div>
                </div>

            </nav>

            {/* User Footer Area */}
            <div className="border-t border-gray-200 p-4">
                <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} gap-3`}>
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-clinic-50 flex items-center justify-center shrink-0 border border-clinic-100">
                            <span className="text-clinic-600 font-semibold text-sm">W</span>
                        </div>

                        {!isCollapsed && (
                            <div className="flex flex-col min-w-0">
                                <span className="text-sm font-medium text-gray-900 truncate">William</span>
                                <span className="text-xs text-gray-500 truncate">Odontologia</span>
                            </div>
                        )}
                    </div>

                    {!isCollapsed && (
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors shrink-0">
                            <LogOut className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </aside>
    )
}
