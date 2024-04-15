"use client";
import Card from "@/components/pages/dashboard/card/card";
import SaleChart from "@/components/pages/dashboard/chart/salechart";
import RevenueGraph from "@/components/pages/dashboard/graph/revenue";
import SaleGraph from "@/components/pages/dashboard/graph/salegraph";
import PaymentPie from "@/components/pages/dashboard/pie/paymentpie";
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
        <div className="space-y-2">
            <div className="flex gap-2">
                <div className="w-9/12 space-y-6 rounded-xl border border-foreground/10 p-4 shadow-md">
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold">Transactions</h3>
                        <p>Total 48.5% growth 😎 this month</p>
                    </div>
                    <div className="flex items-center justify-between ">
                        {cardData.map((data, index) => (
                            <Card
                                key={index}
                                icon={data.icon}
                                title={data.title}
                                amount={data.amount}
                            />
                        ))}
                    </div>
                </div>
                <div className="w-3/12 rounded-xl border border-foreground/10 p-4 shadow-md">
                    <h3 className="text-center text-xl font-bold">Payment Method</h3>
                    <PaymentPie />
                </div>
            </div>

            {/* ======================== Charts ================== */}
            <div className="grid grid-cols-12 gap-2 ">
                <div className="col-span-4 space-y-4 rounded-xl border border-foreground/10 p-4 shadow-md">
                    <h3 className="text-xl font-bold">Daily Sale Report</h3>
                    <div className="h-[180px] w-full">
                        <SaleGraph />
                    </div>
                </div>
                <div className="col-span-4 space-y-4 rounded-xl border border-foreground/10 p-4 shadow-md">
                    <h3 className="text-xl font-bold">Monthly Overview</h3>
                    <div className="h-[180px] w-full">
                        <SaleChart />
                    </div>
                </div>
                <div className="col-span-4 space-y-4 rounded-xl border border-foreground/10 p-4 shadow-md">
                    <h3 className="text-xl font-bold">Total Revenue</h3>
                    <div className="h-[180px] w-full">
                        <RevenueGraph />
                    </div>
                </div>
            </div>
        </div>
    );
}
