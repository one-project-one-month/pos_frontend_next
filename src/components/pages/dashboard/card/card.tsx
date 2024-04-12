import React from "react";

interface CardProps {
    icon: any;
    title: string;
    amount: string;
}

export default function Card({ title, amount, icon }: CardProps) {
    return (
        <div className="flex items-center gap-6 rounded-xl border-[0.5px] border-foreground/20 p-3 shadow-md">
            <div className="rounded-md bg-foreground p-2 text-background">{icon}</div>
            <div className="space-y-2">
                <h3 className="text-xs uppercase text-gray-400">{title}</h3>
                <p className="text-3xl font-bold">{amount}</p>
            </div>
        </div>
    );
}
