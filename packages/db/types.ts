export type LeadStage = 'novo' | 'qualificando' | 'qualificado' | 'fechado'

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      clinics: {
        Row: {
          id: string
          name: string
          agent_enabled: boolean
          system_prompt: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          agent_enabled?: boolean
          system_prompt?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          agent_enabled?: boolean
          system_prompt?: string | null
          created_at?: string
        }
      }
      users: {
        Row: {
          id: string
          clinic_id: string
          full_name: string
          role: string
          created_at: string
        }
        Insert: {
          id: string
          clinic_id: string
          full_name: string
          role?: string
          created_at?: string
        }
        Update: {
          id?: string
          clinic_id?: string
          full_name?: string
          role?: string
          created_at?: string
        }
      }
      procedures: {
        Row: {
          id: string
          clinic_id: string
          name: string
          price: number
          created_at: string
        }
        Insert: {
          id?: string
          clinic_id: string
          name: string
          price: number
          created_at?: string
        }
        Update: {
          id?: string
          clinic_id?: string
          name?: string
          price?: number
          created_at?: string
        }
      }
      leads: {
        Row: {
          id: string
          clinic_id: string
          name: string
          phone: string
          stage: LeadStage
          agent_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          clinic_id: string
          name: string
          phone: string
          stage?: LeadStage
          agent_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          clinic_id?: string
          name?: string
          phone?: string
          stage?: LeadStage
          agent_active?: boolean
          created_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          clinic_id: string
          lead_id: string
          role: 'user' | 'agent' | 'system'
          content: string
          sent_at: string
        }
        Insert: {
          id?: string
          clinic_id: string
          lead_id: string
          role: 'user' | 'agent' | 'system'
          content: string
          sent_at?: string
        }
        Update: {
          id?: string
          clinic_id?: string
          lead_id?: string
          role?: 'user' | 'agent' | 'system'
          content?: string
          sent_at?: string
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {
      lead_stage: LeadStage
    }
    CompositeTypes: {}
  }
}

