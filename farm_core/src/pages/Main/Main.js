import React, { useState } from "react";
// import styles from "./Main.module.scss";

// react-grid-layout library 가져오기
import { Responsive, WidthProvider } from "react-grid-layout";
// responsive grid 생성
const ResponsiveGridLayout = WidthProvider(Responsive);

function Main() {
  const LAYOUTS = {
    lg: [
      { i: "a", x: 0, y: 0, w: 1, h: 1, minW: 1, maxW: 1, minH: 1, maxH: 2 },
      { i: "b", x: 1, y: 0, w: 1, h: 2, minW: 1, maxW: 1, minH: 1, maxH: 2 },
      { i: "c", x: 2, y: 0, w: 1, h: 1, minW: 1, maxW: 1, minH: 1, maxH: 2 },
    ],
    md: [
      { i: "a", x: 0, y: 0, w: 1, h: 1, minW: 1, maxW: 1, minH: 1, maxH: 2 },
      { i: "b", x: 1, y: 0, w: 1, h: 2, minW: 1, maxW: 1, minH: 1, maxH: 2 },
      { i: "c", x: 0, y: 1, w: 1, h: 1, minW: 1, maxW: 1, minH: 1, maxH: 2 },
    ],
  };
  return (
    <div className="page">
      <ResponsiveGridLayout
        className="layout"
        layouts={LAYOUTS}
        breakpoints={{ lg: 1000, md: 600 }}
        cols={{ lg: 3, md: 2 }}
      >
        {LAYOUTS.lg.map((el) => (
          <div key={el.i} {...el}>
            <h1>영화 🎬</h1>
            <p>세상에 이렇게 행복한 일이 있었나? 나는 잘 모르겠다.</p>
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
}

export default Main;
