import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import AccordionItem from "react-bootstrap/AccordionItem";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionBody from "react-bootstrap/AccordionBody";
import { getDatas } from "../../firebase";
import styles from "./AccordionAlarm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherData } from "../../store/weatherSlice/weatherSlice";

function AccordionAlarm({ weatherIssueAlarm }) {
  return (
    <div className={styles.AccordionAlarm}>
      <Accordion defaultActiveKey="0" alwaysOpen>
        <AccordionHeader>
          날씨 알림
          <span className={styles.AlarmCount}>{weatherIssueAlarm?.length}</span>
        </AccordionHeader>
        <AccordionBody>
          {weatherIssueAlarm?.map((weatherItem, idx) => {
            const { weatherIssue, weatherDescription, weatherDate, createdAt } =
              weatherItem;
            const newDate =
              weatherDate.split("-")[1] + "-" + weatherDate.split("-")[2];
            return (
              <>
                <AccordionItem eventKey={idx + 1} key={createdAt}>
                  <AccordionHeader>
                    {weatherIssue}{" "}
                    <span className={styles.weatherAlarmDate}>{newDate}</span>
                  </AccordionHeader>
                  <AccordionBody>{weatherDescription}</AccordionBody>
                </AccordionItem>
              </>
            );
          })}
        </AccordionBody>
        <AccordionItem eventKey="1">
          <AccordionHeader>
            질병 알람
            <span className={styles.AlarmCount}>1</span>
          </AccordionHeader>
          <AccordionBody>
            <AccordionItem eventKey="2">
              <AccordionHeader>
                질병 알람
                <span className={styles.weatherAlarmDate}>09-09 12:04</span>
              </AccordionHeader>
              <AccordionBody>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </AccordionBody>
            </AccordionItem>
          </AccordionBody>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default AccordionAlarm;
