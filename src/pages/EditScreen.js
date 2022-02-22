import React from "react";
import TimeIterations from "../components/TimeIterations";
import "../style/EditScreen.css";

const EditScreen = (props) => {
  return (
    <div className="editWrapper">
      <button
        className="EditScreen__BackButton"
        onClick={props.handlers.titleScreenHandler}
      ></button>
      <button
        className="selectButton"
        onClick={props.handlers.titleScreenHandler}
      >
        SELECT
      </button>
      <div className="availableTimes">
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
      <div className="EditScreen__ButtonWrapper">
        <button
          className="newTimeButton"
          onClick={() => {
            props.handlers.newTimeHandler();
          }}
        >
          NEW
        </button>
        <button
          className="EditScreen__DeleteButton"
          onClick={(e) => {
            e.stopPropagation();
            props.handlers.deleteTimeHandler(props.currentActiveID);
          }}
        >
          DELETE
        </button>
      </div>
    </div>
  );
};

export default EditScreen;
