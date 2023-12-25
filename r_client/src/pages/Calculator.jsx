import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Vehicle from "./Vehicle.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Calculator() {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const navigate = useNavigate();
  const [key, setKey] = useState(0);
  const hide = () => {
    document.getElementById("hide").classList.add("hidden");
    document.getElementById("e-consumption").required = false;
    document.getElementById("range").required = false;
  };

  const nothidden = () => {
    toast.info(
      "Please enter your vehicle's range and electricity consumption manually in the form below ->",
      {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 6000, // Duration for which the toast will be shown (in milliseconds)
      }
    );
    document.getElementById("hide").classList.remove("hidden");
    document.getElementById("key").value = "1";
    setKey(1);
    document.getElementById("e-consumption").required = true;
    document.getElementById("range").required = true;
  };

  const carbon = () => {
    const vehicle =
      document.getElementById("vehicle_type").value === "Petrol"
        ? "Petrol"
        : "Diesel";
    console.log(vehicle);

    const elements = document.getElementsByClassName("PorD");
    for (let i = 0; i < elements.length; i++) {
      elements[i].innerHTML = vehicle;
    }
  };

  const [vehicleType, setVehicleType] = useState("");
  const [Ev, setEV] = useState();
  const [kms, setKms] = useState();
  const [milage, setMilage] = useState();
  const [price, setPrice] = useState();
  const [service, setService] = useState();
  const [consumption, setConsumption] = useState();
  const [range, setRange] = useState();
  const [Charges, setCharges] = useState();
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  async function handleCalculate(e) {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/calculatorres`, {
        charges: Charges,
        range: range,
        consumption: consumption,
        service: service,
        petrol: price,
        milage: milage,
        distance: kms,
        vehicle_type: vehicleType,
        key: key,
      });
      const { evdb_specific } = response.data;
      navigate("/calculatorres", { state: { id: response.data } });
      //console.log(evdb_specific);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  }
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
  }, []);
  return (
    <div>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        />
        <link rel="stylesheet" href="./css-js/css/calculator.css" />
        <title>Calculator</title>
      </head>
      <body>
        <ToastContainer />
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
        <h1>Calculate your savings!</h1>
        <form className="cal" onSubmit={handleCalculate} method="post">
          <div className="section">
            <span>
              <label>
                Please select the type of vehicle which you have currently =
              </label>
              <select
                onChange={(e) => {
                  setVehicleType(e.target.value);
                  carbon();
                }}
                name="vehicle_type"
                value={vehicleType}
                id="vehicle_type"
                required
              >
                <option value="" selected disabled hidden>
                  Choose here
                </option>
                <option id="petrol_vehicle" value="Petrol">
                  Petrol Vehicle
                </option>
                <option id="diesel_vehicle" value="Diesel">
                  Diesel Vehicle
                </option>
              </select>
            </span>

            <label>Select your EV =</label>
            <select
              style={{ marginBottom: "15px" }}
              name="ev"
              id="ev"
              value={Ev}
              onChange={(e) => {
                setEV(e.target.value);
                hide();
              }}
            >
              <option value="" hidden selected disabled>
                Select
              </option>
              <option value="volvo">Ola</option>
              <option value="Ather">Ather</option>
              <option value="SimpleOne">SimpleOne</option>
            </select>
            <br />
            <button
              style={{ marginBottom: "25px" }}
              type="button"
              onClick={nothidden}
              name="button"
            >
              Please click here if your EV is not in the list
            </button>

            <input hidden type="number" name="key" id="key" />
            <label htmlFor="distance">
              How many kms do you travel everyday ?
            </label>
            <input
              required
              type="number"
              name="distance"
              id="distance"
              placeholder="20 kms"
              value={kms}
              onChange={(e) => {
                setKms(parseInt(e.target.value, 10));
              }}
            />
            <br />
          </div>
          <div className="section">
            <h2 style={{ marginTop: "10px" }}>
              For your <span className="PorD">Petrol/Diesel</span> Vehicle
            </h2>
            <label htmlFor="milage">
              Your <span className="PorD">Petrol/Diesel</span> vehicle's milage
              ?
            </label>
            <input
              required
              type="number"
              id="milage"
              name="milage"
              placeholder="50 kms"
              value={milage}
              onChange={(e) => {
                setMilage(parseInt(e.target.value, 10));
              }}
            />
            <br />
            <label htmlFor="petrol">
              Enter the <span className="PorD">Petrol/Diesel</span> price in
              your area =
            </label>
            <input
              required
              type="number"
              id="petrol"
              name="petrol"
              placeholder="100Rs"
              value={price}
              onChange={(e) => {
                setPrice(parseInt(e.target.value, 10));
              }}
            />
            <br />
            <label htmlFor="service-p">
              Service charges / year for{" "}
              <span className="PorD">Petrol/Diesel</span> vehicle =
            </label>
            <input
              required
              type="number"
              id="service-p"
              name="service"
              placeholder="2000Rs"
              value={service}
              onChange={(e) => {
                setService(parseInt(e.target.value, 10));
              }}
            />
            <br />
          </div>

          <div className="section">
            <h2 style={{ marginTop: "15px" }}>For EV =</h2>

            <div id="hide">
              <label htmlFor="e-consumption">
                Electricity consumption of your EV vehicle per charge =
              </label>
              <input
                type="number"
                id="e-consumption"
                name="consumption"
                placeholder="3Kw"
                value={consumption}
                onChange={(e) => {
                  setConsumption(parseInt(e.target.value, 10));
                }}
              />
              <br />

              <label htmlFor="range">Range for your EV :</label>
              <input
                type="number"
                name="range"
                id="range"
                placeholder="100 Kms"
                value={range}
                onChange={(e) => {
                  setRange(parseInt(e.target.value, 10));
                }}
              />
              <br />
            </div>

            <label htmlFor="e-charges">
              Electricity charges per Kw in your city =
            </label>
            <input
              required
              id="e-charges"
              type="number"
              name="charges"
              placeholder="7Rs"
              value={Charges}
              onChange={(e) => {
                setCharges(parseInt(e.target.value, 10));
              }}
            />
            <br />

            <button style={{ width: "100%" }} type="submit" name="Calculate">
              Calculate
            </button>
          </div>
        </form>
        <p style={{ textAlign: "center", color: "lightgreen" }}>
          * Placeholder values are only for your reference. Kindly fill all the
          inputs :)
        </p>
        <footer id="footer">
          <div className="container">
            <Footer />
          </div>
        </footer>
        <script
          src="./css-js/js/cal.js"
          type="text/javascript"
          charSet="utf-8"
        ></script>
        <script
          src="https://kit.fontawesome.com/1465e7da9e.js"
          crossOrigin="anonymous"
        ></script>
      </body>
    </div>
  );
}

export default Calculator;
