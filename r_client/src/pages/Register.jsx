import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading_msg from "../components/LoadingPage";

const Register = () => {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const f_onchange = (e) => {
    setUsername(e.target.value);
  };

  const f_passchange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios
        .post(`${apiUrl}/register`, {
          username,
          password,
        })
        .then((res) => {
          setLoading(false);
          if (res.data.error) {
            toast.error(res.data.error, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 3000, // Duration for which the toast will be shown (in milliseconds)
            });
          } else {
            const { token, redirectUrl } = res.data;
            localStorage.setItem("token", token);
            navigate(redirectUrl);
          }
        });
    } catch (error) {
      setLoading(false);
      console.error("Registration error:", error);
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Duration for which the toast will be shown (in milliseconds)
      });
    }
  };
  if (Loading === true) {
    return <Loading_msg />;
  } else {
    return (
      <div>
        <style media="screen">
          {`
      .btn-social {
  color: #fff;
  text-align: center;
  vertical-align: middle;
  display: inline-block;
  position: relative;
  overflow: hidden;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  text-decoration: none;
}

.btn-social:hover,
.btn-social:focus {
  color: #fff;
  text-decoration: none;
}

.btn-google {
  background-color: #dd4b39;
  border-color: #dd4b39;
}

.btn-google:hover,
.btn-google:focus {
  background-color: #c23321;
  border-color: #c23321;
}
/* Style for the flash error message */
.flash.flash-error {
  background-color: #f44336; /* Red background color */
  color: #fff; /* White text color */
  padding: 10px 20px;
  border-radius: 4px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Optional: Add transition for smoother appearance */
.flash.flash-error {
  transition: opacity 0.3s ease-in-out;
}

/* Hover effect: darken the background color a bit on hover */
.flash.flash-error:hover {
  background-color: #d32f2f;
`}
        </style>
        <link rel="stylesheet" href="./css-js/css/auth.css" />
        <ToastContainer />
        <Link to="/">
          <IoArrowBackCircleSharp size={50} color="#90ee90" />
        </Link>
        <h1>EV DEKHO</h1>
        <h2>Register to continue:</h2>
        <a href="/" style={{ marginTop: "15px", backgroundColor: "black" }}>
          <i
            className="fas fa-arrow-left fa-2x"
            style={{ paddingLeft: "500px", color: "#4CAF50" }}
          ></i>
        </a>
        <form onSubmit={handleRegister} className="ev_auth" method="post">
          <label>Username :</label>
          <input
            onChange={f_onchange}
            type="text"
            name="username"
            value={username}
            required
          />
          <br />
          <br />
          <label>Password :</label>
          <input
            onChange={f_passchange}
            type="password"
            name="password"
            value={password}
            required
          />
          <br />
          <br />
          <button type="submit" name="ev-auth" value="ev-auth">
            Submit
          </button>
        </form>
      </div>
    );
  }
};
export default Register;
