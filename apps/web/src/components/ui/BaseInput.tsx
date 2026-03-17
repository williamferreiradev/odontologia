"use client"

import { InputHTMLAttributes } from "react"

interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

export function BaseInput({ label, id, className = "", ...props }: BaseInputProps) {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label htmlFor={id} className="text-sm font-medium text-slate-700">
                    {label}
                </label>
            )}
            <input
                id={id}
                className={`w-full px-3 py-2 bg-transparent md:bg-white border border-slate-300 rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-shadow shadow-sm ${className}`}
                {...props}
            />
        </div>
    )
}
