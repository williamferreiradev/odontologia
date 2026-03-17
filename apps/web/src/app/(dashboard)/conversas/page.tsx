"use client"

import { useState, useMemo } from "react"
import { ChatSidebar, ChatThread } from "@/components/chat/ChatSidebar"
import { ChatArea } from "@/components/chat/ChatArea"
import { Message } from "@/components/chat/MessageBubble"

const MOCK_THREADS: ChatThread[] = [
    { id: 1, name: "Roberto Alves", avatarInitials: "RA", lastMessage: "Bom dia, gostaria de marcar uma avaliação. A atendente de inteligência artificial me atendeu na madruga...", time: "10:45", unreadCount: 2 },
    { id: 2, name: "Maria Fernanda Costa", avatarInitials: "MC", lastMessage: "Sim, eu prefiro na quinta-feira.", time: "Ontem", unreadCount: 0 },
    { id: 3, name: "Carlos Antunes da Silva", avatarInitials: "CA", lastMessage: "Ainda não consegui ver o orçamento inteiro.", time: "Ontem", unreadCount: 1 },
    { id: 4, name: "Amanda Silva", avatarInitials: "AS", lastMessage: "Certo doutor, obrigada!", time: "Sexta", unreadCount: 0 },
    { id: 5, name: "Lucas Fernandes", avatarInitials: "LF", lastMessage: "Obrigado pela recepção", time: "Segunda", unreadCount: 0 },
    { id: 6, name: "Juliana Costa", avatarInitials: "JC", lastMessage: "Boa tarde!", time: "Há 1 semana", unreadCount: 0 },
    { id: 7, name: "Fernanda Lima", avatarInitials: "FL", lastMessage: "Combinado", time: "Há 2 meses", unreadCount: 0 },
    { id: 8, name: "Bruno Dias", avatarInitials: "BD", lastMessage: "Tudo bem, a gente remarcou", time: "Há 1 ano", unreadCount: 0 },
]

const MOCK_MESSAGES: Record<string, Message[]> = {
    "1": [
        { id: 101, text: "Olá! Seja bem-vindo à Clínica OdontoPrime. Sou a assistente virtual e estou aqui para agilizar seu atendimento. Como posso te ajudar hoje?", time: "09:00", isSentByMe: true },
        { id: 102, text: "Gostaria de marcar uma avaliação de implante dentário", time: "09:05", isSentByMe: false },
        { id: 103, text: "Perfeito, Roberto! Nossas avaliações são muito rápidas. Qual o melhor horário para você ao longo da semana? Temos vagas às terças ou quartas.", time: "09:05", isSentByMe: true },
        { id: 104, text: "Bom dia, gostaria de marcar uma avaliação. A atendente de inteligência artificial me atendeu na madruga de forma muito gentil.", time: "10:45", isSentByMe: false },
        { id: 105, text: "Gostaria de ver uma vaga na Quarta-feira à tarde, tem como?", time: "10:45", isSentByMe: false },
    ],
    "2": [
        { id: 201, text: "Olá Maria, tudo bem? Podemos confirmar sua consulta de retorno?", time: "14:00", isSentByMe: true },
        { id: 202, text: "Sim, eu prefiro na quinta-feira.", time: "15:30", isSentByMe: false },
    ]
}

export default function ConversasPage() {
    const [activeChatId, setActiveChatId] = useState<string | number | null>(null)
    const [searchTerm, setSearchTerm] = useState('')

    const filteredThreads = useMemo(() => {
        return MOCK_THREADS.filter(thread =>
            thread.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [searchTerm])

    const activeChat = MOCK_THREADS.find(t => t.id === activeChatId) || null
    const activeMessages = activeChatId ? (MOCK_MESSAGES[activeChatId.toString()] || []) : []

    return (
        <div className="flex h-screen w-full p-5">
            <div className="flex w-full h-full overflow-hidden bg-white border border-gray-200 rounded-2xl shadow-sm">
                <ChatSidebar
                    threads={filteredThreads}
                    activeId={activeChatId}
                    onSelectChat={setActiveChatId}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                />
                <ChatArea
                    activeChat={activeChat}
                    messages={activeMessages}
                />
            </div>
        </div>
    )
}
