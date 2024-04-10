"use client";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import ThemeToggle from "./theme-toggle";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Navbar() {
    const { data: session } = useSession();
    return (
        <div className="flex h-full items-center justify-between px-6 py-4">
            <div className="flex w-[400px] items-center gap-2 rounded-md border p-2">
                <MagnifyingGlassIcon className="h-4 w-4" />
                <input
                    type="text"
                    placeholder="Search all products here..."
                    className="border-none bg-transparent text-sm outline-none"
                />
            </div>
            <div className="ml-auto flex items-center gap-3">
                <ThemeToggle buttonProps={{ className: "rounded-full" }} />
                <div className="flex items-center gap-1">
                    <Avatar className={""}>
                        <AvatarImage
                            src={session?.user?.image || `https://github.com/shadcn.png`}
                            alt={session?.user?.name || `profile`}
                        />
                        <AvatarFallback>{session?.user?.name || "profile"}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="text-sm font-bold">{session?.user?.name}</h3>
                        <p className="text-xs text-gray-400">admin</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
