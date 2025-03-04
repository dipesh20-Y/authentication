import { createSupabaseServerComponentClient } from "@/lib/supabase/server-client";
import Image from "next/image";

export default async function Avatar() {
  const supabase = await createSupabaseServerComponentClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.log("Error: ", error);
  }

  return (
    <Image
      src={user?.user_metadata.avatar_url}
      alt="Avatar"
      height={96}
      width={96}
    />
  );
}
