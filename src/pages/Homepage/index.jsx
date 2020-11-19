import React from "react";

import style from "./styles.css";
import Calendar from "../../components/Calendar";

function Homepage() {
  return <Calendar getData={(value) => console.log(value)} />;
}

export default Homepage;
