"use client"

import { Bot, Paperclip, Send, Sparkles, MoreVertical, MessageSquare, Loader2 } from "lucide-react"
import { MessageBubble, Message } from "./MessageBubble"
import { useState, useRef, useEffect } from "react"
import { ChatThread } from "./ChatSidebar"

interface ChatAreaProps {
    activeChat: ChatThread | null
    messages: Message[]
}

export function ChatArea({ activeChat, messages }: ChatAreaProps) {
    const [inputValue, setInputValue] = useState('')
    const [localMessages, setLocalMessages] = useState<Message[]>([])
    const [isGenerating, setIsGenerating] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    // Sync messages prop to local state
    useEffect(() => {
        setLocalMessages(messages)
    }, [messages, activeChat?.id])

    // Auto-scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [localMessages])

    const handleGenerateSummary = () => {
        setIsGenerating(true)
        // Mocking API call simulation
        setTimeout(() => {
            const summaryMessage: Message = {
                id: `sys - ${Date.now()} `,
                text: "- Paciente com dor no dente do siso.\n- Informou que tem convênio SulAmérica.\n- Agendamento sugerido para amanhã à tarde.",
                time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
                role: 'system'
            }
            setLocalMessages(prev => [...prev, summaryMessage])
            setIsGenerating(false)
        }, 1500)
    }

    if (!activeChat) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 border-l border-gray-100 hidden md:flex">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 mb-6 text-gray-300">
                    <MessageSquare size={32} />
                </div>
                <h3 className="text-xl font-medium text-gray-500">Selecione uma conversa</h3>
                <p className="text-sm text-gray-400 mt-2 max-w-[280px] text-center">
                    Escolha um paciente na barra lateral para carregar o histórico do WhatsApp.
                </p>
            </div>
        )
    }

    return (
        <div className="flex-1 flex flex-col h-full bg-slate-50 min-w-0 relative">
            {/* Header */}
            <div className="h-[72px] shrink-0 bg-white border-b border-gray-200 px-6 flex items-center justify-between z-20 shadow-sm relative">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 shrink-0 bg-blue-50 text-blue-600 font-bold rounded-full flex items-center justify-center border border-blue-100 placeholder-avatar">
                        {activeChat.avatarInitials}
                    </div>
                    <div className="flex flex-col">
                        <h2 className="font-bold text-gray-900 leading-tight">{activeChat.name}</h2>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <Bot className="w-3.5 h-3.5 text-blue-500" />
                            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">Atendido por IA</span>
                        </div>
                    </div>
                </div>
                <button className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-colors">
                    <MoreVertical className="w-5 h-5" />
                </button>
            </div>

            {/* Scrollable Messages Area */}
            {/* Tailwind Pattern mimicking Whatsapp Web Background (Optional subtle noise/pattern) */}
            <div
                className="flex-1 overflow-y-auto overflow-x-hidden p-6 flex flex-col gap-4 relative scroll-smooth [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-300/50 [&::-webkit-scrollbar-track]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-gray-300"
                style={{
                    backgroundColor: '#E5DDD5',
                    backgroundImage: 'url("https://w7.pngwing.com/pngs/351/931/png-transparent-whatsapp-background-texture-seamless-pattern-lines-thumbnail.png")', // extremely subtle whatsapp pattern fallback
                    backgroundBlendMode: 'soft-light',
                    opacity: 0.95
                }}
            >
                {/* Floating AI Resume Button inside area (Absolute to container) */}
                <button
                    onClick={handleGenerateSummary}
                    disabled={isGenerating}
                    className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-blue-600 text-white shadow-lg rounded-full px-5 py-2 hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 text-sm font-semibold disabled:opacity-75 disabled:hover:scale-100 disabled:cursor-not-allowed"
                >
                    {isGenerating ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Analisando...
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-4 h-4 fill-white" />
                            Gerar Resumo IA
                        </>
                    )}
                </button>

                {/* Date separator Mock */}
                <div className="flex justify-center my-4 mt-8">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-500 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-sm border border-gray-100">
                        Hoje
                    </span>
                </div>

                {/* Render Messages */}
                {localMessages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                ))}

                {/* Dummy div to scroll to bottom if needed */}
                <div ref={messagesEndRef} className="h-4 shrink-0"></div>
            </div>

            {/* Input Bar */}
            <div className="flex-shrink-0 bg-white border-t border-gray-200 p-4 flex items-end gap-2 z-20">
                <button className="p-3 text-gray-500 hover:text-gray-700 transition-colors shrink-0">
                    <Paperclip className="w-6 h-6" />
                </button>
                <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex items-center min-h-[48px]">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Digite uma mensagem..."
                        className="w-full bg-transparent px-4 py-3 text-[15px] focus:outline-none text-gray-800 placeholder:text-gray-400"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && inputValue.trim()) {
                                // Mock send mechanic wrapper
                                setInputValue('')
                            }
                        }}
                    />
                </div>
                <button
                    className={`p-3 shrink-0 rounded-full transition-all ${inputValue.trim()
                            ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:scale-105'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                >
                    <Send className="w-5 h-5 ml-1" />
                </button>
            </div>
        </div>
    )
}
