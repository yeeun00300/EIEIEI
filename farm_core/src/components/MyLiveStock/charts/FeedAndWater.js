import React, { useEffect, useState } from "react";
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

function FeedAndWater(props) {
  const [dates, setDates] = useState([]);

  function getLast7Days() {
    const today = new Date();
    const newDates = [];

    // 오늘 포함 7일치 날짜를 배열에 추가
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() - i);

      // 월과 일을 추출한 후 '/'로 구분
      const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
      const day = date.getDate();
      const formattedDate = `${month}/${day}`;

      newDates.push(formattedDate);
    }

    return newDates;
  }

  useEffect(() => {
    const last7Days = getLast7Days();
    setDates(last7Days); // 상태 업데이트
  }, []);

  const data = [
    {
      name: dates[6],
      물: 40,
      사료: 24,
    },
    {
      name: dates[5],
      물: 30,
      사료: 13,
    },
    {
      name: dates[4],
      물: 20,
      사료: 68,
    },
    {
      name: dates[3],
      물: 27,
      사료: 39,
    },
    {
      name: dates[2],
      물: 18,
      사료: 48,
    },
    {
      name: dates[1],
      물: 23,
      사료: 38,
    },
    {
      name: dates[0],
      물: 23,
      사료: 38,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 30,
          right: 30,
          left: -25,
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
