import React, { useState, useEffect, useReducer } from "react";

import QuitRestartPrompt from "../components/QuitRestartPrompt";
import DelayTimer from "../components/DelayTimer";
import "../style/GameScreen.css";
import clickSound from "../resources/sounds/clickSound.wav";

import { useWakeLock } from "react-screen-wake-lock";

const gameStateReducer = (state, action) => {
  switch (action.type) {
    default: {
      return { ...state };
    }
    case "playerOneTickAction":
      return {
        ...state,
        firstDelayTick: false,
        playerOneTime: state.playerOneTime - 1,
      };

    case "playerTwoTickAction":
      return {
        ...state,
        firstDelayTick: false,
        playerTwoTime: state.playerTwoTime - 1,
      };

    case "pauseActionFalse":
      return {
        ...state,
        pauseState: "pauseActionTrue",
        playerActive: 0,
        backgroundPlayerTwo: "orange",
        backgroundPlayerOne: "orange",
        renderForcer: state.renderForcer + 1,

        lastPlayerStateBuffer: state.playerActive,
        backgroundPlayerOneBuffer: state.backgroundPlayerOne,
        backgroundPlayerTwoBuffer: state.backgroundPlayerTwo,
      };
    case "pauseActionTrue":
      return {
        ...state,
        pauseState: "pauseActionFalse",
        renderForcer: state.renderForcer + 1,
        playerActive: state.lastPlayerStateBuffer,
        backgroundPlayerOne: state.backgroundPlayerOneBuffer,
        backgroundPlayerTwo: state.backgroundPlayerTwoBuffer,
      };
    case "quitOnAction":
      return {
        ...state,
        quitPromptVar: true,
        renderForcer: state.renderForcer + 1,
      };
    case "restartOnAction":
      return {
        ...state,
        restartPromptVar: true,
        renderForcer: state.renderForcer + 1,
      };

    case "restartOrQuitOffAction":
      return {
        ...state,
        restartPromptVar: false,
        quitPromptVar: false,
      };
    case "restartAcceptAction":
      return {
        ...state,
        restartPromptVar: false,
        pauseState: "pauseActionFalse",

        playerOneTime: state.startingPlayerOneTime,
        playerTwoTime: state.startingPlayerTwoTime,
        renderForcer: state.renderForcer + 1,
        playerActive: 0,
        backgroundPlayerTwo: "black",
        backgroundPlayerOne: "black",
        gameOver: 0,
        playerWin: 0,
      };

    case "playerTwoAction":
      return {
        ...state,
        playerActive: 1,
        pauseState: "pauseActionFalse",
        playerTwoTime:
          state.playerTwoTimeIncrement !== 0
            ? state.playerTwoTime + state.incrementValuePlayerTwo()
            : state.playerTwoTime,
        backgroundPlayerTwo: "black",
        backgroundPlayerOne: "green",
        firstDelayTick: true,
        restartPromptVar: false,
        quitPromptVar: false,
      };

    case "playerOneAction":
      return {
        ...state,
        playerActive: 2,
        pauseState: "pauseActionFalse",
        playerOneTime:
          state.playerOneTimeIncrement !== 0
            ? state.playerOneTime + state.incrementValuePlayerOne()
            : state.playerOneTime,
        backgroundPlayerOne: "black",
        backgroundPlayerTwo: "green",
        firstDelayTick: true,
        restartPromptVar: false,
        quitPromptVar: false,
      };
    case "playerOneLossAction":
      return {
        ...state,
        backgroundPlayerTwo: "green",
        backgroundPlayerOne: "red",
        playerActive: 0,
        gameOver: 1,
        playerWin: 2,
      };
    case "playerTwoLossAction":
      return {
        ...state,
        backgroundPlayerOne: "green",
        backgroundPlayerTwo: "red",
        playerActive: 0,
        gameOver: 1,
        playerWin: 1,
      };
    case "quitToTitleScreen":
      return {
        ...state,
        release: state.release(),
        exitToTitleScreen: state.exitToTitleScreen(),
      };
  }
};
const GameScreen = (props) => {
  const { isSupported, released, request, release } = useWakeLock({
    onRequest: () => {},
    onError: () => {},
    onRelease: () => {},
  });

  const [gameState, dispatchGameState] = useReducer(gameStateReducer, {
    playerWin: 0,
    renderForcer: 0,
    asymmetry: props.currentActiveTime.asymmetry,
    gameTypeIncrement: props.currentActiveTime.gameTypeIncrement,
    gameTypeDelay: props.currentActiveTime.gameTypeDelay,

    startingPlayerOneTime: parseInt(props.currentActiveTime.time),
    startingPlayerTwoTime: props.currentActiveTime.asymmetry
      ? parseInt(props.currentActiveTime.time2)
      : parseInt(props.currentActiveTime.time),
    playerOneTime: parseInt(props.currentActiveTime.time),
    playerTwoTime: props.currentActiveTime.asymmetry
      ? parseInt(props.currentActiveTime.time2)
      : parseInt(props.currentActiveTime.time),
    playerOneTimeIncrement: parseInt(props.currentActiveTime.increment),
    playerTwoTimeIncrement: props.currentActiveTime.asymmetry
      ? parseInt(props.currentActiveTime.increment2)
      : parseInt(props.currentActiveTime.increment),
    incrementValuePlayerOne: () => {
      if (props.currentActiveTime.gameTypeIncrement === true) {
        return gameState.playerOneTimeIncrement;
      }
      if (props.currentActiveTime.gameTypeDelay === true) {
        return 0;
      }
    },
    incrementValuePlayerTwo: () => {
      if (props.currentActiveTime.gameTypeIncrement === true) {
        return gameState.playerTwoTimeIncrement;
      }
      if (props.currentActiveTime.gameTypeDelay === true) {
        return 0;
      }
    },
    playerActive: 0,
    restartPromptVar: false,
    quitPromptVar: false,
    firstDelayTick: true,
    pauseState: "pauseActionFalse",
    lastPlayerStateBuffer: null,
    backgroundPlayerOneBuffer: "",
    backgroundPlayerTwoBuffer: "",
    backgroundPlayerOne: "black",
    backgroundPlayerTwo: "black",
    gameOver: 0,
    exitToTitleScreen: () => {
      props.handlers.titleScreenHandler();
    },
    release: () => {
      release();
    },
  });

  const playClickSound = () => {
    new Audio(clickSound).play();
  };

  const timeoutDelay = () => {
    if (gameState.gameTypeIncrement === true) {
      return 1000;
    }
    if (gameState.gameTypeDelay === true) {
      if (gameState.firstDelayTick === true && gameState.playerActive === 1) {
        return gameState.playerOneTimeIncrement * 1000 + 1000;
      }
      if (gameState.firstDelayTick === true && gameState.playerActive === 2) {
        return gameState.playerTwoTimeIncrement * 1000 + 1000;
      }
      if (gameState.firstDelayTick === false) {
        return 1000;
      }
    }
  };

  /* current available player time */
  const playerOneTimeRender = () => {
    const num1 = Math.floor(gameState.playerOneTime / 60);
    const num2 = gameState.playerOneTime % 60;

    const num2padded = num2.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    if (gameState.playerWin === 2) {
      return "DEFEAT";
    } else return `${num1}:${num2padded}`;
  };

  const playerTwoTimeRender = () => {
    const num1 = Math.floor(gameState.playerTwoTime / 60);
    const num2 = gameState.playerTwoTime % 60;

    const num2padded = num2.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });

    if (gameState.playerWin === 1) {
      return "DEFEAT";
    } else return `${num1}:${num2padded}`;
  };

  /* tickrate: */
  useEffect(() => {
    refreshInterval();
    return () => {
      clearTimeout(timeoutID);
    };
  });

  let timeoutID;
  const refreshInterval = () => {
    timeoutID = setTimeout(() => {
      console.log(props.currentActiveTime.gameTypeIncrement);
      if (gameState.playerOneTime === 0) {
        return dispatchGameState({ type: "playerOneLossAction" });
      }
      if (gameState.playerTwoTime === 0) {
        return dispatchGameState({ type: "playerTwoLossAction" });
      }
      if (gameState.playerActive === 1) {
        return dispatchGameState({ type: "playerOneTickAction" });
      }
      if (gameState.playerActive === 2) {
        return dispatchGameState({ type: "playerTwoTickAction" });
      }

      if (gameState.playerActive === 0) {
        console.log("playerZEROTimer");
        console.log(gameState);
      }
    }, timeoutDelay());
  };

  /* JSX RETURN ---------------------- */
  /* JSX RETURN ---------------------- */
  /* JSX RETURN ---------------------- */
  /* VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV */
  return (
    <div className="gameWrapper">
      <div
        style={{ background: gameState.backgroundPlayerOne }}
        className="playerOne"
        onClick={() => {
          return gameState.playerActive === 2 || gameState.gameOver === 1
            ? null
            : (request(),
              playClickSound(),
              dispatchGameState({ type: "playerOneAction" }));
        }}
      >
        {gameState.playerActive === 1 &&
        gameState.gameTypeDelay &&
        gameState.firstDelayTick === true ? (
          <DelayTimer
            className="delayTimerPlayerOne"
            timeValue={timeoutDelay}
            gameState={gameState}
          ></DelayTimer>
        ) : (
          <p className="playerOneTime">{playerOneTimeRender()}</p>
        )}
      </div>
      <div
        style={{ background: gameState.backgroundPlayerTwo }}
        className="playerTwo"
        onClick={() => {
          if (gameState.playerActive === 1 || gameState.gameOver === 1) {
            return null;
          } else {
            request();
            playClickSound();
            dispatchGameState({ type: "playerTwoAction" });
          }
        }}
      >
        {gameState.playerActive === 2 &&
        gameState.gameTypeDelay &&
        gameState.firstDelayTick === true ? (
          <DelayTimer
            className="delayTimerPlayerTwo"
            timeValue={timeoutDelay}
            gameState={gameState}
          ></DelayTimer>
        ) : (
          <p className="playerTwoTime">{playerTwoTimeRender()}</p>
        )}
      </div>
      {gameState.restartPromptVar === true && (
        <QuitRestartPrompt
          dispatchGameState={dispatchGameState}
          dispatchType={"restartAcceptAction"}
        >
          Restart game?
        </QuitRestartPrompt>
      )}
      {gameState.quitPromptVar === true && (
        <QuitRestartPrompt
          dispatchGameState={dispatchGameState}
          dispatchType={"quitToTitleScreen"}
        >
          Quit game?
        </QuitRestartPrompt>
      )}
      <div className="gameControls">
        <div
          className={`pauseButton ${
            gameState.pauseState === "pauseActionTrue" ? "orange" : ""
          }`}
          onClick={() => {
            if (gameState.gameOver === 1) {
              return;
            } else {
              dispatchGameState({ type: gameState.pauseState });
            }
          }}
        ></div>

        {gameState.pauseState === "pauseActionTrue" ||
        gameState.gameOver === 1 ? (
          <React.Fragment>
            <div
              className="exitButton"
              onClick={() => {
                dispatchGameState({ type: "quitOnAction" });
              }}
            ></div>
            <div
              className="restartButton"
              onClick={() => {
                dispatchGameState({ type: "restartOnAction" });
              }}
            ></div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="exitButton invisible"></div>
            <div className="restartButton invisible"></div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default GameScreen;
