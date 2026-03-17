"use client"

import { useState, useRef, MouseEvent as ReactMouseEvent } from "react"
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    PointerSensor,
    useSensor,
    useSensors,
    closestCorners
} from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import { KanbanColumn } from "./KanbanColumn"
import { PatientDetailsPanel, Lead } from "@/components/shared/PatientDetailsPanel"

// Exporting mock data definition here or just storing locally
const INITIAL_MOCK_DATA = {
    novos: [
        { id: 1, name: "Roberto Alves", treatment: "Canal", value: "R$ 1.200", status: "Novo", lastContact: "Hoje 09:30" },
        { id: 6, name: "Juliana Costa", treatment: "Avaliação Geral", value: "R$ 150", status: "Novo", lastContact: "Hoje 10:15" },
    ],
    qualificando: [
        { id: 3, name: "Carlos Antunes", treatment: "Ortodontia", value: "R$ 2.100", status: "Qualificando", lastContact: "Ontem 18:00" },
        { id: 7, name: "Fernanda Lima", treatment: "Lente de Contato", value: "R$ 8.000", status: "Qualificando", lastContact: "Ontem 14:20" },
    ],
    agendados: [
        { id: 2, name: "Maria Fernanda", treatment: "Clareamento", value: "R$ 800", status: "Agendado", lastContact: "Há 2 dias" },
    ],
    fechados: [
        { id: 4, name: "Amanda Silva", treatment: "Lente de Contato", value: "R$ 6.000", status: "Fechado", lastContact: "Há 1 semana" },
        { id: 8, name: "Bruno Dias", treatment: "Implante Dentário", value: "R$ 5.200", status: "Fechado", lastContact: "Há 2 semanas" },
    ]
}

export const CRM_MOCK_DATA = INITIAL_MOCK_DATA // To avoid breaking List View

export type ColumnsKey = 'novo' | 'qualificando' | 'qualificado' | 'fechado';

interface KanbanBoardProps {
    initialData: Record<ColumnsKey, Lead[]>
}

export function KanbanBoard({ initialData }: KanbanBoardProps) {
    // Agora o state inicializa com os dados reias injetados pelo Server Component
    const [columns, setColumns] = useState(initialData)

    // Modal State
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleViewDetails = (lead: Lead) => {
        setSelectedLead(lead)
        setIsModalOpen(true)
    }

    // Grab to pan ref & state
    const boardRef = useRef<HTMLDivElement>(null)
    const [isDraggingBoard, setIsDraggingBoard] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)

    // DND Sensors
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5, // 5px movement before dragging starts
            },
        })
    )

    // Grab to pan handlers
    const handleMouseDown = (e: ReactMouseEvent) => {
        // Prevent grabbing background if they are pressing down on anything else (like a card)
        if (!boardRef.current || e.target !== boardRef.current) return

        setIsDraggingBoard(true)
        setStartX(e.pageX - boardRef.current.offsetLeft)
        setScrollLeft(boardRef.current.scrollLeft)
    }

    const handleMouseLeave = () => {
        setIsDraggingBoard(false)
    }

    const handleMouseUp = () => {
        setIsDraggingBoard(false)
    }

    const handleMouseMove = (e: ReactMouseEvent) => {
        if (!isDraggingBoard || !boardRef.current) return
        e.preventDefault()
        const x = e.pageX - boardRef.current.offsetLeft
        const walk = (x - startX) * 2 // Scroll speed multiplier
        boardRef.current.scrollLeft = scrollLeft - walk
    }

    // Identify which column a given item (by ID) belongs to
    const findColumnOfItem = (id: string | number) => {
        if (columns.novo.find((item) => item.id === id)) return "novo"
        if (columns.qualificando.find((item) => item.id === id)) return "qualificando"
        if (columns.qualificado.find((item) => item.id === id)) return "qualificado"
        if (columns.fechado.find((item) => item.id === id)) return "fechado"
        return null
    }

    // DND onDragOver handler: moving items between columns in real-time
    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event

        if (!over) return

        const activeId = active.id
        const overId = over.id

        if (activeId === overId) return

        const activeColumn = findColumnOfItem(activeId)

        // Find if overId is a column or an item in a column
        let overColumn = overId as ColumnsKey | null
        if (!['novos', 'qualificando', 'agendados', 'fechados'].includes(overColumn as string)) {
            overColumn = findColumnOfItem(overId)
        }

        if (!activeColumn || !overColumn || activeColumn === overColumn) {
            return
        }

        setColumns((prev) => {
            const sourceItems = [...prev[activeColumn as ColumnsKey]]
            const destItems = [...prev[overColumn as ColumnsKey]]

            const activeIndex = sourceItems.findIndex((item) => item.id === activeId)
            const overIndex = destItems.findIndex((item) => item.id === overId)

            const movingItem = sourceItems[activeIndex]

            // Optional: Update lead status text based on new column
            const updatedLead = { ...movingItem }
            if (overColumn === 'novo') updatedLead.stage = 'novo'
            if (overColumn === 'qualificando') updatedLead.stage = 'qualificando'
            if (overColumn === 'qualificado') updatedLead.stage = 'qualificado'
            if (overColumn === 'fechado') updatedLead.stage = 'fechado'

            sourceItems.splice(activeIndex, 1)

            // Insert into destination column
            if (overIndex >= 0) {
                destItems.splice(overIndex, 0, updatedLead)
            } else {
                destItems.push(updatedLead)
            }

            return {
                ...prev,
                [activeColumn as keyof typeof prev]: sourceItems,
                [overColumn as keyof typeof prev]: destItems,
            }
        })
    }

    // DND onDragEnd handler: reordering items within the same column
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (!over) return

        const activeId = active.id
        const overId = over.id

        if (activeId === overId) return

        const activeColumn = findColumnOfItem(activeId)
        const overColumn = findColumnOfItem(overId)

        if (activeColumn && overColumn && activeColumn === overColumn) {
            setColumns((prev) => {
                const columnItems = [...prev[activeColumn as ColumnsKey]]
                const activeIndex = columnItems.findIndex((item) => item.id === activeId)
                const overIndex = columnItems.findIndex((item) => item.id === overId)

                return {
                    ...prev,
                    [activeColumn]: arrayMove([...columnItems], activeIndex, overIndex)
                }
            })

            // Não precisamos mais sincronizar manualmente com CRM_MOCK_DATA pois o db agora é real
        }
    }

    return (
        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
            <div
                ref={boardRef}
                className={`flex gap-6 pb-4 h-full snap-x overflow-x-auto select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isDraggingBoard ? 'cursor-grabbing' : 'cursor-grab'}`}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                <KanbanColumn id="novo" title="Novos" items={columns.novo} onViewDetails={handleViewDetails} />
                <KanbanColumn id="qualificando" title="Qualificando (IA)" items={columns.qualificando} onViewDetails={handleViewDetails} />
                <KanbanColumn id="qualificado" title="Em Avaliação" items={columns.qualificado} onViewDetails={handleViewDetails} />
                <KanbanColumn id="fechado" title="Fechados" items={columns.fechado} onViewDetails={handleViewDetails} />
            </div>

            <PatientDetailsPanel
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                patient={selectedLead}
            />
        </DndContext>
    )
}
