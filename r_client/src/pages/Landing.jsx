import React from "react";
import { Link } from "react-router-dom"; // Assuming you are using React Router for navigation
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogoutMessage from "../components/Logout_msg";

const Landing = () => {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [loggingOut, setLoggingOut] = useState(false);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const handleLogout = async () => {
    try {
      // Set loggingOut state to true to display LogoutMessage
      setLoggingOut(true);

      // Make a request to the backend logout route
      await axios.get(`${apiUrl}/logout`);

      // Clear the token from local storage
      localStorage.removeItem("token");

      // Set loggingOut to false after a brief delay (3 seconds in this case)
      setTimeout(() => {
        setLoggingOut(false);
        toast.success("Logout successful", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000, // Duration for which the toast will be shown (in milliseconds)
        });
      }, 3000); // Adjust the duration as needed
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed !", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000, // Duration for which the toast will be shown (in milliseconds)
      });

      // If logout fails, reset loggingOut state
      setLoggingOut(false);
    }
  };

  const [user, setUser] = useState(0);
  const [AuthUser, setAuthUser] = useState(false);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const loadScript = (src, callback) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;

      script.onload = callback;

      document.body.appendChild(script);
    };

    loadScript("/css-js/js/jquery.min.js", () => {
      loadScript("/css-js/js/popper.js", () => {
        loadScript("/css-js/js/bootstrap.min.js", () => {
          // All scripts are loaded
          setScriptsLoaded(true);
        });
      });
    });
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        console.log(token);
        if (token) {
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.get(`${apiUrl}/`, {
            headers,
          });

          if (response.data.user === 1) {
            setUser(1);
          }
          setAuthUser(true);
          setLoading(false);
          console.log(response.data);
        } else {
          console.error("Token not found");
          setUser(0);
          setAuthUser(false);
          setLoading(false);
        }
      } catch (error) {
        setAuthUser(false);
        setLoading(false);
        setUser(0);
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Callback function to update the user state
  const updateUser = (newValue) => {
    setUser(newValue);
  };

  if (loggingOut) {
    return <LogoutMessage onComplete={() => updateUser(0)} />;
  } else {
    return (
      <div>
        <style>
          {`
          body {
            overflow-x: hidden; /* Hide the horizontal scrollbar for the entire body */
          }

          /* For WebKit browsers (Chrome, Safari, newer versions of Opera) */
          ::-webkit-scrollbar {
            width: 8px;
          }

          ::-webkit-scrollbar-track {
            background-color: #000;
          }

          ::-webkit-scrollbar-thumb {
            background-color: grey;
            border-radius: 10px;
            
          }
          ::-webkit-scrollbar-corner {
            color: #000;
          }
          `}
        </style>
        <header>
          <ToastContainer />
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
          ></link>
          <link rel="stylesheet" href="./css-js/css/landing.css" />
          <nav className="navbar navbar-expand-lg">
            <Link className="navbar-brand" to="/">
              EV Dekho
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span
                style={{
                  color: "white",
                  backgroundImage:
                    'url("https://www.clipartmax.com/png/full/36-365828_navbar-toggle-icon-menu-hamburger-png-white.png")',
                }}
                className="navbar-toggler-icon"
              ></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul
                style={{ marginRight: "30px" }}
                className="navbar-nav ml-auto"
              >
                <li className="nav-item">
                  <Link className="nav-link" to="/evdb">
                    Home
                  </Link>
                </li>
                {user === 0 ? (
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                ) : (
                  <li className="nav-item">
                    <button
                      style={{ background: "transparent", border: 0 }}
                      className="nav-link"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                )}
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin_login">
                    Admin
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>

        <main>
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-ride="carousel"
          >
            <ol className="carousel-indicators">
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="0"
                className="active"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="1"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="2"
              ></li>
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <h1 className="main_heading">EV Dekho</h1>
              </div>
              <div className="carousel-item">
                <h1 className="inside_heading">
                  Take a ride into the future with EV Dekho!
                </h1>
              </div>
              <div className="carousel-item">
                <h1 className="inside_heading">
                  Explore Compare & Save <br />
                  with Electric Vehicles
                </h1>
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </div>

          <section id="features">
            <div className="container">
              <h2 style={{ color: "lightgreen" }} className="text-center mb-5">
                Features
              </h2>
              <div className="row">
                <div className="col-md-4 mb-5">
                  <div className="card card_width">
                    <div className="card-body">
                      <h3 className="card-title">Explore Electric Vehicles</h3>
                      <div>
                        <p className="card-text">
                          Browse through the latest electric vehicles and get
                          detailed specifications including range, charging
                          time, and more...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-5">
                  <div className="card card_width">
                    <div className="card-body">
                      <h3 className="card-title">Compare Electric Vehicles</h3>
                      <p className="card-text">
                        Compare the specifications of different electric
                        vehicles side-by-side to make an informed decision about
                        which one is right for you.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-5">
                  <div className="card card_width">
                    <div className="card-body">
                      <h3 className="card-title">Calculate Your Savings</h3>
                      <p className="card-text">
                        Use our comprehensive calculator to estimate how much
                        money you could save by switching to an electric
                        vehicle.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {user === 0 && (
            <section
              className="module-small free-trial"
              style={{
                textAlign: "center",
                margin: "auto",
                paddingBottom: "50px",
              }}
            >
              <div
                className="container text-center"
                style={{ marginTop: "70px" }}
              />
              <div className="row">
                <div className="col-sm-12 col-sm-offset-0">
                  <h2 className="font-alt">
                    Login To your account &<br />
                    <span className="color-green">
                      start managing your expenses
                    </span>{" "}
                  </h2>
                </div>
              </div>
              <div>
                <a
                  className="btn btn-lg btn-warning btn-circle"
                  href="/login"
                  style={{ color: "black" }}
                >
                  Login
                </a>
              </div>

              {/* Register section */}
              <div
                className="container text-center"
                style={{ marginTop: "70px" }}
              >
                <div className="row">
                  <div className="col-sm-12 col-sm-offset-0">
                    <h2 className="font-alt">
                      Do not have an account yet?
                      <br />
                      <span className="color-green">
                        Click the register button
                        <br /> to get started
                      </span>{" "}
                    </h2>
                  </div>
                </div>
                <div>
                  <a
                    className="btn btn-lg btn-warning btn-circle"
                    href="/register"
                    style={{ color: "black" }}
                  >
                    Register
                  </a>
                </div>
              </div>
            </section>
          )}
        </main>

        <footer id="footer">
          <Footer />
        </footer>
      </div>
    );
  }
};
export default Landing;
