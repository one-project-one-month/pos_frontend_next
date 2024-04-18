import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
class PaymentPie extends React.Component {
    COLORS = ["#FFCD4B", "#5272F2"];
    pieData = [
        {
            name: "Cash",
            value: 64.85,
        },
        {
            name: "E Wallet",
            value: 47.91,
        },
    ];
    CustomTooltip = ({ active, payload }: any) => {
        if (active) {
            return (
                <div
                    className="custom-tooltip"
                    style={{
                        backgroundColor: "#ffff",
                        padding: "5px",
                        border: "1px solid #cccc",
                    }}
                >
                    <label> {`${payload[0].name} : ${payload[0].value}%`}</label>
                </div>
            );
        }
        return null;
    };
    render() {
        return (
            <PieChart width={300} height={125} className="text-xs">
                <Pie
                    data={this.pieData}
                    color="#000000"
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={50}
                    fill="#8884d8"
                >
                    {this.pieData.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={this.COLORS[index % this.COLORS.length]}
                        />
                    ))}
                </Pie>
                <Tooltip content={<this.CustomTooltip />} />
                <Legend />
            </PieChart>
        );
    }
}
export default PaymentPie;
