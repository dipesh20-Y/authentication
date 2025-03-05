"use client";

import { type User } from "@supabase/supabase-js";
import { useState } from "react";
import Link from "next/link";

export default function DetailButtonClient({ user }: { user: User | null }) {
  const [isHidden, setIsHidden] = useState<boolean>(true);

  return (
    <>
      {user ? (
        <div className="flex flex-col items-center mt-24">
          <button
          className=" w-40 border p-2 hover:cursor-pointer bg-purple-900"
          onClick={() => setIsHidden((prev) => !prev)}>
            {isHidden ? "Show Details" : "Hide Details"}
          </button>

          <br />

          {isHidden ? null : (
            <>
              <p>{`username: ${user?.user_metadata?.full_name}`}</p>
              <p>{`email: ${user?.user_metadata?.email}`}</p>

              <br />

              <Link href={"/account"}>
                <button 
                className="border bg-amber-900 p-2 hover:cursor-pointer "
                >View Account</button>
              </Link>
            </>
          )}
        </div>
      ) : (
        <p>User is not logged in </p>
      )}
    </>
  );
}
