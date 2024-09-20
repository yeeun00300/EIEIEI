import React from "react";
import styles from "./MyStockPage.module.scss";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import MedicalList from "../medicalList/MedicalList";
import StockCondition from "../medicalList/StockCondition";
import MedicalListSave from "../medicalList/MedicalListSave";

function MyStockPage(props) {
  return (
    <div className="page">
      <div className={styles.container}>
        <Tabs
          defaultActiveKey="profile"
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          <Tab eventKey="four" title="축사 정보">
            Tab content for Home
          </Tab>
          <Tab eventKey="five" title="축사 제어">
            Tab content for Home
          </Tab>
          <Tab eventKey="one" title="문진표 작성">
            <div className={styles.one}>
              <MedicalList />
            </div>
          </Tab>
          <Tab eventKey="two" title="문진표 내역">
            <MedicalListSave />
          </Tab>
          <Tab eventKey="six" title="질병 정보">
            Tab content for Home
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default MyStockPage;
