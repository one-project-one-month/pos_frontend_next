"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
    const { data: session } = useSession();

    console.log("email :", session?.user?.email);

    if (session) {
        return (
            <>
                {session?.user?.name} <br />
                <button
                    className="rounde bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                    onClick={() => signOut()}
                >
                    Sign out bt
                </button>
            </>
        );
    }
    return (
        <>
            Not signed in <br />
            <button
                className="rounde bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                onClick={() => signIn("google", { redirect: true, callbackUrl: "/dashboard" })}
            >
                Sign in bt
            </button>
        </>
    );
}
