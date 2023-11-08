import React from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "Carbon Credits", value: 20 },
  { name: "Fine Art", value: 12.5 },
  { name: "Gold", value: 10 },
  { name: "Mining", value: 5 },
  { name: "Real Estate", value: 52 },
];

const COLORS = ["#BDC6FF", "#FFB7C4", "#7CEDE6", "#FFD18C", "#CABDBA"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fontSize={12}
      fill="black"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieChartComp = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "100%",
      }}
    >
      {/* <ResponsiveContainer width="100%" height="100%"> */}
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          stroke=""
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          <Legend />
        </Pie>
      </PieChart>
      <div>
        {data.map((e, i) => (
          <div
            key={e.name}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <div
              style={{
                height: 10,
                width: 10,
                borderRadius: "50%",
                backgroundColor: COLORS[i],
              }}
            ></div>
            <small>&nbsp;{e.name}</small>
          </div>
        ))}
      </div>
      {/* </ResponsiveContainer> */}
    </div>
  );
};

export default PieChartComp;
