import React from "react";
import { MagnifyingGlassIcon, MoonIcon, BellIcon } from "@radix-ui/react-icons";

export default function Navbar() {
    return (
        <div className="flex h-full items-center justify-between px-6">
            <div className="flex w-[400px] items-center gap-4 rounded-md border p-2">
                <MagnifyingGlassIcon className="h-4 w-4" />
                <input
                    type="text"
                    placeholder="Search all products here..."
                    className="border-none text-sm outline-none"
                />
            </div>
            <div className="flex items-center gap-3">
                <div className="border-0.5 grid h-8 w-8 place-items-center rounded-full border">
                    <MoonIcon />
                </div>
                <div className="border-0.5 grid h-8 w-8 place-items-center rounded-full border">
                    <BellIcon />
                </div>
                <div className="flex items-center gap-1">
                    <div className="h-10 w-10 rounded-full bg-red-800"></div>
                    <div>
                        <h3 className="text-sm font-bold">Jhon Doe</h3>
                        <p className="text-xs text-gray-400">admin</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
