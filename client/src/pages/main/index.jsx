import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import MainNav from '../navBar/MainNav';
import Loading from '../common/Loading';
import { baseUrl } from '../../lib/static';
import './index.css';

const Main = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [allDrawings, setAllDrawings] = useState([]);
  const [myDrawings, setMyDrawings] = useState([]);
  const [filterByGlobal, setFilterByGlobal] = useState(false);

  const token = JSON.parse(localStorage.getItem('tsToken'));

  const axiosTokenConfig = {
    headers: {
      'Content-Type': 'application/JSON',
      authorization: `Bearer ${token}`,
    },
    timeout: 4000,
  };

  const getMyDrawings = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/myDrawings`,
        axiosTokenConfig,
      );
      setMyDrawings(response.data);
    } catch (e) {
      const { response } = e;
      setIsLoading(false);

      if (response.status === 500) {
        toast.error('Cannot reach server');
      }
      if (response.status === 403) {
        toast.info('Please sign in.');
        navigate('/');
      }
      toast.error(response.data.message);
    }
  };

  const getAllDrawings = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/allDrawings`,
        axiosTokenConfig,
      );
      setAllDrawings(response.data);
      setIsLoading(false);
    } catch (e) {
      const { response } = e;
      setIsLoading(false);

      if (response.status === 500) {
        toast.error('Cannot reach server');
      }
      toast.error(response.data.message);
    }
  };

  const deleteMyDrawing = async (id) => {
    try {
      setIsLoading(true);
      await axios.post(`${baseUrl}/deleteDrawing`, { id }, axiosTokenConfig);
      toast.success('Drawing deleted');
      await getMyDrawings();
      await getAllDrawings();
    } catch (e) {
      const { response } = e;
      setIsLoading(false);

      if (response.status === 500) {
        toast.error('Cannot reach server');
      }
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    getMyDrawings();
    getAllDrawings();
  }, []);

  const displayData = filterByGlobal ? allDrawings : myDrawings;

  const handleMyDrawingClick = () => (filterByGlobal ? setFilterByGlobal(false) : null);

  const handleGlobalDrawingClick = () => (!filterByGlobal ? setFilterByGlobal(true) : null);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <MainNav sticky />
      <div className="main-filter-container">
        <button
          className={
            !filterByGlobal
              ? 'main-filter-buttons-selected'
              : 'main-filter-buttons'
          }
          type="button"
          onClick={handleMyDrawingClick}
        >
          My Drawings
        </button>
        <button
          className={
            filterByGlobal
              ? 'main-filter-buttons-selected'
              : 'main-filter-buttons'
          }
          type="button"
          onClick={handleGlobalDrawingClick}
        >
          Global Drawings
        </button>
      </div>
      {displayData && displayData.length ? (
        <div className="cards">
          {displayData.map((card) => {
            const {
              url, createTime, creationDate, timeToCreate, email, _id,
            } = card;
            return (
              <Card
                key={_id}
                isGlobal={filterByGlobal}
                id={_id}
                onDelete={deleteMyDrawing}
                imageUrl={url}
                creationDate={creationDate}
                createTime={createTime}
                email={email}
                timeToCreate={timeToCreate}
              />
            );
          })}
        </div>
      ) : (
        <div className="message-container">
          {filterByGlobal
            ? 'Uh oh, there are no global drawings yet!'
            : "You haven't drawn anything yet, give it a try!"}
        </div>
      )}
    </>
  );
};

export default Main;
