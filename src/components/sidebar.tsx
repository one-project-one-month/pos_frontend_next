import React from "react";
import Link from "next/link";
import { DashboardIcon, PaddingIcon, ExitIcon } from "@radix-ui/react-icons";

export default function Sidebar() {
    return (
        <div className="flex h-full flex-col justify-between border-r-2 p-4">
            <ul>
                <h3 className="mb-6 px-3 text-3xl font-bold">POS</h3>
                <li>
                    <Link
                        href={"/dashboard"}
                        className="flex items-center gap-2 rounded-md p-3 hover:bg-blue-100 focus:bg-blue-100"
                    >
                        <DashboardIcon /> Dashboard
                    </Link>
                </li>
                <li>
                    <Link
                        href={"/order-line"}
                        className="flex items-center gap-2 rounded-md p-3 hover:bg-blue-100 focus:bg-blue-100"
                    >
                        <PaddingIcon />
                        Order Line
                    </Link>
                </li>
            </ul>
            <div className="flex align-bottom">
                <Link href={"/"} className="flex items-center gap-2">
                    <ExitIcon />
                    Logout
                </Link>
            </div>
        </div>
    );
}
