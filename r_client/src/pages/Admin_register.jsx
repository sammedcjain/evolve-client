import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Admin_register = () => {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePass = (e) => {
    setPassword(e.target.value);
  };

  async function handlesubmit(e) {
    e.preventDefault();
    try {
      await axios
        .post(`${apiUrl}/admin_register`, {
          username: username,
          password: password,
        })
        .then((res) => {
          const { token, redirectUrl } = res.data;
          // Store the token in local storage
          localStorage.setItem("token", token);

          if (redirectUrl) {
            navigate(redirectUrl);
          } else {
            toast.error(res.data.error, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 3000, // Duration for which the toast will be shown (in milliseconds)
            });
          }
        });
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Duration for which the toast will be shown (in milliseconds)
      });
    }
  }
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <title>Admin Registration</title>
        <link rel="stylesheet" href="/css-js/css/auth.css" />
      </head>
      <body>
        <ToastContainer />
        <h1>Evolve 2.0</h1>
        <h2>@TonyDeCost has invited you to register as ADMIN:</h2>
        <form className="ev_auth" onSubmit={handlesubmit} method="post">
          <label>
            Username:
            <input type="text" name="username" onChange={handleUsername} />
          </label>
          <br />
          <br />
          <label>
            Password:
            <input type="password" name="password" onChange={handlePass} />
          </label>
          <br />
          <br />
          <p>
            Already have an admin account? <a href="/">Click here</a> to login
          </p>
          <button type="submit" name="ev-auth" value="ev-auth">
            Submit
          </button>
        </form>
      </body>
    </html>
  );
};

export default Admin_register;
