import React, { useState } from "react";
import "../style/NewTimePrompt.css";
import useWindowDimensions from "../hooks/useWindowDimensions";

import { ReactComponent as CheckboxTrueSVG } from "../resources/icons/checkboxTrue.svg";
import { ReactComponent as CheckboxFalseSVG } from "../resources/icons/checkboxFalse.svg";
import { ReactComponent as RadioTrueSVG } from "../resources/icons/radioTrue.svg";
import { ReactComponent as RadioFalseSVG } from "../resources/icons/radioFalse.svg";
import BackIconSVG from "../components/backIconSVG";

const NewTimePrompt = (props) => {
  const { height, width } = useWindowDimensions();

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

  const [errorState, setErrorState] = useState(false);

  const incrementDisplayFunction = () => {
    return gameTypeIncrement ? (
      <RadioTrueSVG
        className={`NewTimePrompt__GameType__CheckboxRadio IncrementCheckbox`}
        id="IncrementBox"
        onClick={setGameTypeIncrementHandler}
      />
    ) : (
      <RadioFalseSVG
        className={`NewTimePrompt__GameType__CheckboxRadio IncrementCheckbox`}
        id="IncrementBox"
        onClick={setGameTypeIncrementHandler}
      />
    );
  };

  const delayDisplayFunction = () => {
    return gameTypeDelay ? (
      <RadioTrueSVG
        className={`NewTimePrompt__GameType__CheckboxRadio DelayCheckbox`}
        id="DelayBox"
        onClick={setGameTypeDelayHandler}
      />
    ) : (
      <RadioFalseSVG
        className={`NewTimePrompt__GameType__CheckboxRadio DelayCheckbox`}
        id="DelayBox"
        onClick={setGameTypeDelayHandler}
      />
    );
  };

  const asymmetryDisplayFunction = () => {
    return asymmetry ? (
      <CheckboxTrueSVG
        className={`NewTimePrompt__GameType__CheckboxRadio AsymmetryCheckbox`}
        id="AsymmetryBox"
        onClick={setAsymmetryHandler}
      />
    ) : (
      <CheckboxFalseSVG
        className={`NewTimePrompt__GameType__CheckboxRadio AsymmetryCheckbox`}
        id="AsymmetryBox"
        onClick={setAsymmetryHandler}
      />
    );
  };

  const setHoursHandler = (e) => {
    setErrorState(false);
    setHours(e.target.value);
  };

  const setMinutesHandler = (e) => {
    setErrorState(false);
    setMinutes(e.target.value);
  };

  const setSecondsHandler = (e) => {
    setErrorState(false);
    setSeconds(e.target.value);
  };

  const setHoursHandler2 = (e) => {
    setErrorState(false);
    setHours2(e.target.value);
  };

  const setMinutesHandler2 = (e) => {
    setErrorState(false);
    setMinutes2(e.target.value);
  };

  const setSecondsHandler2 = (e) => {
    setErrorState(false);
    setSeconds2(e.target.value);
  };

  const setIncrementHandler = (e) => {
    setErrorState(false);
    setIncrement(e.target.value);
  };

  const setAsymmetryHandler = (e) => {
    setErrorState(false);
    setAsymmetry(!asymmetry);
  };

  const setGameTypeIncrementHandler = (e) => {
    setErrorState(false);
    setGameTypeIncrement(true);
    setGameTypeDelay(false);
  };

  const setGameTypeDelayHandler = (e) => {
    setErrorState(false);
    setGameTypeDelay(true);
    setGameTypeIncrement(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const parsedSeconds = isNaN(parseInt(seconds)) ? 0 : parseInt(seconds);
    const parsedMinutes = isNaN(parseInt(minutes)) ? 0 : parseInt(minutes);
    const parsedHours = isNaN(parseInt(hours)) ? 0 : parseInt(hours);
    const parsedSeconds2 = isNaN(parseInt(seconds2)) ? 0 : parseInt(seconds2);
    const parsedMinutes2 = isNaN(parseInt(minutes2)) ? 0 : parseInt(minutes2);
    const parsedHours2 = isNaN(parseInt(hours2)) ? 0 : parseInt(hours2);

    console.log(`${seconds} - seconds`);
    console.log(`${minutes} - minutes`);
    console.log(`${hours} - hours`);
    const time = parsedSeconds + parsedMinutes * 60 + parsedHours * 3600;
    console.log(`${time} - TIME CALCULATED`);
    const time2 = () => {
      if (!asymmetry) {
        return time;
      }
      if (asymmetry) {
        return parsedSeconds2 + parsedMinutes2 * 60 + parsedHours2 * 3600;
      }
    };

    if (time < 1 || time2() < 1) {
      setErrorState(true);
      return;
    }
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

  const nonNumberFilter = (evt) => {
    (evt.key === "e" || evt.key === "." || evt.key === "-") &&
      evt.preventDefault();
  };

  return (
    <div
      className="NewTimePrompt__Wrapper"
      style={{ height: height, width: width }}
    >
      <div className="Logo" />

      <form
        className="NewTimePrompt__MainGridWrapper"
        autoComplete="off"
        onSubmit={submitHandler}
        id="mainForm"
      >
        <BackIconSVG
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
            min="0"
            max="10"
            onChange={setHoursHandler}
            value={hours}
            onKeyDown={(evt) => {
              nonNumberFilter(evt);
            }}
          />
          <label htmlFor="minutes" className="NewTimePrompt__TimeLabel">
            MINUTES
          </label>
          <input
            className="NewTimePrompt__TimeInputBox"
            id="minutes"
            type="number"
            min="0"
            max="59"
            onChange={setMinutesHandler}
            value={minutes}
            onKeyDown={(evt) => {
              nonNumberFilter(evt);
            }}
          />
          <label htmlFor="seconds" className="NewTimePrompt__TimeLabel">
            SECONDS
          </label>
          <input
            className="NewTimePrompt__TimeInputBox"
            id="seconds"
            type="number"
            min="0"
            max="59"
            onChange={setSecondsHandler}
            value={seconds}
            onKeyDown={(evt) => {
              nonNumberFilter(evt);
            }}
          />
        </div>
        <div className="NewTimePrompt__GameModifiersWrapper">
          <input
            className="NewTimePrompt__ValueInputBox ValueInput"
            id="Increment"
            type="number"
            min="0"
            max="1000"
            onChange={setIncrementHandler}
            value={increment}
            onKeyDown={(evt) => {
              nonNumberFilter(evt);
            }}
          />

          {incrementDisplayFunction()}

          <label
            htmlFor="IncrementBox"
            className="NewTimePrompt__GameType__Label IncrementLabel"
          >
            Increment
          </label>

          {delayDisplayFunction()}
          <label
            htmlFor="DelayBox"
            className="NewTimePrompt__GameType__Label DelayLabel"
          >
            Delay
          </label>

          {asymmetryDisplayFunction()}

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

        {asymmetry && (
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
                max="10"
                onChange={setHoursHandler2}
                value={hours2}
                onKeyDown={(evt) => {
                  nonNumberFilter(evt);
                }}
              />
              <label htmlFor="minutes2" className="NewTimePrompt__TimeLabel">
                MINUTES
              </label>
              <input
                className="NewTimePrompt__TimeInputBox"
                id="minutes2"
                type="number"
                min="0"
                max="59"
                onChange={setMinutesHandler2}
                value={minutes2}
                onKeyDown={(evt) => {
                  nonNumberFilter(evt);
                }}
              />
              <label htmlFor="seconds2" className="NewTimePrompt__TimeLabel">
                SECONDS
              </label>
              <input
                className="NewTimePrompt__TimeInputBox"
                id="seconds2"
                type="number"
                min="0"
                max="59"
                onChange={setSecondsHandler2}
                value={seconds2}
                onKeyDown={(evt) => {
                  nonNumberFilter(evt);
                }}
              />
            </div>
          </React.Fragment>
        )}
        <button className="NewTimePrompt__Submit" type="submit">
          SUBMIT
        </button>
        {errorState && (
          <p className="NewTimePrompt__ErrorMessage">Invalid time!</p>
        )}
      </form>
    </div>
  );
};

export default NewTimePrompt;
