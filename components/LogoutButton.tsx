"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return <div className="mt-4">
    <button 
  className="border border-gray-400 hover:cursor-pointer p-2 hover:text-lg bg-violet-900"
  onClick={handleLogout}>Logout</button>
  </div>
}
