import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import './index.css';

const Card = ({
  isGlobal,
  onDelete,
  imageUrl,
  createTime,
  email,
  creationDate,
  timeToCreate,
  id,
}) => (
  <div className="card">
    <div className="card-container">
      {!isGlobal && (
      <button type="button" className="delete-icon" onClick={() => onDelete(id)}>
        <FontAwesomeIcon size="lg" icon={solid('trash')} />
      </button>
      )}
      <img src={imageUrl} alt="" />
    </div>
    <div className="details">
      <h4>Email</h4>
      <p>{email}</p>
      <h4>Creation Date</h4>
      <p>{creationDate}</p>
      <h4>Time of creation</h4>
      <p>{`${createTime} EST - massage`}</p>

      <h4>Total Create Time</h4>
      <p>{`${timeToCreate} minutes - massage`}</p>
    </div>
  </div>
);

export default Card;
