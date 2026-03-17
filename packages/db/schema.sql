-- 1. Tipos Customizados (ENUMs)
CREATE TYPE public.lead_stage AS ENUM ('novo', 'qualificando', 'qualificado', 'fechado');

-- 2. Tabela de Clínicas (Sem JSONB, configurações explícitas)
CREATE TABLE public.clinics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    agent_enabled BOOLEAN DEFAULT false NOT NULL, -- Botão de ligar/desligar o agente
    system_prompt TEXT, -- Instruções específicas da clínica para a IA
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3. Tabela de Usuários (Membros da Clínica)
-- Relacionada com a auth.users do Supabase para o login
CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    clinic_id UUID NOT NULL REFERENCES public.clinics(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    role TEXT DEFAULT 'member' NOT NULL, -- ex: 'owner', 'member'
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 4. Tabela de Procedimentos (Catálogo da Clínica)
CREATE TABLE public.procedures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinic_id UUID NOT NULL REFERENCES public.clinics(id) ON DELETE CASCADE,
    name TEXT NOT NULL, -- Ex: 'Manutenção de Aparelho'
    price DECIMAL(10,2) NOT NULL, -- Ex: 150.00
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 5. Tabela de Leads (Agora usando o ENUM)
CREATE TABLE public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinic_id UUID NOT NULL REFERENCES public.clinics(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    stage public.lead_stage DEFAULT 'novo' NOT NULL,
    agent_active BOOLEAN DEFAULT true NOT NULL, -- Se a IA está falando com esse lead específico
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 6. Tabela de Mensagens
CREATE TABLE public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinic_id UUID NOT NULL REFERENCES public.clinics(id) ON DELETE CASCADE,
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'agent', 'system')),
    content TEXT NOT NULL,
    sent_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 7. Habilitar RLS em todas as tabelas
ALTER TABLE public.clinics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.procedures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- 8. Políticas de Segurança (Multi-tenant via JWT)
-- Clínicas
CREATE POLICY "Acesso a propria clinica" ON public.clinics FOR ALL USING (id = (auth.jwt()->>'clinic_id')::uuid);

-- Usuários
CREATE POLICY "Acesso aos usuarios da clinica" ON public.users FOR ALL USING (clinic_id = (auth.jwt()->>'clinic_id')::uuid);

-- Procedimentos
CREATE POLICY "Acesso aos procedimentos da clinica" ON public.procedures FOR ALL USING (clinic_id = (auth.jwt()->>'clinic_id')::uuid);

-- Leads
CREATE POLICY "Acesso aos leads da clinica" ON public.leads FOR ALL USING (clinic_id = (auth.jwt()->>'clinic_id')::uuid);

-- Mensagens
CREATE POLICY "Acesso as mensagens da clinica" ON public.messages FOR ALL USING (clinic_id = (auth.jwt()->>'clinic_id')::uuid);