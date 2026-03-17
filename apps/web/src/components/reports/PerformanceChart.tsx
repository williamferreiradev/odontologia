"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
    { name: 'Seg', Humano: 15, IA: 50 },
    { name: 'Ter', Humano: 20, IA: 60 },
    { name: 'Qua', Humano: 18, IA: 55 },
    { name: 'Qui', Humano: 25, IA: 70 },
    { name: 'Sex', Humano: 30, IA: 65 },
    { name: 'Sáb', Humano: 10, IA: 40 },
    { name: 'Dom', Humano: 5, IA: 30 },
]

export function PerformanceChart() {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: -20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 500 }}
                    dy={10}
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                />
                <Tooltip
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontWeight: 500 }}
                />
                <Legend
                    verticalAlign="top"
                    height={36}
                    iconType="circle"
                    wrapperStyle={{ paddingBottom: '20px' }}
                    formatter={(value) => <span style={{ color: '#4b5563', fontSize: '13px', fontWeight: 600 }}>{value}</span>}
                />
                <Bar dataKey="IA" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={12} />
                <Bar dataKey="Humano" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={12} />
            </BarChart>
        </ResponsiveContainer>
    )
}
