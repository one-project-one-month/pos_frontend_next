"use client";

import Link from "next/link";

const Logout = () => {
    return (
        <div>
            <>
                <span>You are logging out already </span>
                <Link href={"/"} className="font-medium text-blue-600 underline dark:text-blue-500">
                    go your homepage
                </Link>
            </>
        </div>
    );
};

export default Logout;
