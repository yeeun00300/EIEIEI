import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    물: 4000,
    사료: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    물: 3000,
    사료: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    물: 2000,
    사료: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    물: 2780,
    사료: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    물: 1890,
    사료: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    물: 2390,
    사료: 3800,
    amt: 2500,
  },
];

function FeedAndWater(props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        // width={400}
        // height={300}
        data={data}
        margin={{
          top: 30,
          right: 30,
          left: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="사료"
          fill="#8884d8"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
        <Bar
          dataKey="물"
          fill="#82ca9d"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default FeedAndWater;
