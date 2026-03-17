"use client"

interface ChatItemProps {
    id: string | number
    name: string
    avatarInitials: string
    lastMessage: string
    time: string
    unreadCount?: number
    isActive?: boolean
    onClick?: () => void
}

export function ChatItem({
    name,
    avatarInitials,
    lastMessage,
    time,
    unreadCount = 0,
    isActive = false,
    onClick
}: ChatItemProps) {
    return (
        <div
            onClick={onClick}
            className={`flex items-start gap-4 p-4 cursor-pointer border-b border-gray-50 transition-colors ${isActive ? 'bg-blue-50/50' : 'hover:bg-slate-50'
                }`}
        >
            {/* Avatar */}
            <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center text-sm font-bold border shadow-sm ${isActive ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-slate-100 text-gray-600 border-gray-200'
                }`}>
                {avatarInitials}
            </div>

            {/* Content Area */}
            <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-center justify-between mb-1">
                    <h4 className={`font-semibold truncate pr-2 ${isActive ? 'text-gray-900' : 'text-gray-800'}`}>
                        {name}
                    </h4>
                    <span className={`text-xs whitespace-nowrap ${isActive ? 'text-clinic-600 font-medium' : 'text-gray-400'}`}>
                        {time}
                    </span>
                </div>

                <div className="flex items-center justify-between gap-3 relative">
                    <p className="text-sm text-gray-500 truncate mt-0.5">
                        {lastMessage}
                    </p>

                    {unreadCount > 0 && (
                        <span className="w-5 h-5 shrink-0 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                            {unreadCount > 99 ? '99+' : unreadCount}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}
