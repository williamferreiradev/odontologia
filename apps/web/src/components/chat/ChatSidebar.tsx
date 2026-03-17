"use client"

import { Search } from "lucide-react"
import { ChatItem } from "./ChatItem"

export interface ChatThread {
    id: string | number
    name: string
    avatarInitials: string
    lastMessage: string
    time: string
    unreadCount?: number
}

interface ChatSidebarProps {
    threads: ChatThread[]
    activeId: string | number | null
    onSelectChat: (id: string | number) => void
    searchTerm: string
    onSearchChange: (value: string) => void
}

export function ChatSidebar({ threads, activeId, onSelectChat, searchTerm, onSearchChange }: ChatSidebarProps) {
    return (
        <div className="w-80 lg:w-96 flex-shrink-0 flex flex-col h-full border-r border-gray-200 bg-white">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex flex-col gap-4">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">Conversas</h2>

                {/* Search Input */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="w-4 h-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Pesquisar contatos..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full bg-slate-50 border border-gray-100 pl-9 pr-3 py-2 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder:text-gray-400"
                    />
                </div>
            </div>

            {/* Chat List (Scrollable Area) */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-track]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-gray-300">
                {threads.map((thread) => (
                    <ChatItem
                        key={thread.id}
                        {...thread}
                        isActive={activeId === thread.id}
                        onClick={() => onSelectChat(thread.id)}
                    />
                ))}

                {threads.length === 0 && (
                    <div className="p-6 text-center text-sm text-gray-400">
                        Nenhuma conversa encontrada.
                    </div>
                )}
            </div>
        </div>
    )
}
