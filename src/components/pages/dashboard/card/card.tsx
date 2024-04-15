import React from "react";

interface CardProps {
    icon: any;
    title: string;
    amount: string;
}

export default function Card({ title, amount, icon }: CardProps) {
    return (
        <div className="flex items-center gap-3 p-2">
            <div className="rounded-md bg-foreground p-2 text-background">{icon}</div>
            <div className="space-y-1">
                <h3 className="text-[10px] uppercase text-gray-400">{title}</h3>
                <p className="text-2xl font-bold">{amount}</p>
            </div>
        </div>
    );
}
