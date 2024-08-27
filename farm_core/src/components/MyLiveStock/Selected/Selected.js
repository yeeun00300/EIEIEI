import React, { useState } from "react";
import styles from "./Selected.module.scss";

function Selected(props) {
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedFarm, setSelectedFarm] = useState();

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedFarm("");
  };

  const handleFarmChange = (e) => {
    setSelectedFarm(e.target.value);
  };
  return (
    <div>
      <div className={styles.box}>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value={""}>축종을 선택하세요</option>
          <option value="poultry">양계</option>
          <option value="koreanBeef">한우</option>
          <option value="dairy">낙농</option>
          <option value="swine">양돈</option>
        </select>
        {selectedCategory === "poultry" && (
          <select value={selectedFarm} onChange={handleFarmChange}>
            <option value="">농장을 선택하세요</option>
            <option value="farm1">농장1</option>
            <option value="farm2">농장2</option>
          </select>
        )}
        {selectedCategory === "koreanBeef" && (
          <select value={selectedFarm} onChange={handleFarmChange}>
            <option value="">농장을 선택하세요</option>
            <option value="farm1">농장1</option>
            <option value="farm2">농장2</option>
          </select>
        )}
        {selectedCategory === "dairy" && (
          <select value={selectedFarm} onChange={handleFarmChange}>
            <option value="">농장을 선택하세요</option>
            <option value="farm1">농장1</option>
            <option value="farm2">농장2</option>
          </select>
        )}
        {selectedCategory === "swine" && (
          <select value={selectedFarm} onChange={handleFarmChange}>
            <option value="">농장을 선택하세요</option>
            <option value="farm1">농장1</option>
            <option value="farm2">농장2</option>
          </select>
        )}
      </div>
    </div>
  );
}

export default Selected;
