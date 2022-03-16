import React from "react";
import "../style/QuitRestartModal.css";

const QuitPrompt = (props) => {
  console.log(props.dispatchGameState);
  return (
    <div className="QuitRestartModal__Wrapper">
      <p className="QuitRestartModal__Quit1">{props.children}</p>
      <p className="QuitRestartModal__Quit2">{props.children}</p>
      <div
        className="QuitRestartModal__YES"
        onClick={() => {
          props.dispatchGameState({
            type: props.dispatchType,
          });
        }}
      >
        <p className="QuitRestartModal__Text1">YES</p>
        <p className="QuitRestartModal__Text2">YES</p>
      </div>
      <div
        className="QuitRestartModal__NO"
        onClick={() => {
          props.dispatchGameState({
            type: "restartOrQuitOffAction",
          });
        }}
      >
        <p className="QuitRestartModal__Text1">NO</p>
        <p className="QuitRestartModal__Text2">NO</p>
      </div>
      {/* <div className="QuitRestartModal__TEXT">{props.children}</div> */}
    </div>
  );
};

export default QuitPrompt;
