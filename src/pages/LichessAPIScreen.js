import React, { useEffect, useState } from "react";
import "../style/LichessAPIScreen.css";
import BackIconSVG from "../components/backIconSVG";
import useWindowDimensions from "../hooks/useWindowDimensions";

const LichessAPIScreen = (props) => {
  const { height, width } = useWindowDimensions();

  const [isLoading, setIsLoading] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [error, setError] = useState(false);
  const [typeOfError, setTypeOfError] = useState("");

  const [userInfo, setUserInfo] = useState();
  const [searchBarUsernameValue, setSearchBarUsernameValue] = useState("");

  const searchBarValueHandler = (e) => {
    setError(false);
    setSearchBarUsernameValue(e.target.value);
  };

  /* useEffect(() => {
    return () => {
      setUserInfo();
    };
  }, []); */

  const loadPlayerInfoHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoadingComplete(false);
    setError(false);
    try {
      const response = await fetch(
        `https://lichess.org/api/user/${searchBarUsernameValue}`
      );
      const data = await response.json();
      console.log(data);

      if (data.disabled !== true) {
        setUserInfo(data);
        setLoadingComplete(true);
      }
      if (data.disabled == true) {
        setError(true);
        setTypeOfError("This account is disabled!");
      }
    } catch (error) {
      console.log("not working");
      console.log(userInfo);
      console.log(error);
      setError(true);
      setTypeOfError("Could not find this player!");

      setLoadingComplete(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="LichessAPIScreen__titleWrapper"
      style={{ height: height, width: width }}
    >
      <div className="Logo" />

      <form
        className="LichessAPIScreen__mainGridWrapper"
        onSubmit={loadPlayerInfoHandler}
      >
        <BackIconSVG
          className="EditScreen__BackButton"
          onClick={props.handlers.titleScreenHandler}
        />
        <p className="LichessAPIScreen__inputText">PROFILE NAME</p>
        <input
          className="LichessAPIScreen__nameInput"
          type="text"
          value={searchBarUsernameValue}
          onChange={searchBarValueHandler}
        ></input>

        <button type="submit" className="LichessAPIScreen__searchButton">
          SEARCH
        </button>
        {isLoading && (
          <p className="LichessAPIScreen__fetchingDataText">Fetching data...</p>
        )}
        {loadingComplete && (
          <div className="LichessApiScreen__userRatingWrapper">
            <p>Rating:</p>
            <p>Blitz - {userInfo.perfs.blitz.rating}</p>
            <p>Rapid - {userInfo.perfs.rapid.rating}</p>
            <p>Bullet - {userInfo.perfs.bullet.rating}</p>
          </div>
        )}

        {error && (
          <p className="LichessAPIScreen__fetchingDataText">{typeOfError}</p>
        )}
      </form>
    </div>
  );
};

export default LichessAPIScreen;
