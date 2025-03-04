import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseReqResClient } from "@/lib/supabase/server-client";

export default async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase =  createSupabaseReqResClient(request, response);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;

  if (!user && request.nextUrl.pathname.startsWith("/account")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return response;
}

export const config = {
  matcher: ["/"],
};
