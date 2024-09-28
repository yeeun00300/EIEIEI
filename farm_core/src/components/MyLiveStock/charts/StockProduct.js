import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import styles from "./StockProduct.module.scss";

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

function StockProduct({ stock, farmData }) {
  const { farm_stockType } = farmData;
  const male = [];
  const female = [];
  stock.filter((item) => {
    if (item.mating === "Y" && item.sex === "M") {
      male.push(item);
    } else if (item.mating === "Y" && item.sex === "F") {
      female.push(item);
    }
  });

  const data = [
    { name: "수컷", value: male.length },
    { name: "암컷", value: female.length },
  ];

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

  const productData = [
    {
      name: dates[6],
      생산량: 20,
    },
    {
      name: dates[5],
      생산량: 30,
    },
    {
      name: dates[4],
      생산량: 20,
    },
    {
      name: dates[3],
      생산량: 27,
    },
    {
      name: dates[2],
      생산량: 18,
    },
    {
      name: dates[1],
      생산량: 23,
    },
    {
      name: dates[0],
      생산량: 34,
    },
  ];

  const chickData = [
    {
      name: dates[6],
      평균무게: 0.7,
    },
    {
      name: dates[5],
      평균무게: 0.7,
    },
    {
      name: dates[4],
      평균무게: 0.8,
    },
    {
      name: dates[3],
      평균무게: 0.9,
    },
    {
      name: dates[2],
      평균무게: 1.0,
    },
    {
      name: dates[1],
      평균무게: 1.3,
    },
    {
      name: dates[0],
      평균무게: 1.5,
    },
  ];

  const stockTypeProduct = () => {
    switch (farm_stockType) {
      case "한우":
        return (
          <div className={styles.chartBox}>
            <h5>발정 개체수: {male.length + female.length}</h5>
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
            </ResponsiveContainer>
          </div>
        );
      case "낙농":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width="100%"
              height={300}
              data={productData}
              margin={{
                top: 5,
                right: 30,
                left: -25,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tickLine={false} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="생산량" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        );
      case "산란계":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width="100%"
              height={300}
              data={productData}
              margin={{
                top: 5,
                right: 30,
                left: -25,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tickLine={false} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="생산량" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        );
      case "양돈":
        return (
          <div className={styles.chartBox}>
            <h5>발정 개체수: {male.length + female.length}</h5>
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
            </ResponsiveContainer>
          </div>
        );
      case "육계":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width="100%"
              height={300}
              data={chickData}
              margin={{
                top: 5,
                right: 30,
                left: -25,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tickLine={false} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="평균무게" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        );
      default:
        return <div>가축 정보가 없습니다.</div>; // 기본
    }
  };
  return stockTypeProduct();
}

export default StockProduct;
