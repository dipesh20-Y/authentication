import { createSupabaseServerComponentClient } from "@/lib/supabase/server-client";
import DetailButtonClient from "./DetailButtonClient";

export default async function DetailButtonServer() {
  const supabase = await createSupabaseServerComponentClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.log("Error fetching user: ", error)
  }

  return <DetailButtonClient user={user} />;
}
