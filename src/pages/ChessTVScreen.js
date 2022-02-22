import React from "react";
import "../style/ChessTVScreen.css";

const ChessTV = (props) => {
  const source = "https://lichess.org/tv/frame?theme=brown&bg=dark";
  return (
    <div className="chessTVWrapper">
      <button
        className="ChessTVScreen__BackButton"
        onClick={props.handlers.titleScreenHandler}
      ></button>
      <iframe
        src={source}
        style={{ width: "100%", maxWidth: "400px", height: "444px" }}
        allowtransparency="true"
        frameborder="0"
      ></iframe>
    </div>
  );
};

export default ChessTV;
