import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import NotAuth from "../components/NotAuth";
import LoadingPage from "../components/LoadingPage";
import Footer from "../components/Footer";
import { IoCaretBackCircle } from "react-icons/io5";

function Dbtable() {
  const location = useLocation();
  const [evdb, setEvdb] = useState([]);
  useEffect(() => {
    if (location.state?.id) {
      setEvdb(location.state.id);
    }
  }, [location.state?.id]);
  if (location.state?.id) {
    if (evdb.length > 0) {
      return (
        <>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
          ></link>
          <link rel="stylesheet" href="./css-js/css/dbtable0.css" />
          <header>
            <nav className="navbar navbar-expand-lg">
              <a className="navbar-brand" href="/">
                EV Dekho
              </a>
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
                    <a className="nav-link" href="/evdb">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/calculator">
                      Calculate Savings
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/compare">
                      Compare
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/logout">
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </header>

          <h1>Ev Dekho</h1>
          <h2>Vehicles as per your requirements :</h2>
          <div className="card-container">
            {evdb.map((item, index) => (
              <div
                className="card"
                style={{ height: "480px", textAlign: "center" }}
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
                    src={item.main_photo}
                    alt=""
                  />
                </div>
                <div style={{ textAlign: "center" }}>
                  <p>Company: {item.company}</p>
                  <p>Vehicle: {item.vehicle}</p>
                  <p>Price: {item.price} Rs</p>
                  <p>Range: {item.range} Kms</p>
                  <p>Top Speed: {item.speed} Kmph</p>
                  <Link
                    style={{ color: "black" }}
                    to={`/vehicle_info/${item.vehicle}`}
                  >
                    More...
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <Footer />
          <script src="./js/dbcard.js" charset="utf-8"></script>
        </>
      );
    } else if (evdb.length === 0) {
      return (
        <>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
          ></link>
          <link rel="stylesheet" href="./css-js/css/dbtable0.css" />
          <header>
            <nav className="navbar navbar-expand-lg">
              <a className="navbar-brand" href="/">
                EV Dekho
              </a>
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
                    <a className="nav-link" href="/evdb">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/calculator">
                      Calculate Savings
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/compare">
                      Compare
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/logout">
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </header>

          <h2>There are no vehicles as per your requirements !!!</h2>
          <br />
          <h2>Please go back and select different requirements</h2>
          <div className="center_style">
            <Link className="goback" to="/requirements">
              <IoCaretBackCircle />
            </Link>
          </div>
        </>
      );
    }
  } else {
    return (
      <div>
        <h1>An error occured ! </h1>
        <Link to="/requirements">Please click here to go back</Link>
      </div>
    );
  }
}

export default Dbtable;
