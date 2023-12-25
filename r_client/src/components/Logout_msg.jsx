import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { PacmanLoader } from "react-spinners";

const LogoutMessage = ({ onComplete }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      // After 3 seconds, navigate to the landing page
      navigate("/");
      onComplete();
    }, 3000);

    // Clear the timer on component unmount
    return () => clearTimeout(timer);
  }, [navigate, onComplete]);

  return (
    <>
      <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

          body {
            background: black;
            font-family: 'Roboto', sans-serif;
            margin: 0;
          }
        .logout-message-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 90vh;
          background: black;
          color: #90ee90;
          text-align: center;
        }

        .loader {
          display: inline-block;
          margin-bottom: 10px;
          
        }

        .logout_text {
          font-size: 28px;
        }
      `}</style>

      <div className="logout-message-container">
        <PacmanLoader className="loader" color="#90ee90" size={60} />
        <h4 className="logout_text">You are being logged out...</h4>
      </div>
    </>
  );
};

export default LogoutMessage;
