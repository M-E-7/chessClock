import React, { useState, useEffect } from "react";
import "../style/TitleScreen.css";
import GameScreen from "./GameScreen";
import EditScreen from "./EditScreen";
import NewTimePrompt from "./NewTimePrompt";

import ChessTVScreen from "./ChessTVScreen";
import { useHistory, Route } from "react-router-dom";

const TitleScreen = () => {
  let history = useHistory();
  const [availableTimes, setAvailableTimes] = useState(() => {
    if (localStorage.getItem("available_times") === null) {
      return [
        {
          id: "defaultID",
          tableName: "TEST",
          time: 1,
          increment: 2,
          gameTypeIncrement: true,
          gameTypeDelay: false,
        },
      ];
    }
    const value = localStorage.getItem("available_times");
    return JSON.parse(value);
  });

  const [newTimeTrigger, setNewTimeTrigger] = useState();

  useEffect(() => {
    if (localStorage.getItem("available_times") === null) {
      const value2 = [
        {
          id: "defaultID",
          tableName: "TEST",
          time: 1,
          increment: 2,
          gameTypeIncrement: true,
          gameTypeDelay: false,
        },
      ];
      localStorage.setItem("available_times", JSON.stringify(value2));
      setAvailableTimes(value2);
    }
    const value = localStorage.getItem("available_times");
    setAvailableTimes(JSON.parse(value));
  }, [newTimeTrigger]);

  const [currentActiveID, setCurrentActiveID] = useState(() => {
    if (availableTimes === undefined || availableTimes.length === 0) {
      return "defaultID";
    }
    return availableTimes[0].id;
  });

  const [currentActiveTime, setCurrentActiveTime] = useState(
    availableTimes[availableTimes.map((e) => e.id).indexOf(currentActiveID)]
  );

  const [currentPage, setCurrentPage] = useState("TitleScreen");

  const mainStateHandlers = {
    startGameHandler: () => {
      mainStateHandlers.activeTimeHandler(currentActiveID);
      setCurrentPage("GameScreen");
      history.push("/game");
    },

    editHandler: () => {
      setCurrentPage("EditScreen");
      history.push("/edit");
    },

    newTimeHandler: () => {
      setCurrentPage("NewTimeScreen");
      history.push("/new");
    },

    titleScreenHandler: () => {
      setCurrentPage("TitleScreen");
      history.push("/");
    },

    chessTVHandler: () => {
      setCurrentPage("ChessTVScreen");
      history.push("/chessTV");
    },

    activeTimeHandler: (id) => {
      setCurrentActiveID(id);
      setCurrentActiveTime(
        availableTimes[availableTimes.map((e) => e.id).indexOf(id)]
      );

      console.log(id + " current active");
    },

    activeIDHandler: (id) => {
      setCurrentActiveID(id);
    },

    deleteTimeHandler: (toDeleteID) => {
      console.log(toDeleteID + " to delete id");
      const updatedTimes = availableTimes.filter((e) => e.id !== toDeleteID);
      if (updatedTimes.length === 0) {
        return;
      }
      localStorage.removeItem("available_times");
      localStorage.setItem("available_times", JSON.stringify(updatedTimes));
      if (currentActiveID === toDeleteID) {
        if (updatedTimes === undefined || updatedTimes.length === 0) {
          setAvailableTimes(updatedTimes);
          return;
        } else {
          const id = updatedTimes[0].id;
          console.log(id + " should be new active");
          mainStateHandlers.activeTimeHandler(id);
          setAvailableTimes(updatedTimes);
          return;
        }
      }
    },

    createNewTimeHandler: (
      tableName,
      time,
      increment,
      asymmetry,
      time2,
      increment2,
      gameTypeIncrement,
      gameTypeDelay,
      id
    ) => {
      if (!asymmetry) {
        const newObject = {
          id: id,
          tableName: tableName,
          time: time,
          increment: increment,
          asymmetry: asymmetry,
          gameTypeIncrement: gameTypeIncrement,
          gameTypeDelay: gameTypeDelay,
        };

        setAvailableTimes((prevState) => {
          setNewTimeTrigger(!newTimeTrigger);
          localStorage.removeItem("available_times");
          localStorage.setItem(
            "available_times",
            JSON.stringify([newObject, ...prevState])
          );

          return [newObject, ...prevState];
        });
      }

      if (asymmetry) {
        const newObject = {
          id: id,
          tableName: tableName,
          time: time,
          increment: increment,
          time2: time2,
          increment2: increment2,
          asymmetry: asymmetry,
          gameTypeIncrement: gameTypeIncrement,
          gameTypeDelay: gameTypeDelay,
        };

        setAvailableTimes((prevState) => {
          setNewTimeTrigger(!newTimeTrigger);
          localStorage.removeItem("available_times");
          localStorage.setItem(
            "available_times",
            JSON.stringify([newObject, ...prevState])
          );
          return [newObject, ...prevState];
        });
      }
    },
  };

  return (
    <React.Fragment>
      <Route exact path="/">
        <div className="TitleScreen__titleWrapper">
          <div className="Logo" />
          <div className="TitleScreen__mainGridWrapper">
            <div className="TitleScreen__TimeWrapper">
              <div className="TitleScreen__TimeElement">
                <div className="TitleScreen__TimeValue">
                  {currentActiveTime.time.toString()}
                </div>
                <div className="TitleScreen__IncrementValue">
                  +{currentActiveTime.increment.toString()}
                </div>
              </div>
              {currentActiveTime.asymmetry === true && (
                <React.Fragment>
                  <p className="TitleScreen__VS">VS</p>
                  <div className="TitleScreen__TimeElement">
                    <div className="TitleScreen__TimeValue">
                      {currentActiveTime.time2.toString()}
                    </div>
                    <div className="TitleScreen__IncrementValue">
                      +{currentActiveTime.increment.toString()}
                    </div>
                  </div>
                </React.Fragment>
              )}
            </div>

            <button
              className="TitleScreen__startButton"
              onClick={mainStateHandlers.startGameHandler}
            >
              START
            </button>
            <button
              className="TitleScreen__chessTVButton"
              onClick={mainStateHandlers.chessTVHandler}
            >
              <p className="TitleScreen__chessTVButton__text">watch chess TV</p>
            </button>
            <button
              className="TitleScreen__editButton"
              onClick={mainStateHandlers.editHandler}
            >
              EDIT
            </button>
          </div>
        </div>
      </Route>

      <Route exact path="/chessTV">
        <ChessTVScreen handlers={mainStateHandlers} />
      </Route>
      <Route exact path="/game">
        <GameScreen
          handlers={mainStateHandlers}
          currentActiveTime={currentActiveTime}
        />
      </Route>

      <Route exact path="/edit">
        <EditScreen
          handlers={mainStateHandlers}
          availableTimes={availableTimes}
          currentActiveID={currentActiveID}
        />
      </Route>
      <Route exact path="/new">
        <NewTimePrompt
          handlers={mainStateHandlers}
          availableTimes={availableTimes}
          currentActiveID={currentActiveID}
        />
      </Route>
    </React.Fragment>
  );
};

export default TitleScreen;
