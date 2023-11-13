import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";

const data = [
  {
    name: "Q1",
    uv: 590,
    pv: 80000,
    amt: 1400,
  },
  {
    name: "Q2",
    uv: 868,
    pv: 96700,
    amt: 1506,
  },
  {
    name: "Q3",
    uv: 1397,
    pv: 109800,
    amt: 989,
  },
  {
    name: "Q4",
    uv: 1480,
    pv: 120000,
    amt: 1228,
  },
];

const BarChartComp = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        layout="vertical"
        width={500}
        height={400}
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" scale="band" />
        <Tooltip />
        {/* <Legend /> */}
        {/* <Area dataKey="amt" fill="#8884d8" stroke="#8884d8" /> */}
        <Bar dataKey="pv" barSize={20} fill="#413ea0" />
        {/* <Line dataKey="uv" stroke="#ff7300" /> */}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default BarChartComp;
