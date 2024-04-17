"use client";
import React, { PureComponent } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const data = [
    {
        name: "Sun",
        customer: 4000,
        sale: 2400,
        amt: 2400,
    },
    {
        name: "Mon",
        customer: 3000,
        sale: 1398,
        amt: 2210,
    },
    {
        name: "Tue",
        customer: 2000,
        sale: 9800,
        amt: 2290,
    },
    {
        name: "Wed",
        customer: 2780,
        sale: 3908,
        amt: 2000,
    },
    {
        name: "Thu",
        customer: 1890,
        sale: 4800,
        amt: 2181,
    },
    {
        name: "Fri",
        customer: 2390,
        sale: 3800,
        amt: 2500,
    },
    {
        name: "Sat",
        customer: 3490,
        sale: 4300,
        amt: 2100,
    },
];

export default class SaleGraph extends PureComponent {
    static demoUrl = "https://codesandbox.io/s/simple-line-chart-kec3v";

    render() {
        return (
            <ResponsiveContainer width="100%" height="100%" className="text-xs">
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 20,
                        left: 0,
                        bottom: 0,
                    }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip labelClassName="text-black font-bold" />
                    {/* <Legend /> */}
                    <Line type="monotone" dataKey="sale" stroke="#5272F2" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="customer" stroke="#FFCD4B" />
                </LineChart>
            </ResponsiveContainer>
        );
    }
}
