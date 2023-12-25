import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import $ from "jquery";

function Compareres() {
  const [vehicleData, setVehicledata] = useState([]);
  const location = useLocation();
  useEffect(() => {
    if (location.state?.id) {
      setVehicledata(location.state.id);
    }

    const handleFilterChange = function () {
      var t = $(this).find("option:selected").val().toLowerCase();

      $('[data-filter="target"]').css("display", "none");
      $("#" + t).css("display", "table-row-group");
      if (t === "all") {
        $('[data-filter="target"]').css("display", "table-row-group");
      }
      $(this).css("display", "block");
    };

    $('[data-filter="trigger"]').on("change", handleFilterChange);

    // Cleanup the event listener when the component is unmounted
    return () => {
      $('[data-filter="trigger"]').off("change", handleFilterChange);
    };
  }, [location.state?.id]);

  return (
    <body>
      <header>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />

        <link rel="stylesheet" href="./css-js/css/vehicle_com.css" />
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

      <div className="container pb-5 mb-2">
        <div className="comparison-table">
          <table className="table table-bordered">
            <thead className="bg-secondary">
              <tr>
                <td className="align-middle">
                  <select
                    className="form-control custom-select"
                    id="compare-criteria"
                    data-filter="trigger"
                  >
                    <option value="all">Comparison criteria *</option>
                    <option value="summary">Summary</option>
                    <option value="performance">Performance</option>
                    <option value="height">Height, Weight, Length</option>
                    <option value="warranty">Manufacturer Warranty</option>
                    <option value="features">Other Features</option>
                  </select>
                  <small className="form-text text-muted">
                    * Choose criteria to filter table below.
                  </small>
                  <div className="pt-3">{/* Additional content */}</div>
                </td>
                {vehicleData.map((item) => (
                  <td key={item.id}>
                    <div className="comparison-item">
                      <a
                        style={{ marginBottom: "0" }}
                        className="comparison-item-thumb"
                        href="/requirements"
                      >
                        <img src={item.main_photo} alt="vehicle" />
                      </a>
                      <a
                        style={{ marginBottom: "0" }}
                        className="comparison-item-title"
                        href="/requirements"
                      >
                        {item.vehicle}
                      </a>
                    </div>
                  </td>
                ))}
              </tr>
            </thead>
            <tbody id="summary" data-filter="target">
              <tr>
                <th>
                  <span className="text-dark font-weight-semibold">
                    Vehicle
                  </span>
                </th>
                {vehicleData.map((item) => (
                  <th key={item.id}>
                    <span className="text-dark font-weight-semibold">
                      {item.vehicle}
                    </span>
                  </th>
                ))}
              </tr>
              <tr>
                <td>Company</td>
                {vehicleData.map((item) => (
                  <td key={item.id}>{item.company}</td>
                ))}
              </tr>
              <tr>
                <td>Price</td>
                {vehicleData.map((item) => (
                  <td key={item.id}>{item.price}</td>
                ))}
              </tr>
            </tbody>
            <tbody id="performance" data-filter="target">
              <tr>
                <td>Max Power</td>
                {vehicleData.map((item) => (
                  <td key={item.id}>{item.Max_Power}</td>
                ))}
              </tr>
              <tr>
                <td>Rated Power</td>
                {vehicleData.map((item) => (
                  <td key={item.id}>{item.Rated_Power}</td>
                ))}
              </tr>
              <tr>
                <td>Max Torque</td>
                {vehicleData.map((item) => (
                  <td key={item.id}>{item.Max_Torque}</td>
                ))}
              </tr>
              <tr>
                <td>Battery Capacity</td>
                {vehicleData.map((item) => (
                  <td key={item.id}>{item.Battery_capacity}</td>
                ))}
              </tr>
              <tr>
                <td>Charge Consumption</td>
                {vehicleData.map((item) => (
                  <td key={item.id}>{item.charge_consumption}</td>
                ))}
              </tr>
              <tr>
                <td>Battery Type</td>
                {vehicleData.map((item) => (
                  <td key={item.id}>{item.Battery_type}</td>
                ))}
              </tr>
              <tr>
                <td>Number of Batteries</td>
                {vehicleData.map((item) => (
                  <td key={item.id}>{item.No_of_Batteries}</td>
                ))}
              </tr>
              <tr>
                <td>Range</td>
                {vehicleData.map((item) => (
                  <td key={item.id}>{item.range}</td>
                ))}
              </tr>
              <tr>
                <td>Speed</td>
                {vehicleData.map((item) => (
                  <td key={item.id}>{item.speed}</td>
                ))}
              </tr>
              <tr>
                <td>Acceleration 0 to 60</td>
                {vehicleData.map((item) => (
                  <td key={item.id}>{item.Acceleration_0_to_60}</td>
                ))}
              </tr>
              <tr>
                <td>Battery Charging Time</td>
                {vehicleData.map((item) => (
                  <td key={item.id}>{item.Battery_charging_time}</td>
                ))}
              </tr>
              <tr>
                <td>Fast Charging</td>
                {vehicleData.map((item) => (
                  <td key={item.id}>{item.Fast_charging}</td>
                ))}
              </tr>
              <tr>
                <td>Riding Modes</td>
                {vehicleData.map((item) => (
                  <td key={item.id}>{item.Riding_Modes}</td>
                ))}
              </tr>
              <tr>
                <td>Transmission</td>
                {vehicleData.map((item) => (
                  <td key={item.id}>{item.Transmission}</td>
                ))}
              </tr>
              <tr>
                <td>Motor Type</td>
                {vehicleData.map((item) => (
                  <td key={item.id}>{item.Motor_type}</td>
                ))}
              </tr>
              <tr>
                <td>Portable Battery</td>
                {vehicleData.map((item) => (
                  <td key={item.id}>{item.Portable_Battery}</td>
                ))}
              </tr>
              <tr>
                <td>Swappable Battery</td>
                {vehicleData.map((item) => (
                  <td key={item.id}>{item.Swappable_Battery}</td>
                ))}
              </tr>
              <tr>
                <td>Charger Type</td>
                {vehicleData.map((item) => (
                  <td key={item.id}>{item.Charger_Type}</td>
                ))}
              </tr>
              <tr>
                <td>Carrying Capacity</td>
                {vehicleData.map((item) => (
                  <td key={item.id}>{item.Carrying_capacity}</td>
                ))}
              </tr>
            </tbody>
            <tbody id="height" data-filter="target">
              <tr>
                <td>Overall Width (mm)</td>
                {vehicleData.map((item) => (
                  <td key={item.id}>{item.Overall_Width}</td>
                ))}
              </tr>
              <tr>
                <td>Overall Height (mm)</td>
                {vehicleData.map((item) => (
                  <td key={item.id}>{item.Overall_Height}</td>
                ))}
              </tr>
              <tr>
                <td>Kerb Weight (kg)</td>
                {vehicleData.map((item) => (
                  <td key={item.id}>{item.Kerb_Weight}</td>
                ))}
              </tr>
            </tbody>
            <tbody id="warranty" data-filter="target">
              <tr>
                <td>Battery Warranty</td>
                {vehicleData.map((item) => (
                  <td key={item.id}>{item.Battery_warranty}</td>
                ))}
              </tr>
              <tr>
                <td>Motor Warranty</td>
                {vehicleData.map((item) => (
                  <td key={item.id}>{item.Motor_warranty}</td>
                ))}
              </tr>
            </tbody>
            <tbody id="features" data-filter="target">
              <tr>
                <td>Connectivity</td>
                {vehicleData.map((item) => (
                  <td key={item.id}>{item.Connectivity}</td>
                ))}
              </tr>
              <tr>
                <td>Navigation</td>
                {vehicleData.map((item) => (
                  <td key={item.id}>{item.Navigation}</td>
                ))}
              </tr>
              <tr>
                <td>Operating System</td>
                {vehicleData.map((item) => (
                  <td key={item.id}>{item.Operating_System}</td>
                ))}
              </tr>
              <tr>
                <td>Processor</td>
                {vehicleData.map((item) => (
                  <td key={item.id}>{item.Processor}</td>
                ))}
              </tr>
              <tr>
                <td>Mobile Application</td>
                {vehicleData.map((item) => (
                  <td key={item.id}>{item.Mobile_Application}</td>
                ))}
              </tr>
              <tr>
                <td>Other Features</td>
                {vehicleData.map((item) => (
                  <td key={item.id}>{item.other_features}</td>
                ))}
              </tr>
              <tr>
                <td>Colors</td>
                {vehicleData.map((item) => (
                  <td key={item.id}>{item.colors}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Footer />

      <script
        src="https://kit.fontawesome.com/1465e7da9e.js"
        crossorigin="anonymous"
      ></script>
      <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/js/bootstrap.bundle.min.js"></script>
    </body>
  );
}

export default Compareres;
