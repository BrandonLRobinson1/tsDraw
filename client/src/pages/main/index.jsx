import React, { useEffect, useState } from "react";
import Card from "./Card";
import MainNav from "../navBar/MainNav";
import "./index.css";

const Main = () => {
  // TODO: make a reusable
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [filterByGlobal, setFilterByGlobal] = useState(false);

  useEffect(() => {
    // axios getDrawings
    setUserData([1, 1, 1, 1, 1]);
  }, []);

  let displayData = userData;
  console.log("displayData", displayData);

  if (filterByGlobal && displayData.length)
    displayData = displayData.filter(
      (drawingData) => drawingData.thing === true
    );

  const handleMyDrawingClick = () =>
    filterByGlobal ? setFilterByGlobal(false) : null;

  const handleGlobalDrawingClick = () =>
    !filterByGlobal ? setFilterByGlobal(true) : null;

  return (
    <>
      <MainNav sticky />
      <div className="main-filter-container">
        <button
          className={
            !filterByGlobal
              ? "main-filter-buttons-selected"
              : "main-filter-buttons"
          }
          type="button"
          onClick={handleMyDrawingClick}
        >
          My Drawings
        </button>
        <button
          className={
            filterByGlobal
              ? "main-filter-buttons-selected"
              : "main-filter-buttons"
          }
          type="button"
          onClick={handleGlobalDrawingClick}
        >
          Global Drawings
        </button>
      </div>
      {/* {displayData && displayData.length ? ( */}
      {userData && userData.length ? (
        <div className="cards">
          {userData.map((card, i) => (
            <Card />
          ))}
        </div>
      ) : (
        <div className="message-container">uh oh</div>
      )}
    </>
  );
};

export default Main;
