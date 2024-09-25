import React, { useCallback, useEffect, useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

function Vaccine({ stock }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [data, setData] = useState([]);

  // stock 데이터가 변경될 때만 데이터 처리
  useEffect(() => {
    if (!stock || stock.length === 0) return; // 데이터가 없으면 처리하지 않음

    const vaccineType = stock.map((item) =>
      item.vaccine.map((i) => i.vaccineType)
    );

    // Step 1: 배열 평탄화
    const flattenedVaccineTypes = [];
    vaccineType.forEach((innerArray) => {
      innerArray.forEach((vaccine) => {
        flattenedVaccineTypes.push(vaccine);
      });
    });

    // Step 2: 백신 종류 개수 세기
    const countMap = flattenedVaccineTypes.reduce((acc, vaccine) => {
      acc[vaccine] = (acc[vaccine] || 0) + 1;
      return acc;
    }, {});

    // Step 3: 데이터 구성
    const chartData = Object.entries(countMap).map(([name, value]) => ({
      name,
      value,
    }));

    setData(chartData); // 데이터 상태 업데이트
  }, [stock]);

  const onPieEnter = useCallback(
    (_, index) => {
      if (index !== activeIndex) {
        setActiveIndex(index); // 인덱스가 다를 때만 업데이트
      }
    },
    [activeIndex]
  );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data} // 상태로부터 데이터 사용
          cx="50%"
          cy="50%"
          innerRadius={65}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter} // 호버 시 activeIndex 변경
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default Vaccine;
