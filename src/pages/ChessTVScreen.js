import React, { useState } from "react";
import "../style/ChessTVScreen.css";

const ChessTV = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const source = "https://lichess.org/tv/frame?theme=brown&bg=dark";

  return (
    <div className="ChessTVScreen__Wrapper">
      <button
        className="ChessTVScreen__BackButton"
        onClick={props.handlers.titleScreenHandler}
      ></button>
      {isLoading && <h1>Loading...</h1>}
      <iframe
        src={source}
        style={{ width: "100%", maxWidth: "400px", height: "444px" }}
        onLoad={() => {
          setIsLoading(false);
        }}
        allowtransparency="true"
        frameborder="0"
      ></iframe>
    </div>
  );
};

export default ChessTV;
