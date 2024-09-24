import React from "react";

import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const COLORS = ["#00C49F", "#FF8042"];

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
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
function HealthCondition({ stock }) {
  const active = [];
  const noActive = [];
  stock.filter((item) => {
    if (item.activity == "많음") {
      active.push(item);
    } else if (item.activity == "적음") {
      noActive.push(item);
    }
  });
  const data = [
    { name: "활동적", value: active.length },
    { name: "비활동적", value: noActive.length },
  ];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width="100%" height="100%">
        <Legend layout="vertical" verticalAlign="top" align="top" />
        <Tooltip />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
          style={{ outline: "none" }}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              style={{ outline: "none" }}
            />
          ))}
        </Pie>
      </PieChart>
      <div>총 개체수: {stock.length}</div>
    </ResponsiveContainer>
  );
}

export default HealthCondition;
