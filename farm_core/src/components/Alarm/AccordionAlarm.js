import React from "react";
import Accordion from "react-bootstrap/Accordion";
import AccordionItem from "react-bootstrap/AccordionItem";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionBody from "react-bootstrap/AccordionBody";
import styles from "./AccordionAlarm.module.scss";

function AccordionAlarm({ weatherIssueAlarm, diseaseAlarm }) {
  return (
    <div className={styles.AccordionAlarm}>
      <Accordion defaultActiveKey="0" alwaysOpen>
        <AccordionItem eventKey="0">
          <AccordionHeader>
            날씨 알림
            <span className={styles.AlarmCount}>
              {weatherIssueAlarm?.length}
            </span>
          </AccordionHeader>
          <AccordionBody>
            {weatherIssueAlarm?.map((weatherItem, idx) => {
              const {
                weatherIssue,
                weatherDescription,
                weatherDate,
                createdAt,
              } = weatherItem;
              const newDate =
                weatherDate.split("-")[1] + "-" + weatherDate.split("-")[2];
              return (
                <AccordionItem eventKey={idx + 1} key={createdAt}>
                  <AccordionHeader>
                    {weatherIssue}{" "}
                    <span className={styles.weatherAlarmDate}>{newDate}</span>
                  </AccordionHeader>
                  <AccordionBody>{weatherDescription}</AccordionBody>
                </AccordionItem>
              );
            })}
          </AccordionBody>
        </AccordionItem>
        <AccordionItem eventKey="1">
          <AccordionHeader>
            질병 알람
            <span className={styles.AlarmCount}>{diseaseAlarm?.length}</span>
          </AccordionHeader>
          <AccordionBody>
            {diseaseAlarm?.map((diseaseItem, idx) => {
              const { createdAt, diseaseTypes, diseases, locale } = diseaseItem;
              return (
                <AccordionItem eventKey={idx + 100} key={createdAt}>
                  <AccordionHeader>{`${locale}의 질병 소식`}</AccordionHeader>
                  <AccordionBody>
                    {
                      <div className={styles.diseaseContents}>
                        <p>
                          가축 종류 :
                          {diseaseTypes.map((type) => (
                            <span>{`${type}`}</span>
                          ))}
                        </p>
                        <p>
                          질병 :
                          {diseases.map((type) => (
                            <span>{`${type}`}</span>
                          ))}
                        </p>
                      </div>
                    }
                  </AccordionBody>
                </AccordionItem>
              );
            })}
          </AccordionBody>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default AccordionAlarm;
