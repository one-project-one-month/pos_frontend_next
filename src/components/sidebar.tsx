"use client";
import React from "react";
import { LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { routeLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
// import { DashboardIcon, PaddingIcon, ExitIcon } from "@radix-ui/react-icons";

export default function Sidebar() {
    const pathname = usePathname();
    return (
        <div className="sticky top-0 flex min-h-screen min-w-[200px] flex-col justify-between border-r p-4">
            <ul className="flex flex-col gap-2">
                <h3 className="mb-4 px-3 text-3xl font-bold">POS</h3>
                {routeLinks.map((link) => {
                    return (
                        <li key={link.label}>
                            <Link
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-2 rounded-md p-3 hover:bg-slate-200/60 focus:bg-slate-200/60",
                                    pathname === link.href && "bg-slate-200/60",
                                )}>
                                {link.icon}
                                {link.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
            <div className="flex align-bottom">
                <Link href={"/auth/sign-out"} className="flex items-center gap-2 p-3">
                    <LogOut />
                    Logout
                </Link>
            </div>
        </div>
    );
}
