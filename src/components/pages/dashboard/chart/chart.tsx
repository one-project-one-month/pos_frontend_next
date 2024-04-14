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
        pv: 2400,
        amt: 2400,
    },
    {
        name: "Feb",
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: "Mar",
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: "Apr",
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: "May",
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: "Jun",
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: "Jul",
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
    {
        name: "Aug",
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: "Sep",
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: "Oct",
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: "Nov",
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: "Dec",
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
];

export default class Chart extends PureComponent {
    static demoUrl = "https://codesandbox.io/s/bar-chart-has-no-padding-jphoc";

    render() {
        return (
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    barSize={25}
                >
                    <XAxis dataKey="name" scale="point" padding={{ left: 8, right: 8 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="pv" fill="#0802A3" background={{ fill: "#eee" }} />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}
