import React, { PureComponent } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const data = [
    {
        name: "Jan",
        online: 4000,
        offline: 2400,
        amt: 2400,
    },
    {
        name: "Feb",
        online: 3000,
        offline: 1398,
        amt: 2210,
    },
    {
        name: "Mar",
        online: 2000,
        offline: 9800,
        amt: 2290,
    },
    {
        name: "Apr",
        online: 2780,
        offline: 3908,
        amt: 2000,
    },
    {
        name: "May",
        online: 1890,
        offline: 4800,
        amt: 2181,
    },
    {
        name: "Jun",
        online: 2390,
        offline: 3800,
        amt: 2500,
    },
    {
        name: "Jul",
        online: 3490,
        offline: 4300,
        amt: 2100,
    },
    {
        name: "Aug",
        online: 4000,
        offline: 2400,
        amt: 2400,
    },
    {
        name: "Sep",
        online: 3000,
        offline: 1398,
        amt: 2210,
    },
    {
        name: "Oct",
        online: 2000,
        offline: 9800,
        amt: 2290,
    },
    {
        name: "Nov",
        online: 2780,
        offline: 3908,
        amt: 2000,
    },
    {
        name: "Dec",
        online: 1890,
        offline: 4800,
        amt: 2181,
    },
];

export default class RevenueGraph extends PureComponent {
    static demoUrl = "https://codesandbox.io/s/stacked-area-chart-ix341";

    render() {
        return (
            <ResponsiveContainer width="100%" height="100%" className="text-sm">
                <AreaChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip labelClassName="text-black font-bold" />
                    <Area
                        type="monotone"
                        dataKey="online"
                        stackId="1"
                        stroke="#8884d8"
                        fill="#8884d8"
                    />
                    <Area
                        type="monotone"
                        dataKey="offline"
                        stackId="1"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                    />
                    <Legend />
                </AreaChart>
            </ResponsiveContainer>
        );
    }
}
