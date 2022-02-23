import React, { useState, useEffect } from "react";
import "../style/TitleScreen.css";
import GameScreen from "./GameScreen";
import EditScreen from "./EditScreen";
import NewTimePrompt from "./NewTimePrompt";
import ChessTVScreen from "./ChessTVScreen";

const TitleScreen = () => {
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

  /*  const [availableTimes, setAvailableTimes] = useState([
    {
      id: "defaultID",
      tableName: "TEST",
      time: 1,
      increment: 2,
    },
  ]); */

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
    ////////console.log(JSON.parse(value));
  }, [newTimeTrigger]);

  /*  useEffect(() => {
    localStorage.setItem("available_times", JSON.stringify(availableTimes));
  }, [availableTimes]); */

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
    },

    editHandler: () => {
      setCurrentPage("EditScreen");
    },

    newTimeHandler: () => {
      setCurrentPage("NewTimeScreen");
    },

    titleScreenHandler: () => {
      setCurrentPage("TitleScreen");
    },

    chessTVHandler: () => {
      setCurrentPage("ChessTVScreen");
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
      /* mainStateHandlers.activeTimeHandler(newObject.id); */
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

  //////////console.log(availableTimes);
  //////////console.log(currentActiveID);
  /* //////////console.log(currentActiveTime); */
  return (
    <React.Fragment>
      {currentPage === "TitleScreen" && (
        <div className="TitleScreen__titleWrapper">
          <button
            className="TitleScreen__startButton"
            onClick={mainStateHandlers.startGameHandler}
          >
            START
          </button>
          <button
            className="chessTVButton"
            onClick={mainStateHandlers.chessTVHandler}
          >
            Watch Chess TV!
          </button>
          <button
            className="TitleScreen__editButton"
            onClick={mainStateHandlers.editHandler}
          >
            EDIT
          </button>
          {/* <div className="settingsButton">SETTINGS</div> */}
        </div>
      )}
      {currentPage === "ChessTVScreen" && (
        <ChessTVScreen handlers={mainStateHandlers} />
      )}
      {currentPage === "GameScreen" && (
        <GameScreen
          handlers={mainStateHandlers}
          currentActiveTime={currentActiveTime}
        />
      )}

      {currentPage === "EditScreen" && (
        <EditScreen
          handlers={mainStateHandlers}
          availableTimes={availableTimes}
          currentActiveID={currentActiveID}
        />
      )}

      {currentPage === "NewTimeScreen" && (
        <NewTimePrompt handlers={mainStateHandlers} />
      )}
    </React.Fragment>
  );
};

export default TitleScreen;
