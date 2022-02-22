import React, { useState, useEffect, useRef } from "react";
import "../style/DelayTimer.css";

const DelayTimer = (props) => {
  const [delayTimerValue, setDelayTimerValue] = useState(
    props.timeValue() - 1000
  );

  const num1 = delayTimerValue / 1000;
  const num2 = Math.floor(num1 / 60);
  const num3 = num1 % 60;
  const num3padded = num3.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const num4 = `${num2}:${num3padded}`;
  const delayTimerTimeoutID = useRef();
  console.log(num1);
  useEffect(() => {
    clearInterval(delayTimerTimeoutID.current);
    delayTimerTimeoutID.current = setInterval(() => {
      console.log(delayTimerValue);
      setDelayTimerValue((prevState) => {
        return prevState - 1000;
      });
    }, 1000);
    return () => {
      clearInterval(delayTimerTimeoutID.current);
    };
  }, [delayTimerValue]);

  /* const refreshInterval; */
  return (
    <div className={props.className}>{delayTimerValue >= 0 ? num4 : null}</div>
  );
};

export default DelayTimer;
