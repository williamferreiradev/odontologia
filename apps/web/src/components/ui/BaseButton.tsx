"use client"

import { ButtonHTMLAttributes } from "react"

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
}

export function BaseButton({ variant = 'primary', className = "", children, ...props }: BaseButtonProps) {

    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-clinic-500 focus:ring-offset-2 shadow-sm disabled:opacity-50 disabled:pointer-events-none"

    const variants = {
        primary: "bg-clinic-500 text-white hover:bg-clinic-600 border border-transparent",
        secondary: "bg-white text-slate-700 hover:bg-slate-50 border border-slate-300",
        ghost: "bg-transparent text-slate-700 hover:bg-slate-100 shadow-none",
        danger: "bg-red-600 text-white hover:bg-red-700 border border-transparent focus:ring-red-500",
    }

    // Define sizes here if needed, keeping simple for now
    const sizeStyles = "px-4 py-2 text-sm"

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizeStyles} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}
