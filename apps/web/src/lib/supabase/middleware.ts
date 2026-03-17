import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // getUser() é chamado para validar com segurança e atualizar o refresh_token se necessário
    const {
        data: { user },
    } = await supabase.auth.getUser()

    const publicRoutes = ['/login', '/cadastro', '/esqueci-senha']

    // Verifica se o pathname atual começa com uma das public paths
    const isPublicRoute = publicRoutes.some((route) => request.nextUrl.pathname.startsWith(route))

    // Regra 1: Sem usuário e em rota privada -> redireciona pro login
    if (!user && !isPublicRoute) {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    // Regra 2: Com usuário e tentando acessar rotas de autenticação/públicas -> redireciona pro dashboard
    if (user && isPublicRoute) {
        const url = request.nextUrl.clone()
        url.pathname = '/dashboard'
        return NextResponse.redirect(url)
    }

    // Retorna a resposta com os cookies ajustados (caso o token tenha sido renovado)
    return supabaseResponse
}
