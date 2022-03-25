import React from "react";
import "../style/QuitRestartModal.css";

import { ReactComponent as YesIconSVG } from "../resources/icons/yesIcon.svg";
import { ReactComponent as NoIconSVG } from "../resources/icons/noIcon.svg";

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
        <YesIconSVG className="QuitRestartModal__Icon" />
      </div>
      <div
        className="QuitRestartModal__NO"
        onClick={() => {
          props.dispatchGameState({
            type: "restartOrQuitOffAction",
          });
        }}
      >
        <NoIconSVG className="QuitRestartModal__Icon" />
      </div>
      {/* <div className="QuitRestartModal__TEXT">{props.children}</div> */}
    </div>
  );
};

export default QuitPrompt;
