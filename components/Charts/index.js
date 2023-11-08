import React from "react";
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
    name: "Jan",
    pv: 2400,
    SGD: 2400,
  },
  {
    name: "Feb",
    pv: 1398,
    SGD: 2210,
  },
  {
    name: "March",
    pv: 9800,
    SGD: 2290,
  },
  {
    name: "April",
    pv: 3908,
    SGD: 2000,
  },
  {
    name: "May",
    pv: 4800,
    SGD: 2181,
  },
  {
    name: "June",
    pv: 3800,
    SGD: 2500,
  },
  {
    name: "July",
    pv: 4300,
    SGD: 2100,
  },
  {
    name: "Aug",
    pv: 4300,
    SGD: 1800,
  },
  {
    name: "Sept",
    pv: 4300,
    SGD: 2000,
  },
  {
    name: "Oct",
    pv: 4300,
    SGD: 1900,
  },
  {
    name: "Nov",
    pv: 4300,
    SGD: 2700,
  },
  {
    name: "Dec",
    pv: 4300,
    SGD: 2100,
  },
];

const ArkCharts = () => {
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            // type="monotone"
            dataKey="SGD"
            strokeWidth={"2px"}
            stroke="#1027B8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default ArkCharts;
