import { Sidebar } from "./Sidebar"

interface DashboardLayoutProps {
    children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
            {/* Sidebar fixed to the left */}
            <Sidebar />

            {/* Main Content wrapper */}
            <div className="flex-1 flex flex-col min-w-0 h-screen">

                {/* Scrollable Main Area */}
                <main className="flex-1 w-full overflow-y-auto bg-slate-50 min-h-screen text-gray-900">
                    {children}
                </main>
            </div>
        </div>
    )
}
