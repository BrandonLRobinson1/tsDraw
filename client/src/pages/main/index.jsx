import React, { useEffect, useState } from "react";
import Card from "./Card";
import MainNav from "../navBar/MainNav";
import Loading from "../common/Loading";
import "./index.css";

const Main = () => {
  // TODO: make a reusable
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [filterByGlobal, setFilterByGlobal] = useState(false);

  useEffect(() => {
    // axios getDrawings
    setUserData([1, 1, 1, 1, 1]);
    setIsLoading(false);
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

  if (isLoading) return <Loading />;

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
      {displayData && displayData.length ? (
        <div className="cards">
          {userData.map((card, i) => (
            <Card />
          ))}
        </div>
      ) : (
        <div className="message-container">
          {filterByGlobal
            ? "Uh oh, there are no global drawings yet!"
            : "You haven't drawn anything yet, give it a try!"}
        </div>
      )}
    </>
  );
};

export default Main;
