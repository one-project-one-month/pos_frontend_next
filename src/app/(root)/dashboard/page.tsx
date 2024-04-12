"use client";
import Card from "@/components/pages/dashboard/card/card";
import Chart from "@/components/pages/dashboard/chart/chart";
import Graph from "@/components/pages/dashboard/graph/graph";
import { TrendingUp, LineChart, UsersRound, Boxes, UserRound } from "lucide-react";
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
        icon: <UserRound />,
        title: "new customers",
        amount: "225",
    },
    {
        icon: <UsersRound />,
        title: "total customers",
        amount: "1,225",
    },
];

export default function Dashboard() {
    return (
        <div className="grid w-full grid-cols-2 gap-8">
            <div className="col-span-2 grid grid-cols-5 gap-4">
                {cardData.map((data, index) => (
                    <Card key={index} icon={data.icon} title={data.title} amount={data.amount} />
                ))}
            </div>
            <div className="h-[300px] w-full space-y-4">
                <h3 className="text-2xl font-bold">Daily Sale Report</h3>
                <Graph />
            </div>
            <div className="h-[300px] w-full space-y-4">
                <h3 className="text-2xl font-bold">Monthly Overview</h3>
                <Chart />
            </div>
        </div>
    );
}
