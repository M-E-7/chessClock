import React, { useState } from "react";
import "../style/ChessTVScreen.css";
import BackIconSVG from "../components/backIconSVG";

const ChessTV = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const source = "https://lichess.org/tv/frame?theme=brown&bg=dark";

  return (
    <div className="ChessTVScreen__Wrapper">
      <div className="ChessTVScreen__InnerWrapper">
        <BackIconSVG
          className="ChessTVScreen__BackButton"
          onClick={props.handlers.titleScreenHandler}
        />
        {isLoading && (
          <h1 className="ChessTVScreen__LoadingText">Loading...</h1>
        )}
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
    </div>
  );
};

export default ChessTV;
