import React, { PureComponent } from "react";
import {
    BarChart,
    Bar,
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
        uv: 4000,
        sale: 2400,
        amt: 2400,
    },
    {
        name: "Feb",
        uv: 3000,
        sale: 1398,
        amt: 2210,
    },
    {
        name: "Mar",
        uv: 2000,
        sale: 9800,
        amt: 2290,
    },
    {
        name: "Apr",
        uv: 2780,
        sale: 3908,
        amt: 2000,
    },
    {
        name: "May",
        uv: 1890,
        sale: 4800,
        amt: 2181,
    },
    {
        name: "Jun",
        uv: 2390,
        sale: 3800,
        amt: 2500,
    },
    {
        name: "Jul",
        uv: 3490,
        sale: 4300,
        amt: 2100,
    },
    {
        name: "Aug",
        uv: 4000,
        sale: 2400,
        amt: 2400,
    },
    {
        name: "Sep",
        uv: 3000,
        sale: 1398,
        amt: 2210,
    },
    {
        name: "Oct",
        uv: 2000,
        sale: 9800,
        amt: 2290,
    },
    {
        name: "Nov",
        uv: 2780,
        sale: 3908,
        amt: 2000,
    },
    {
        name: "Dec",
        uv: 1890,
        sale: 4800,
        amt: 2181,
    },
];

export default class SaleChart extends PureComponent {
    static demoUrl = "https://codesandbox.io/s/bar-chart-has-no-padding-jphoc";

    render() {
        return (
            <ResponsiveContainer width="100%" height="100%" className="text-xs">
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 10,
                        bottom: 0,
                    }}
                    barSize={20}>
                    <XAxis dataKey="name" scale="point" padding={{ left: 8, right: 8 }} />
                    <YAxis />
                    <Tooltip labelClassName="text-black font-bold" />
                    {/* <Legend /> */}
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="sale" fill="#0802A3" background={{ fill: "#eee" }} />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}
