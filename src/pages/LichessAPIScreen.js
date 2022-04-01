import React, { useEffect, useState } from "react";
import "../style/LichessAPIScreen.css";

const LichessAPIScreen = () => {
  useEffect(() => {
    fetch("https://lichess.org/api/user/Aerospark/rating-history")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  }, []);

  return (
    <div className="LichessAPIScreen__titleWrapper">
      <div className="LichessAPIScreen__mainGridWrapper"></div>
    </div>
  );
};

export default LichessAPIScreen;
