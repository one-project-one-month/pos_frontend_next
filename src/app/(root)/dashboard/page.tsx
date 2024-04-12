"use client";
import Card from "@/components/pages/dashboard/card/card";
import { TrendingUp, LineChart, UsersRound, Boxes } from "lucide-react";
const cardData = [
    {
        icon: <TrendingUp />,
        title: "today sales",
        amount: "4,955",
    },
    {
        icon: <LineChart />,
        title: "total sales",
        amount: "896,500",
    },
    {
        icon: <Boxes />,
        title: "products",
        amount: "6,225",
    },
    {
        icon: <UsersRound />,
        title: "total customers",
        amount: "1,225",
    },
];

export default function Dashboard() {
    return (
        <div className="w-full">
            <div className="grid grid-cols-5 gap-4">
                {cardData.map((data, index) => (
                    <Card key={index} icon={data.icon} title={data.title} amount={data.amount} />
                ))}
            </div>
        </div>
    );
}
