"use client"

export interface Message {
    id: string | number
    text: string
    time: string
    isSentByMe?: boolean // Deprecated, use role instead
    role?: 'user' | 'agent' | 'system'
}

interface MessageBubbleProps {
    message: Message
}

import { Sparkles } from "lucide-react"

export function MessageBubble({ message }: MessageBubbleProps) {
    const { text, time, isSentByMe, role } = message

    // Determine the actual role to maintain backward compatibility with isSentByMe
    const actualRole = role || (isSentByMe ? 'agent' : 'user')

    if (actualRole === 'system') {
        return (
            <div className="flex w-full justify-center my-2">
                <div className="w-[85%] mx-auto bg-amber-50 border border-amber-200 rounded-xl shadow-sm p-4 relative">
                    <div className="flex items-center gap-2 mb-2 text-amber-800">
                        <Sparkles className="w-4 h-4 fill-amber-700" />
                        <span className="text-xs font-bold tracking-wide uppercase">Resumo Gerado pela I.A.</span>
                    </div>
                    <p className="text-sm text-amber-900 whitespace-pre-wrap leading-relaxed">
                        {text}
                    </p>
                    <div className="flex justify-end mt-2">
                        <span className="text-[11px] font-medium text-amber-600/70">{time}</span>
                    </div>
                </div>
            </div>
        )
    }

    const isAgent = actualRole === 'agent'

    return (
        <div className={`flex w-full ${isAgent ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`max-w-[85%] md:max-w-[75%] lg:max-w-[65%] px-4 py-3 relative group ${isAgent
                    ? 'bg-blue-600 text-white rounded-2xl rounded-br-sm shadow-md shadow-blue-900/5'
                    : 'bg-white text-gray-800 rounded-2xl rounded-bl-sm border border-gray-100 shadow-sm'
                    }`}
            >
                <p className={`text-[15px] leading-relaxed break-words whitespace-pre-wrap ${isAgent ? 'text-blue-50' : 'text-gray-700'}`}>
                    {text}
                </p>

                {/* Time Indicator */}
                <div className={`flex items-center justify-end gap-1 mt-1.5 min-w-[50px] ${isAgent ? 'text-blue-200' : 'text-gray-400'}`}>
                    <span className="text-[11px] font-medium tracking-wide">
                        {time}
                    </span>
                    {/* Read Receipts placeholders if sent by me */}
                    {isAgent && (
                        <svg viewBox="0 0 16 15" width="16" height="15" className="fill-current opacity-80">
                            <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path>
                        </svg>
                    )}
                </div>
            </div>
        </div>
    )
}
