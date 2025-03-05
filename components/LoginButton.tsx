"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser-client";

export default function LoginButton(props: { nextUrl?: string }) {
  const supabase = createSupabaseBrowserClient();

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback?next=${
          props.nextUrl || ""
        }`,
      },
    });
  };

  return <div className="mt-4">
     <button
  className="border border-gray-400 hover:cursor-pointer p-2 hover:text-lg bg-violet-900"
   onClick={handleLogin}>Login with github</button>
  </div>
}
