import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Compare() {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const navigate = useNavigate();
  const [EV_names, setEvnames] = useState([]);
  const [AuthUser, setAuthUser] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [hideVehicle3, setHideVehicle3] = useState(true);

  async function handleSubmit(event) {
    event.preventDefault();
    if (check()) {
      const v1 = document.getElementById("vehicle1").value;
      const v2 = document.getElementById("vehicle2").value;
      const v3 = hideVehicle3 ? "" : document.getElementById("vehicle3").value;

      const actionUrl = `compare/${v1}/${v2}${hideVehicle3 ? "" : `/${v3}`}`;
      //   document.getElementById("compare-form").action = actionUrl;
      //   document.getElementById("compare-form").submit();
      console.log(actionUrl);
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        if (token) {
          const headers = {
            Authorization: `Bearer ${token}`,
          };
          const response = await axios.post(
            `${apiUrl}/${actionUrl}`,
            {},
            {
              headers,
            }
          );
          navigate("/compareres", { state: { id: response.data } });
          //console.log(response.data);
        } else {
          console.log("Token not available!!");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      }
    }
  }

  const check = () => {
    const index1 = document.getElementById("vehicle1").selectedIndex;
    const index2 = document.getElementById("vehicle2").selectedIndex;
    const index3 = document.getElementById("vehicle3").selectedIndex;

    if (index1 === index2 || index1 === index3 || index2 === index3) {
      alert("Please select different vehicles");
      return false;
    }
    return true;
  };

  const addv3 = () => {
    setHideVehicle3(false);
    document.getElementById("hide").classList.remove("hidden");
  };

  const removev3 = () => {
    setHideVehicle3(true);
    document.getElementById("hide").classList.add("hidden");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        console.log(token);
        if (token) {
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.get(`${apiUrl}/compare`, {
            headers,
          });

          setEvnames(response.data);
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

  return (
    <html lang="en" dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <title>EV Dekho</title>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        />
        <link rel="stylesheet" href="./css-js/css/compare.css" />
      </head>
      <body>
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
                  <a className="nav-link" href="/evdb">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/requirements">
                    Explore
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/calculator">
                    Calculate Savings
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

        <h1 style={{ fontSize: "60px" }}>Compare :</h1>
        <form onSubmit={handleSubmit} id="compare-form" method="post">
          <h2> Vehicle 1 = </h2>
          <select name="compare" id="vehicle1">
            <option value="" disabled selected>
              Select an option
            </option>
            {/* Iterate over EV_names */}
            {EV_names.map((item) => (
              <option key={item.vehicle} value={item.vehicle} name="">
                {item.vehicle}
              </option>
            ))}
          </select>
          <br />
          <h3> Vs</h3>

          <h2> Vehicle 2 = </h2>
          <select name="compare" id="vehicle2">
            <option value="" disabled selected>
              Select an option
            </option>
            {/* Iterate over EV_names */}
            {EV_names.map((item) => (
              <option key={item.vehicle} value={item.vehicle} name="">
                {item.vehicle}
              </option>
            ))}
          </select>
          <br />
          <button
            className="hideit"
            onClick={addv3}
            type="button"
            name="button"
          >
            add one more vehicle
          </button>
          <br />
          <div id="hide" className="hidden">
            <h3> Vs</h3>
            <h2> Vehicle 3 = </h2>
            <select name="compare" id="vehicle3">
              <option value="" disabled selected>
                Select an option
              </option>
              {/* Iterate over EV_names */}
              {EV_names.map((item) => (
                <option key={item.vehicle} value={item.vehicle} name="">
                  {item.vehicle}
                </option>
              ))}
            </select>
            <br />
            <button onClick={removev3} type="button" name="button">
              remove 3rd vehicle
            </button>
          </div>

          <button type="submit" name="compare">
            Compare
          </button>
        </form>

        <Footer />
        <script
          src="https://kit.fontawesome.com/1465e7da9e.js"
          crossOrigin="anonymous"
        ></script>
        <script src="./js/comparision.js" charSet="utf-8"></script>
      </body>
    </html>
  );
}

export default Compare;
