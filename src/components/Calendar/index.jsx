import React, { useState, useEffect } from "react";

// import "./styles.css";

function Calendar() {
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
  const [previousDays, setPreviousDays] = useState();
  const [nextDays, setNextDays] = useState();
  const [currentDays, setCurrentDays] = useState();

  function nextMonth() {
    date.setMonth(date.getMonth() + 1);
  }

  function previousMonth() {
    date.setMonth(date.getMonth() - 1);
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

    // aux = [];
    // for (let i = 1; i <= lastDay; i++) {
    //   aux.push(i);
    // }
    setCurrentDays(Array.from({ length: lastDay }, (v, i) => i + 1));
  }, [date]); //es-lint-disable-line

  return nextDays ? (
    <div className="container">
      <div className="calendar">
        <div className="month">
          <div className="date">
            <h1>{month}</h1>
            <p>{new Date().toDateString()}</p>
          </div>
        </div>
        <div className="weekdays">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div className="days">
          {previousDays.map((day) => {
            return <div>{day}</div>;
          })}
          {currentDays.map((day) => {
            return <div>{day}</div>;
          })}
          {nextDays.map((day) => {
            return <div>{day}</div>;
          })}
        </div>
      </div>
    </div>
  ) : (
    <h1>Loading</h1>
  );
}

export default Calendar;
