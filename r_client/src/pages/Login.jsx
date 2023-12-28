import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading_msg from "../components/LoadingPage";

const Login = () => {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const messages = "";
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

  async function f_onsubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await axios
        .post(`${apiUrl}/login`, {
          username: username,
          password: password,
        })
        .then((res) => {
          setLoading(false);
          const { token, redirectUrl } = res.data;
          // Store the token in local storage
          localStorage.setItem("token", token);

          if (redirectUrl) {
            navigate(redirectUrl);
          } else {
            toast.error("Error Occured", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 3000, // Duration for which the toast will be shown (in milliseconds)
            });
          }
        });
    } catch (e) {
      setLoading(false);
      console.log(e);
      toast.error(e.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Duration for which the toast will be shown (in milliseconds)
      });
    }
  }

  if (Loading === true) {
    return <Loading_msg />;
  } else {
    return (
      <>
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
          
        `}
        </style>
        <link rel="stylesheet" href="./css-js/css/auth.css" />
        <ToastContainer />
        <Link to="/">
          <IoArrowBackCircleSharp size={50} color="#90ee90" />
        </Link>
        <h1>EV DEKHO</h1>
        <h2>Login to continue:</h2>
        <a href="/" style={{ marginTop: "15px", backgroundColor: "black" }}>
          <i
            className="fa-solid fa-arrow-left fa-2xl"
            style={{ paddingLeft: "500px", color: "#4CAF50" }}
          ></i>
        </a>
        {/* action="/login" */}
        <form onSubmit={f_onsubmit} className="ev_auth" method="post">
          {messages.error && messages.error.length > 0 && (
            <div
              className="alert alert-danger"
              role="alert"
              style={{ textAlign: "center" }}
            >
              {messages.error[0]}
            </div>
          )}
          Username :
          <input
            onChange={f_onchange}
            type="text"
            name="username"
            value={username}
            required
          />{" "}
          <br /> <br />
          Password :
          <input
            onChange={f_passchange}
            type="password"
            name="password"
            value={password}
            required
          />{" "}
          <br /> <br />
          <button type="submit" name="ev-auth" value="ev-auth">
            Submit
          </button>
          {/* <a
          style={{ marginTop: "20px" }}
          className="btn btn-block btn-social btn-google"
          href="/auth/google"
          role="button"
        >
          <i className="fab fa-google"></i>
          Sign Up with Google
        </a> */}
        </form>

        <script
          src="https://kit.fontawesome.com/1465e7da9e.js"
          crossOrigin="anonymous"
        ></script>
      </>
    );
  }
};
export default Login;
