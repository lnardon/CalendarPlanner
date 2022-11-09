import React, { useState, useEffect } from "react";

import styles from "./styles.module.css";

function Calendar({ getData }: { getData: (data: any) => void }) {
  const [months, setMonths] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);
  const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState(months[date.getMonth()]);
  const [previousDays, setPreviousDays] = useState<any>();
  const [nextDays, setNextDays] = useState<any>();
  const [currentDays, setCurrentDays] = useState<any>();
  const [rerender, setRerender] = useState<any>();

  function nextMonth() {
    date.setMonth(date.getMonth() + 1);
    setMonth(months[date.getMonth()]);
    setRerender(new Date());
  }

  function previousMonth() {
    date.setMonth(date.getMonth() - 1);
    setMonth(months[date.getMonth()]);
    setRerender(new Date());
  }

  useEffect(() => {
    date.setDate(1);
    const lastDay = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();
    const prevLastDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      0
    ).getDate();
    const firstDayIndex = date.getDay();
    const lastDayIndex = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDay();

    let aux = [];
    for (let x = firstDayIndex; x > 0; x--) {
      aux.push(prevLastDay - x + 1);
    }
    setPreviousDays(aux);
    setNextDays(Array.from({ length: 7 - lastDayIndex - 1 }, (v, i) => i + 1));
    setCurrentDays(Array.from({ length: lastDay }, (v, i) => i + 1));
  }, [rerender]); //eslint-disable-line

  return nextDays ? (
    <div className={styles.container}>
      <div className={styles.calendar}>
        <div className={styles.month}>
          <div className={styles.date}>
            <h1>{month}</h1>
          </div>
          <div className={styles.monthActionsDiv}>
            <button onClick={previousMonth}>Prev</button>
            <button onClick={nextMonth}>Next</button>
          </div>
        </div>
        <div className={styles.weekdays}>
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div className={styles.days}>
          {previousDays.map((day: any) => {
            return (
              <div
                className={styles.prev}
                onClick={() =>
                  getData({
                    day: day,
                    month: months[date.getMonth() - 1]
                      ? months[date.getMonth() - 1]
                      : months[months.length - 1],
                  })
                }
              >
                {day}
              </div>
            );
          })}
          {currentDays.map((day: any) => {
            let today = new Date();
            return (
              <div
                onClick={() => getData({ day: day, month: month })}
                className={
                  day === today.getDate() && month === months[today.getMonth()]
                    ? styles.currentDay
                    : ""
                }
              >
                {day}
              </div>
            );
          })}
          {nextDays.map((day: any) => {
            return (
              <div
                className={styles.next}
                onClick={() =>
                  getData({
                    day: day,
                    month: months[date.getMonth() + 1]
                      ? months[date.getMonth() + 1]
                      : months[0],
                  })
                }
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    <h1>Loading</h1>
  );
}

export default Calendar;
