"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

const Logout = () => {
    const { data: session } = useSession();
    console.log(session);

    useEffect(() => {
        session && signOut({ callbackUrl: "/", redirect: true });
    }, []);

    return (
        <div>
            {!session && (
                <>
                    <span>You are logging out already </span>
                    <Link
                        href={"/"}
                        className="font-medium text-blue-600 underline dark:text-blue-500"
                    >
                        go your homepage
                    </Link>
                </>
            )}
        </div>
    );
};

export default Logout;
