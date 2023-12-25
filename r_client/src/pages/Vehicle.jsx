import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

function Vehicle() {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const { vehicle } = useParams();
  console.log(vehicle);
  const [evInfo, setEvinfo] = useState([]);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  useEffect(() => {
    const loadScripts = () => {
      const loadScript = (src, callback) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;

        script.onload = callback; // Callback to execute when the script is loaded

        document.body.appendChild(script);
      };

      // Load scripts sequentially

      loadScript("/css-js/js/jquery.min.js", () => {
        loadScript("/css-js/js/popper.js", () => {
          loadScript("/css-js/js/bootstrap.min.js", () => {
            loadScript("/css-js/js/owl.carousel.min.js", () => {
              loadScript("/css-js/js/main.js", () => {
                // All scripts are loaded
                setScriptsLoaded(true);
              });
            });
          });
        });
      });
    };

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const headers = {
            Authorization: `Bearer ${token}`,
          };
          const response = await axios.get(
            `${apiUrl}/vehicle_info/${vehicle}`,
            {
              headers,
            }
          );
          if (response.data) {
            setEvinfo(response.data);
            console.log(response.data);
            loadScripts();
          } else {
            toast.error("Something went wrogn !", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 3000, // Duration for which the toast will be shown (in milliseconds)
            });
          }
        } else {
          console.error("Token not found");
          toast.error("Not authorized", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000, // Duration for which the toast will be shown (in milliseconds)
          });
        }
      } catch (error) {
        toast.error("Something went wrogn", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000, // Duration for which the toast will be shown (in milliseconds)
        });
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
      />
      <link rel="stylesheet" href="/css-js/css/own1.css" />
      <link rel="stylesheet" href="/css-js/css/own2_theme.css" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/4.5.6/css/ionicons.min.css"
      ></link>
      <link rel="stylesheet" href="/css-js/css/style.css" />
      <link rel="stylesheet" href="/css-js/css/custom_vehicle.css" />
      <header>
        <ToastContainer />
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
            <ul style={{ marginRight: "30px" }} className="navbar-nav ml-auto">
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
                <Link className="nav-link" to="/logout">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {evInfo.map((item, index) => (
        <div key={index}>
          <h1 style={{ textAlign: "center", color: "lightgreen" }}>
            Company: {item.company} <br />
            Vehicle: {item.vehicle}
          </h1>

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
                <img
                  className="d-block  carousel-image"
                  src={item.main_photo}
                  alt="First slide"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block  carousel-image"
                  src={item.photo1}
                  alt="Second slide"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block  carousel-image"
                  src={item.photo2}
                  alt="Third slide"
                />
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
          <details>
            <summary>Vehicle Summary:</summary>
            <ul>
              <li>Range : {item.range} Km/charge</li>
              <li>Battery Capacity : {item.Battery_capacity} kWh</li>
              <li>Battery charging time = {item.Battery_charging_time} Hrs</li>
              <li>Top Speed = {item.speed.toLocaleString()} Kmph </li>
              {item.Acceleration_0_to_60 && (
                <li>
                  Acceleration (0-60 kmph) ={" "}
                  {item.Acceleration_0_to_60.toLocaleString()} secs
                </li>
              )}
              {item.Kerb_Weight && (
                <li>Kerb Weight = {item.Kerb_Weight.toLocaleString()} kg</li>
              )}
              <li>Motor Power = {item.Max_Power.toLocaleString()} W </li>
              <li>Motor = {item.Motor_type} </li>
            </ul>
          </details>
          <details>
            <summary>Power & Performance</summary>
            <ul>
              <li>Max Power: {item.Max_Power.toLocaleString()} W</li>
              <li>Rated Power: {item.Rated_Power.toLocaleString()} W</li>
              <li>Max Torque: {item.Max_Torque.toLocaleString()} Nm</li>
              <li>
                Battery capacity: {item.Battery_capacity.toLocaleString()} kWh
              </li>
              <li>Battery type: {item.Battery_type}</li>
              <li>No. of Batteries: {item.No_of_Batteries}</li>
              <li>Riding Range: {item.range.toLocaleString()} Km / charge</li>
              <li>Top Speed: {item.speed.toLocaleString()} Kmph</li>
              <li>
                Acceleration(0-60): {item.Acceleration_0_to_60.toLocaleString()}{" "}
                secs
              </li>
              <li>
                Battery charging time:{" "}
                {item.Battery_charging_time.toLocaleString()} Hrs
              </li>
              <li>Fast charging time: {item.Fast_charging}</li>
              <li>Riding Modes: {item.Riding_Modes}</li>
              <li>Transmission: {item.Transmission}</li>
              <li>Motor type: {item.Motor_type}</li>
              <li>Portable Battery: {item.Portable_Battery}</li>
              <li>Swappable Battery: {item.Swappable_Battery}</li>
              <li>Charger Type: {item.Charger_Type}</li>
              <li>
                Carrying capacity: {item.Carrying_capacity.toLocaleString()} kg
              </li>
            </ul>
          </details>
          <details>
            <summary>Height, Weight, Length</summary>
            <ul>
              <li>Overall Width: {item.Overall_Width.toLocaleString()} mm</li>
              <li>Overall Height: {item.Overall_Height.toLocaleString()} mm</li>
              <li>Kerb Weight: {item.Kerb_Weight.toLocaleString()} kg</li>
            </ul>
          </details>
          <details>
            <summary>Manufacturer Warranty</summary>
            <ul>
              <li>Battery warranty: {item.Battery_warranty}</li>
              <li>Motor warranty: {item.Motor_warranty}</li>
            </ul>
          </details>
          <details>
            <summary>Other Features</summary>
            <ul>
              <li>Connectivity: {item.Connectivity}</li>
              <li>Navigation: {item.Navigation}</li>
              <li>Operating System: {item.Operating_System}</li>
              <li>Processor: {item.Processor}</li>
              <li>Mobile Application: {item.Mobile_Application}</li>
              <li>
                Other features:{" "}
                <a style={{ color: "lightblue" }} href={item.company_link}>
                  More Features...
                </a>
              </li>
              <li>Colors: {item.colors}</li>
            </ul>
          </details>
          <details>
            <summary>Reviews</summary>
            <ul dangerouslySetInnerHTML={{ __html: item.reviews }} />
          </details>
          <div style={{ textAlign: "center" }}>
            <a href={item.company_link}>
              <button style={{ marginBottom: "50px", width: "15%" }}>
                Buy Now
              </button>
            </a>
          </div>
        </div>
      ))}

      <Footer />
    </div>
  );
}

export default Vehicle;
