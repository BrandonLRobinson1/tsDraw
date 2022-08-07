import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import "./index.css";

// TODO:
/* eslint-disable */
const Card = ({ isGlobal, onDelete, imageUrl, creationData, userEmail }) => (
  <div className="card">
    <div className="card-container">
      <div className="delete-icon">
        <FontAwesomeIcon size="lg" icon={solid("user-secret")} />
      </div>
      <img
        src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        alt="las vegas"
      />
    </div>
    <div className="details">
      <h3>Las Vegas</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
        dignissimos, minus aperiam adipisci exercitationem.
      </p>
      <h3>Las Vegas</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
        dignissimos, minus aperiam adipisci exercitationem.
      </p>
      <h3>Las Vegas</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
        dignissimos, minus aperiam adipisci exercitationem.
      </p>
      <h3>Las Vegas</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
        dignissimos, minus aperiam adipisci exercitationem.
      </p>
    </div>
  </div>
);

export default Card;
