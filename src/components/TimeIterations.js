import React, { useState, useEffect } from "react";
import "../style/TimeIterations.css";

const TimeIterations = (props) => {
  const [activeState, setActiveState] = useState(false);
  /* 
  const infoStorage = {
    id: props.id,
    tableName: props.tableName,
    time: props.time,
    increment: props.increment,
    asymmetry: props.asymmetry,
    time2: props.time2,
    increment2: props.increment2,
    gameTypeIncrement: props.gameTypeIncrement,
    gameTypeDelay: props.gameTypeDelay,
  }; */

  useEffect(() => {
    if (props.currentActiveID === props.id) {
      setActiveState(true);
    } else {
      setActiveState(false);
    }
  }, [props.currentActiveID, props.id]);

  const activeHandler = () => {
    props.handlers.activeTimeHandler(props.id);
  };

  const textGameType = () => {
    if (props.gameTypeIncrement === true) {
      return "Increment";
    }
    if (props.gameTypeDelay === true) {
      return "Delay";
    }
  };

  const textTimeValues = () => {
    if (props.asymmetry === true) {
      return `(${props.time} + ${props.increment}) vs (${props.time2} + ${props.increment2})`;
    }
    if (props.asymmetry === false) {
      return `(${props.time} + ${props.increment})`;
    }
  };
  return (
    <div
      unselectable="on"
      style={{
        outline: activeState
          ? "3px solid rgba(167, 126, 220, 0.75)"
          : "1px solid grey",
        fontWeight: activeState ? "bold" : "normal",
        fontSize: activeState ? "1.1em" : "1em",
        color: activeState ? "white" : "grey",
      }}
      className="TimeIterations__timeOption"
      onClick={activeHandler}
    >
      <p className="TimeIterations__text">{`${props.tableName}`}</p>
      <p className="TimeIterations__text">{textTimeValues()}</p>
      <p className="TimeIterations__text">{`(${textGameType()})`}</p>
    </div>
  );
};

export default TimeIterations;
