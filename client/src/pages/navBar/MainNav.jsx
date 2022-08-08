import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, Link } from 'react-router-dom';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { baseUrl } from '../../lib/static';
import './index.css';

const MainNav = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      axios.get(`${baseUrl}/logout`);
      document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      localStorage.clear();
      navigate('/');
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <nav className="navbar">
      <div className="navbar-logo-container">
        <FontAwesomeIcon size="lg" icon={solid('paintbrush')} />
      </div>
      <div className="navbar-content-container">
        <Link to="/create" className="navbar-button">
          Create
        </Link>
        <button
          type="button"
          onClick={() => logout()}
          className="navbar-button"
        >
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default MainNav;
