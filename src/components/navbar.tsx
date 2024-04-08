import React from "react";
import { MagnifyingGlassIcon, MoonIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import SaleCart from "./sale-cart";

export default function Navbar() {
    return (
        <div className="flex h-full items-center justify-between px-6 py-4">
            <div className="flex w-[400px] items-center gap-4 rounded-md border p-2">
                <MagnifyingGlassIcon className="h-4 w-4" />
                <input
                    type="text"
                    placeholder="Search all products here..."
                    className="border-none text-sm outline-none"
                />
            </div>
            <div className="ml-auto flex items-center gap-3">
                <Button variant="outline" size="icon" className="place-items-center rounded-full">
                    <MoonIcon />
                </Button>
                <div className="flex items-center gap-1">
                    <div className="h-10 w-10 rounded-full bg-red-400"></div>
                    <div>
                        <h3 className="text-sm font-bold">Jhon Doe</h3>
                        <p className="text-xs text-gray-400">admin</p>
                    </div>
                </div>
                <SaleCart />
            </div>
        </div>
    );
}
