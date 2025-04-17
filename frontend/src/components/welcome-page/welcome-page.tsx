import React from "react";
import { useNavigate } from "react-router-dom";
import './welcome-page.css';

const WelcomePage: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/", {replace: true});
  };

  return (
    <div className="welcome-page-wrapper">
      <div className="welcome-page">
        <p className="paragraph-style">Welcome to the application.</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default WelcomePage;
