"use client";
import React from "react";
import { LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { routeLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Sidebar() {
    const pathname = usePathname();

    const { data: session } = useSession();
    const isLogout = session && session.user && session.user.email;

    return (
        <div className="sticky top-0 flex min-h-screen min-w-[220px] flex-col justify-between border-r p-4">
            <ul className="flex flex-col gap-2">
                <h3 className="mb-4 px-3 text-3xl font-bold">POS</h3>
                {routeLinks.map((link) => {
                    return (
                        <li key={link.label}>
                            <Link
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-2 rounded-md p-3 text-sm transition-all hover:bg-slate-200/60 focus:bg-slate-200/60 dark:hover:bg-slate-800/60 dark:focus:bg-slate-800/60",
                                    (pathname === link.href ||
                                        pathname.startsWith(`${link.href}/`)) &&
                                        "bg-slate-200/60 dark:bg-slate-800/60",
                                )}
                            >
                                {link.icon}
                                {link.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
            <div className="flex align-bottom">
                {isLogout && (
                    <Link href={"/auth/sign-out"} className="flex items-center gap-2 p-3">
                        <LogOut />
                        Logout
                    </Link>
                )}
            </div>
        </div>
    );
}
