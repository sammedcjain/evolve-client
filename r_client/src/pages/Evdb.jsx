import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NotAuth from "../components/NotAuth";
import LoadingPage from "../components/LoadingPage";
import Footer from "../components/Footer";

const Evdb = () => {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [data, setData] = useState({
    recent_vehicles: [],
    vehicle_data: [],
    user_count: 0,
  });
  const [AuthUser, setAuthUser] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
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

          const response = await axios.get(`${apiUrl}/evdb`, {
            headers,
          });

          setData(response.data);
          setAuthUser(true);
          setLoading(false);
          console.log(response.data);
        } else {
          console.error("Token not found");
          setAuthUser(false);
          setLoading(false);
          // Handle the case where the token is not available or not valid
        }
      } catch (error) {
        setAuthUser(false);
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on component mount

  if (AuthUser === true && Loading === false) {
    return (
      <>
        <meta charset="utf-8" />
        <title>EV Dekho</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        ></link>
        <link rel="stylesheet" href="/css-js/css/evdb.css" />
        <body>
          <header>
            <nav className="navbar navbar-expand-lg">
              <Link to="/" className="navbar-brand">
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
                    backgroundImage: `url("https://www.clipartmax.com/png/full/36-365828_navbar-toggle-icon-menu-hamburger-png-white.png")`,
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
                    <Link to="/requirements" className="nav-link">
                      Explore
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/calculator">
                      Calculate Savings
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/compare">
                      Compare
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/logout">
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </header>

          <h1 style={{ marginBottom: "35px" }}>EV Dekho</h1>

          <div className="container">
            <div className="row">
              <div class="col-md-4">
                <div class="card redirect">
                  <h2 class="card-title">Explore Electric Vehicles</h2>
                  <p class="card-description">
                    Discover a wide variety of electric vehicles along with it's
                    specifications like speed, range, power & more. Choose the
                    perfect electric vehicle that perfectly aligns with your
                    requirements and preferences.
                  </p>
                  <Link to="/requirements" class="card-link">
                    Explore
                  </Link>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card redirect">
                  <h2 class="card-title">Calculate Savings</h2>
                  <p class="card-description">
                    Calculate how much money you can save by shifting to an
                    electric vehicle. Estimate the cost savings on fuel and
                    maintenance. Additionally, calculate the reduction in carbon
                    emissions by using electric vehicles.
                  </p>
                  <Link to="/calculator" class="card-link">
                    Calculate
                  </Link>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card redirect">
                  <h2 class="card-title">Compare Electric Vehicles</h2>
                  <p class="card-description">
                    Compare various specifications of two or more electric
                    vehicles side by side and make an informed decision by
                    analyzing key features, performance, range, and more.
                  </p>
                  <br />
                  <Link to="/compare" class="card-link">
                    Compare
                  </Link>
                </div>
              </div>
            </div>
            {data.recent_vehicles.length !== 0 && (
              <React.Fragment>
                <h2 style={{ fontSize: "45px" }} className="history_heading">
                  Recently Viewed Vehicles
                </h2>
                <br />
                <div className="recent-container">
                  {data.recent_vehicles.map((item, index) => (
                    <div
                      className="recent"
                      style={{ height: "300px", textAlign: "center" }}
                      key={index}
                    >
                      <div style={{ verticalAlign: "center", height: "50%" }}>
                        <img
                          style={{
                            height: "100%",
                            maxWidth: "100%",
                            objectFit: "contain",
                            marginBottom: "10px",
                          }}
                          src={data.vehicle_data[index].main_photo}
                          alt=""
                        />
                      </div>
                      <div style={{ marginTop: "30px", textAlign: "center" }}>
                        <p className="recent_p">{item}</p>
                        <Link
                          style={{ marginBottom: "5px", color: "black" }}
                          to="/requirements"
                        >
                          More...
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </React.Fragment>
            )}
            {data.user_count > 0 && (
              <div style={{ marginBottom: "20px" }} className="users_count">
                <h2 style={{ fontSize: "45px" }} className="history_heading">
                  Total No. of Users = {data.user_count}
                </h2>
              </div>
            )}
          </div>
          <Footer />
        </body>
      </>
    );
  } else if (Loading === false && AuthUser === false) {
    return <NotAuth />;
  } else if (Loading === true) {
    return <LoadingPage />;
  }
};

export default Evdb;
