import React from "react";
import TimeIterations from "../components/TimeIterations";
import "../style/EditScreen.css";

import BackIconSVG from "../components/backIconSVG";

const EditScreen = (props) => {
  const selectHandler = () => {
    props.handlers.activeTimeHandler(props.currentActiveID);
    props.handlers.titleScreenHandler();
  };

  return (
    <div className="EditScreen__Wrapper">
      <div className="Logo" />

      <div className="EditScreen__mainGridWrapper">
        <BackIconSVG
          className="EditScreen__BackButton"
          onClick={props.handlers.titleScreenHandler}
        />
        <div className="EditScreen__ButtonWrapper">
          <button
            className="EditScreen__newTimeButton"
            onClick={() => {
              props.handlers.newTimeHandler();
            }}
          >
            new
          </button>
          <button
            className="EditScreen__DeleteButton"
            onClick={(e) => {
              e.stopPropagation();
              props.handlers.deleteTimeHandler(props.currentActiveID);
            }}
          >
            delete
          </button>
        </div>

        <div className="EditScreen__availableTimes">
          {props.availableTimes.map((e) => (
            <TimeIterations
              id={e.id}
              key={e.id}
              tableName={e.tableName}
              time={e.time}
              increment={e.increment}
              asymmetry={e.asymmetry}
              time2={e.time2}
              increment2={e.increment2}
              gameTypeDelay={e.gameTypeDelay}
              gameTypeIncrement={e.gameTypeIncrement}
              handlers={props.handlers}
              currentActiveID={props.currentActiveID}
            />
          ))}
        </div>
        <button className="EditScreen__selectButton" onClick={selectHandler}>
          SELECT
        </button>
      </div>
    </div>
  );
};

export default EditScreen;
