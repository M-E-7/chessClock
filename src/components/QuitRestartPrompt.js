import React from "react";
import "../style/QuitRestartPrompt.css";

const QuitPrompt = (props) => {
  console.log(props.dispatchGameState);
  return (
    <div className="quitRestartPrompt__Wrapper">
      <div
        className="quitRestartPrompt__YES"
        onClick={() => {
          props.dispatchGameState({
            type: props.dispatchType,
          });
        }}
      >
        Yes
      </div>
      <div
        className="quitRestartPrompt__NO"
        onClick={() => {
          props.dispatchGameState({
            type: "restartOrQuitOffAction",
          });
        }}
      >
        No
      </div>
      <div className="quitRestartPrompt__TEXT">{props.children}</div>
    </div>
  );
};

export default QuitPrompt;
