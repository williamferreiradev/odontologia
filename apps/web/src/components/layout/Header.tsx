import { User } from "lucide-react"

export function Header() {
    // Can be made dynamic later based on route
    const pageTitle = "Dashboard Geral"
    const currentDate = new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

    return (
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm z-10 sticky top-0">
            <div className="flex flex-col">
                <h1 className="text-xl font-bold text-gray-900 leading-tight">{pageTitle}</h1>
                <p className="text-sm text-gray-500 capitalize">{currentDate}</p>
            </div>
            <div className="flex items-center gap-4">
                {/* Placeholder for future header actions, notifications etc */}
            </div>
        </header>
    )
}
