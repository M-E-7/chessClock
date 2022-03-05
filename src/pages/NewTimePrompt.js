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

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const tableNameInputHandler = (e) => {
    setTableName(e.target.value);
  };

  const setTimeHandler = (e) => {
    setTime(e.target.value);
  };

  const setHoursHandler = (e) => {
    setHours(e.target.value);
  };

  const setMinutesHandler = (e) => {
    setMinutes(e.target.value);
  };

  const setSecondsHandler = (e) => {
    setSeconds(e.target.value);
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
    <div className="NewTimePrompt__Wrapper">
      <div className="Logo" />

      <form
        className="NewTimePrompt__MainGridWrapper"
        autoComplete="off"
        onSubmit={submitHandler}
        id="mainForm"
      >
        <button
          className="EditScreen__BackButton"
          onClick={props.handlers.editHandler}
        />
        {/*  <label className="NewTimePrompt__LabelTableName" htmlFor="tableName">
          Table Name
        </label>
        <input
          className="NewTimePrompt__TableName NewTimePrompt__InputElement"
          id="tableName"
          type="text"
          onChange={tableNameInputHandler}
          value={tableName}
        /> */}
        {/*   <label htmlFor="Time" className="NewTimePrompt__TimeLabel">HOURS / MINUTES / SECONDS</label> */}
        <div className="NewTimePrompt__TimeValuesWrapper PlayerOne">
          <label htmlFor="hours" className="NewTimePrompt__TimeLabel">
            HOURS
          </label>
          <input
            className="NewTimePrompt__TimeInputBox"
            id="hours"
            type="number"
            min="1"
            onChange={setHoursHandler}
            value={hours}
          />
          <label htmlFor="hours" className="NewTimePrompt__TimeLabel">
            MINUTES
          </label>
          <input
            className="NewTimePrompt__TimeInputBox"
            id="minutes"
            type="number"
            min="1"
            onChange={setMinutesHandler}
            value={minutes}
          />
          <label htmlFor="hours" className="NewTimePrompt__TimeLabel">
            SECONDS
          </label>
          <input
            className="NewTimePrompt__TimeInputBox"
            id="seconds"
            type="number"
            min="1"
            onChange={setTimeHandler}
            value={time}
          />
        </div>
        <div className="NewTimePrompt__GameModifiersWrapper">
          <input
            className="NewTimePrompt__ValueInputBox ValueInput"
            id="Increment"
            type="number"
            min="0"
            onChange={setIncrementHandler}
            value={increment}
          />

          <input
            className="NewTimePrompt__GameType__Checkbox IncrementCheckbox"
            id="IncrementBox"
            type="checkbox"
            onChange={setGameTypeIncrementHandler}
            checked={gameTypeIncrement}
          />
          <label
            htmlFor="IncrementBox"
            className="NewTimePrompt__GameType__Label IncrementLabel"
          >
            Increment
          </label>

          <input
            className="NewTimePrompt__GameType__Checkbox DelayCheckbox"
            id="DelayBox"
            type="checkbox"
            onChange={setGameTypeDelayHandler}
            checked={gameTypeDelay}
          />
          <label
            htmlFor="DelayBox"
            className="NewTimePrompt__GameType__Label DelayLabel"
          >
            Delay
          </label>

          <input
            className="NewTimePrompt__GameType__Checkbox AsymmetryCheckbox"
            id="AsymmetryBox"
            type="checkbox"
            onChange={setAsymmetryHandler}
            value={asymmetry}
          />
          <label
            htmlFor="AsymmetryBox"
            className="NewTimePrompt__GameType__Label AsymmetryLabel"
          >
            Asymmetry
          </label>

          <label
            htmlFor="Increment"
            className="NewTimePrompt__GameType__Label ValueLabel"
          >
            {gameTypeIncrement && "Increment"}
            {gameTypeDelay && "Delay"}
          </label>
        </div>

        {asymmetry === true && (
          <React.Fragment>
            <div className="NewTimePrompt__TimeValuesWrapper PlayerTwo">
              <label htmlFor="hours" className="NewTimePrompt__TimeLabel">
                HOURS
              </label>
              <input
                className="NewTimePrompt__TimeInputBox"
                id="hours"
                type="number"
                min="1"
                onChange={setHoursHandler}
                value={hours}
              />
              <label htmlFor="hours" className="NewTimePrompt__TimeLabel">
                MINUTES
              </label>
              <input
                className="NewTimePrompt__TimeInputBox"
                id="minutes"
                type="number"
                min="1"
                onChange={setMinutesHandler}
                value={minutes}
              />
              <label htmlFor="hours" className="NewTimePrompt__TimeLabel">
                SECONDS
              </label>
              <input
                className="NewTimePrompt__TimeInputBox"
                id="seconds"
                type="number"
                min="1"
                onChange={setTimeHandler}
                value={time}
              />
            </div>
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
