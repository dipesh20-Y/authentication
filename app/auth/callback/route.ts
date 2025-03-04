import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { NextResponse } from "next/server";

export async function GET(request: Request){
    const {searchParams, origin} = new URL(request.url)

    const code = searchParams.get('code')

    //if there is next in the params, use it in the redirect
    const next = searchParams.get('next') 

    if(code){
        const supabase = await createSupabaseServerClient()

        const{error} = await supabase.auth.exchangeCodeForSession(code)

        if(!error){
            return NextResponse.redirect(`${origin}${next}`)
        }
    }

    return NextResponse.redirect(`${origin}/auth/auth-error`)
}