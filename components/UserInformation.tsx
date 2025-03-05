'use client'
import useSession from "@/lib/supabase/use-session";
import { useRouter } from "next/navigation";

export default function UserInformation() {
  const user = useSession()?.user;
  const router = useRouter();

  return (
    <div className="flex flex-col items-center">
      {user ? (
        <>
          <p>{`username: ${user?.user_metadata?.full_name}`}</p>
          <p>{`email: ${user?.user_metadata?.email}`}</p>
        </>
      ) : (
        <p>Loading....</p>
      )}
      <br />
      <button
      className="border hover:cursor-pointer p-2 bg-teal-700"
      onClick={() => router.back()}>Back</button>
    </div>
  );
}
