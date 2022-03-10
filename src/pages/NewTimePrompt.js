import React, { useState } from "react";
import "../style/NewTimePrompt.css";

const NewTimePrompt = (props) => {
  const [tableName, setTableName] = useState("");

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [increment, setIncrement] = useState(0);

  const [hours2, setHours2] = useState(0);
  const [minutes2, setMinutes2] = useState(0);
  const [seconds2, setSeconds2] = useState(0);
  const [increment2, setIncrement2] = useState(0);

  const [asymmetry, setAsymmetry] = useState(false);

  const [gameTypeIncrement, setGameTypeIncrement] = useState(true);
  const [gameTypeDelay, setGameTypeDelay] = useState(false);

  const tableNameInputHandler = (e) => {
    setTableName(e.target.value);
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

  const setHoursHandler2 = (e) => {
    setHours2(e.target.value);
  };

  const setMinutesHandler2 = (e) => {
    setMinutes2(e.target.value);
  };

  const setSecondsHandler2 = (e) => {
    setSeconds2(e.target.value);
  };

  const setIncrementHandler = (e) => {
    console.log(e.target.value);
    setIncrement(e.target.value);
  };

  const setIncrementHandler2 = (e) => {
    setIncrement2(e.target.value);
  };

  const setAsymmetryHandler = (e) => {
    setAsymmetry(!asymmetry);
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
    console.log(`${seconds} - seconds`);
    console.log(`${minutes} - minutes`);
    console.log(`${hours} - hours`);
    const time =
      parseInt(seconds) + parseInt(minutes) * 60 + parseInt(hours) * 3600;
    console.log(`${time} - TIME CALCULATED`);
    const time2 = () => {
      if (!asymmetry) {
        return time;
      }
      if (asymmetry) {
        return (
          parseInt(seconds2) + parseInt(minutes2) * 60 + parseInt(hours2) * 3600
        );
      }
    };
    const id = Math.random().toString(36).substr(2, 5);
    props.handlers.createNewTimeHandler(
      tableName,
      time,
      parseInt(increment),
      asymmetry,
      time2(),
      parseInt(increment2),
      gameTypeIncrement,
      gameTypeDelay,
      id
    );
    props.handlers.activeIDHandler(id);
    props.handlers.editHandler();
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
        <div className="NewTimePrompt__TimeValuesWrapper PlayerOne">
          <label htmlFor="hours" className="NewTimePrompt__TimeLabel">
            HOURS
          </label>
          <input
            className="NewTimePrompt__TimeInputBox"
            id="hours"
            type="number"
            onChange={setHoursHandler}
            value={hours}
          />
          <label htmlFor="minutes" className="NewTimePrompt__TimeLabel">
            MINUTES
          </label>
          <input
            className="NewTimePrompt__TimeInputBox"
            id="minutes"
            type="number"
            onChange={setMinutesHandler}
            value={minutes}
          />
          <label htmlFor="seconds" className="NewTimePrompt__TimeLabel">
            SECONDS
          </label>
          <input
            className="NewTimePrompt__TimeInputBox"
            id="seconds"
            type="number"
            onChange={setSecondsHandler}
            value={seconds}
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
              <label htmlFor="hours2" className="NewTimePrompt__TimeLabel">
                HOURS
              </label>
              <input
                className="NewTimePrompt__TimeInputBox"
                id="hours2"
                type="number"
                min="0"
                onChange={setHoursHandler2}
                value={hours2}
              />
              <label htmlFor="minutes2" className="NewTimePrompt__TimeLabel">
                MINUTES
              </label>
              <input
                className="NewTimePrompt__TimeInputBox"
                id="minutes2"
                type="number"
                onChange={setMinutesHandler2}
                value={minutes2}
              />
              <label htmlFor="seconds2" className="NewTimePrompt__TimeLabel">
                SECONDS
              </label>
              <input
                className="NewTimePrompt__TimeInputBox"
                id="seconds2"
                type="number"
                min="0"
                onChange={setSecondsHandler2}
                value={seconds2}
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
