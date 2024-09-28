import React from "react";
import styles from "./MyStockPage.module.scss";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import MedicalList from "../medicalList/MedicalList";
import StockCondition from "../medicalList/StockCondition";
import MedicalListSave from "../medicalList/MedicalListSave";
import DiseaseInfo from "../diseaseInfo/DiseaseInfo";
import MedicalListCheck from "../medicalList/MedicalListCheck";
import MyLiveStockList from "../../pages/MyLiveStockInfo/MyLiveStockList";
import DiseaseSelect from "../diseaseInfo/DiseaseSelect";
import SubMain from "../../pages/Main/subMain/SubMain";
import DeleteAccount from "../DeleteAccount/DeleteAccount";
import CCTVAnimal from "../CCTVandAnimalInfo/CCTVAnimal/CCTVAnimal";

function MyStockPage(props) {
  return (
    <div className="page">
      <div className={styles.container}>
        <Tabs
          defaultActiveKey="profile"
          id="justify-tab-example"
          className={`mb-3 ${styles.customTabs}`}
          justify
        >
          <Tab eventKey="one" title="축사 정보">
            <MedicalListCheck />
          </Tab>
          <Tab eventKey="two" title="축사 제어">
            Tab content for Home
          </Tab>
          <Tab eventKey="three" title="문진표 작성">
            <div className={styles.one}>
              <MedicalList />
            </div>
          </Tab>
          <Tab eventKey="four" title="문진표 내역">
            <div className={styles.four}>
              <MedicalListSave />
            </div>
          </Tab>
          <Tab eventKey="five" title="질병 정보">
            <DiseaseSelect />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default MyStockPage;
