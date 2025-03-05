import { createSupabaseServerComponentClient } from "@/lib/supabase/server-client";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

export default async function Navbar(){
    const supabase = await createSupabaseServerComponentClient()
    const {data: {session}} = await supabase.auth.getSession()
    const user = session?.user
    console.log(user)

    return(
        <div className="flex justify-center">
            {user? <LogoutButton  /> : <LoginButton />}
        </div>
    )

}