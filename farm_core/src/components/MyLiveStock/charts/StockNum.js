import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import styles from "./StockNum.module.scss";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

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
function StockNum({ stock }) {
  const male = [];
  const female = [];
  stock.filter((item) => {
    if (item.sex == "M") {
      male.push(item);
    } else {
      female.push(item);
    }
  });
  const data = [
    { name: "수컷", value: male.length },
    { name: "암컷", value: female.length },
  ];

  return (
    <div className={styles.chartBox}>
      <h5>총 개체수: {stock.length}</h5>
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
            outerRadius="100%"
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
        {/* <div>총 개체수: {stock.length}</div> */}
      </ResponsiveContainer>
    </div>
  );
}

export default StockNum;
