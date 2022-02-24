import React, { useState } from "react";
import "../style/NewTimePrompt.css";

const NewTimePrompt = (props) => {
  const [tableName, setTableName] = useState("");
  const [time, setTime] = useState(1);
  const [increment, setIncrement] = useState(0);
  const [time2, setTime2] = useState(1);
  const [increment2, setIncrement2] = useState(0);
  const [asymmetry, setAsymmetry] = useState(false);
  const [gameTypeIncrement, setGameTypeIncrement] = useState(true);
  const [gameTypeDelay, setGameTypeDelay] = useState(false);

  const tableNameInputHandler = (e) => {
    setTableName(e.target.value);
  };

  const setTimeHandler = (e) => {
    setTime(e.target.value);
  };

  const setIncrementHandler = (e) => {
    setIncrement(e.target.value);
  };

  const setTimeHandler2 = (e) => {
    setTime2(e.target.value);
  };

  const setIncrementHandler2 = (e) => {
    setIncrement2(e.target.value);
  };

  const setAsymmetryHandler = (e) => {
    setAsymmetry(!asymmetry);
    console.log(asymmetry);
  };

  const setGameTypeIncrementHandler = (e) => {
    setGameTypeIncrement(true);
    setGameTypeDelay(false);
  };

  const setGameTypeDelayHandler = (e) => {
    setGameTypeDelay(true);
    setGameTypeIncrement(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const id = Math.random().toString(36).substr(2, 5);
    props.handlers.createNewTimeHandler(
      tableName,
      time,
      increment,
      asymmetry,
      time2,
      increment2,
      gameTypeIncrement,
      gameTypeDelay,
      id
    );
    props.handlers.editHandler();
    props.handlers.activeIDHandler(id);
  };

  return (
    <div>
      <button
        className="EditScreen__BackButton"
        onClick={props.handlers.editHandler}
      ></button>
      <form
        className="NewTimePrompt__FormWrapper"
        autocomplete="off"
        onSubmit={submitHandler}
      >
        <label className="NewTimePrompt__LabelTableName" htmlFor="tableName">
          Table Name
        </label>
        <input
          className="NewTimePrompt__TableName NewTimePrompt__InputElement"
          id="tableName"
          type="text"
          onChange={tableNameInputHandler}
          value={tableName}
        />
        <label htmlFor="Time">Time (Seconds)</label>
        <input
          className="NewTimePrompt__Time1 NewTimePrompt__InputElement"
          id="Time"
          type="number"
          min="1"
          onChange={setTimeHandler}
          value={time}
        />
        <label htmlFor="Increment">
          {gameTypeIncrement && "Increment"}
          {gameTypeDelay && "Delay"}
        </label>
        <input
          className="NewTimePrompt__Increment1 NewTimePrompt__InputElement"
          id="Increment"
          type="number"
          min="0"
          onChange={setIncrementHandler}
          value={increment}
        />

        <label htmlFor="AsymmetryBox">Asymmetry</label>
        <input
          className="NewTimePrompt__assymetryCheckbox"
          id="AsymmetryBox"
          type="checkbox"
          onChange={setAsymmetryHandler}
          value={asymmetry}
        />
        <div className="NewTimePrompt__GameTypeWrapper">
          <label htmlFor="IncrementBox">Increment</label>
          <input
            className="NewTimePrompt__IncrementGameTypeCheckbox"
            id="IncrementBox"
            type="checkbox"
            onChange={setGameTypeIncrementHandler}
            checked={gameTypeIncrement}
          />

          <label htmlFor="DelayBox">Delay</label>
          <input
            className="NewTimePrompt__DelayGameTypeCheckbox"
            id="DelayBox"
            type="checkbox"
            onChange={setGameTypeDelayHandler}
            checked={gameTypeDelay}
          />
        </div>

        {asymmetry === true && (
          <React.Fragment>
            <label htmlFor="Time2">Time</label>
            <input
              className="NewTimePrompt__Time2 NewTimePrompt__InputElement"
              id="Time2"
              type="number"
              min="1"
              onChange={setTimeHandler2}
              value={time2}
            />
            <label htmlFor="Increment2">
              {gameTypeIncrement && "Increment"}
              {gameTypeDelay && "Delay"}
            </label>
            <input
              className="NewTimePrompt__Increment2 NewTimePrompt__InputElement"
              id="Increment2"
              type="number"
              min="0"
              onChange={setIncrementHandler2}
              value={increment2}
            />{" "}
          </React.Fragment>
        )}
        <button className="NewTimePrompt__Submit" type="submit">
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default NewTimePrompt;
