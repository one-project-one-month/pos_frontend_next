"use client";
import ThemeToggle from "./theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Navbar() {
    return (
        <div className="sticky top-0 flex h-full items-center justify-between bg-white px-6 py-4 dark:bg-slate-950">
            <div className="ml-auto flex items-center gap-3">
                <ThemeToggle buttonProps={{ className: "rounded-full" }} />
                <div className="flex items-center gap-1">
                    <Avatar className={""}>
                        <AvatarImage src={`https://github.com/shadcn.png`} alt={`profile`} />
                        <AvatarFallback>{"profile"}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="text-sm font-bold">Someone</h3>
                        <p className="text-xs text-gray-400">admin</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
