import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { type NextRequest, type NextResponse } from "next/server";

//server component can only get cookies,  not set them. hence the 'component' check
export async function createSupabaseServerClient(component: boolean = false) {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          if (component) return;

          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );
}

export async function createSupabaseServerComponentClient() {
  (await cookies()).getAll();
  return createSupabaseServerClient(true);
}

//creates a client for use in API routes or middleware where you have to access both request and response
export function createSupabaseReqResClient(
  req: NextRequest,
  res: NextResponse
) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );
}
