import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotAuth from "../components/NotAuth.jsx";
import LoadingPage from "../components/LoadingPage.jsx";
import { Link } from "react-router-dom";

const Admin_entry = () => {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
  // States for each input field
  const [AuthUser, setAuthUser] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    vehicle_id: "",
    company: "",
    vehicle: "",
    price: "",
    Max_Power: "",
    Rated_Power: "",
    Max_Torque: "",
    Battery_capacity: "",
    charge_consumption: "",
    Battery_type: "",
    No_of_Batteries: "",
    range: "",
    speed: "",
    Acceleration_0_to_60: "",
    Battery_charging_time: "",
    Fast_charging: "",
    Riding_Modes: "",
    Transmission: "",
    Motor_type: "",
    Portable_Battery: "",
    Swappable_Battery: "",
    Charger_Type: "",
    Carrying_capacity: "",
    Overall_Width: "",
    Overall_Height: "",
    Kerb_Weight: "",
    Battery_warranty: "",
    Motor_warranty: "",
    Connectivity: "",
    Navigation: "",
    Operating_System: "",
    Processor: "",
    Mobile_Application: "",
    other_features: "",
    colors: "",
    main_photo: "",
    photo1: "",
    photo2: "",
    company_link: "",
    reviews: "",
    vehicle_del: "", // For the delete form
    to_update: "", // For the update form
    update_data: "", // For the update form
  });

  // Update state when input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token not found");
        // Handle the case where the token is not available or not valid
        return;
      }

      // Set the Authorization header with the token
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios
        .post(
          `${apiUrl}/dbupdate`,
          {
            vehicle_id: formData.vehicle_id,
            company: formData.company,
            vehicle: formData.vehicle,
            price: formData.price,
            Max_Power: formData.Max_Power,
            Rated_Power: formData.Rated_Power,
            Max_Torque: formData.Max_Torque,
            Battery_capacity: formData.Battery_capacity,
            charge_consumption: formData.charge_consumption,
            Battery_type: formData.Battery_type,
            No_of_Batteries: formData.No_of_Batteries,
            range: formData.range,
            speed: formData.speed,
            Acceleration_0_to_60: formData.Acceleration_0_to_60,
            Battery_charging_time: formData.Battery_charging_time,
            Fast_charging: formData.Fast_charging,
            Riding_Modes: formData.Riding_Modes,
            Transmission: formData.Transmission,
            Motor_type: formData.Motor_type,
            Portable_Battery: formData.Portable_Battery,
            Swappable_Battery: formData.Swappable_Battery,
            Charger_Type: formData.Charger_Type,
            Carrying_capacity: formData.Carrying_capacity,
            Overall_Width: formData.Overall_Width,
            Overall_Height: formData.Overall_Height,
            Kerb_Weight: formData.Kerb_Weight,
            Battery_warranty: formData.Battery_warranty,
            Motor_warranty: formData.Motor_warranty,
            Connectivity: formData.Connectivity,
            Navigation: formData.Navigation,
            Operating_System: formData.Operating_System,
            Processor: formData.Processor,
            Mobile_Application: formData.Mobile_Application,
            other_features: formData.other_features,
            colors: formData.colors,
            main_photo: formData.main_photo,
            photo1: formData.photo1,
            photo2: formData.photo2,
            company_link: formData.company_link,
            reviews: formData.reviews,
          },
          {
            headers: headers,
          }
        )
        .then((res) => {
          console.log(res, res.data);
          if (res.data.error) {
            toast.error(res.data.error, {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 3000, // Duration for which the toast will be shown (in milliseconds)
            });
          } else {
            toast.success(res.data, {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 3000, // Duration for which the toast will be shown (in milliseconds)
            });
          }
        });
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Duration for which the toast will be shown (in milliseconds)
      });
    }
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token not found");
        // Handle the case where the token is not available or not valid
        return;
      }

      // Set the Authorization header with the token
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios
        .post(
          `${apiUrl}/dbdelete`,
          {
            vehicle_del: formData.vehicle_del,
          },
          {
            headers: headers,
          }
        )
        .then((res) => {
          console.log(res, res.data);
          if (res.data.error) {
            toast.error(res.data.error, {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 3000, // Duration for which the toast will be shown (in milliseconds)
            });
          } else {
            toast.success(res.data, {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 3000, // Duration for which the toast will be shown (in milliseconds)
            });
          }
        });
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Duration for which the toast will be shown (in milliseconds)
      });
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token not found");
        // Handle the case where the token is not available or not valid
        return;
      }

      // Set the Authorization header with the token
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios
        .post(
          `${apiUrl}/db_update`,
          {
            vehicle: formData.vehicle,
            to_update: formData.to_update,
            update_data: formData.update_data,
          },
          {
            headers: headers,
          }
        )
        .then((res) => {
          console.log(res, res.data);
          if (res.data.error) {
            toast.error(res.data.error, {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 3000, // Duration for which the toast will be shown (in milliseconds)
            });
          } else {
            toast.success(res.data, {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 3000, // Duration for which the toast will be shown (in milliseconds)
            });
          }
        });
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Duration for which the toast will be shown (in milliseconds)
      });
    }
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

          const response = await axios.get(`${apiUrl}/admin_post`, {
            headers,
          });

          console.log("API response  ", response.data);
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

  if (Loading === true) {
    return <LoadingPage />;
  } else if (AuthUser === false) {
    return <NotAuth />;
  }
  if (AuthUser && !Loading) {
    return (
      <div>
        <ToastContainer />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        ></link>
        <link rel="stylesheet" href="/css-js/css/admin_post.css" />
        <div className="text_com">
          <h1>Evolve 2.0</h1>
          <h2>Admin access granted!</h2>
          <h3>Add elements to the database:</h3>
        </div>
        <form onSubmit={handleSubmit} id="addForm">
          <label htmlFor="vehicle_id">Vehicle Id (Number): </label>
          <input
            type="number"
            id="vehicle_id"
            name="vehicle_id"
            value={formData.vehicle_id}
            onChange={handleInputChange}
          />
          <br />
          <label htmlFor="company">Company (String): </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
          />
          <br />

          <label htmlFor="vehicle">Vehicle (String): </label>
          <input
            type="text"
            id="vehicle"
            name="vehicle"
            value={formData.vehicle}
            onChange={handleInputChange}
          />
          <br />

          <label htmlFor="price">Price (Number): </label>
          <input
            className="numberCheck"
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
          <br />

          <label htmlFor="Max_Power">Max Power (Number): </label>
          <input
            placeholder="in W (Watts)"
            id="Max_Power"
            type="number"
            name="Max_Power"
            step="0.01"
            value={formData.Max_Power}
            onChange={handleInputChange}
          />
          <br />
          <label htmlFor="Rated_Power">Rated Power (Number) : </label>
          <input
            type="number"
            id="Rated_Power"
            name="Rated_Power"
            placeholder="in W (Watts)"
            step="0.01"
            value={formData.Rated_Power}
            onChange={handleInputChange}
          />
          <br />

          <label htmlFor="Max_Torque">Max Torque (Number) : </label>
          <input
            type="number"
            id="Max_Torque"
            name="Max_Torque"
            placeholder="in Nm"
            step="0.01"
            value={formData.Max_Torque}
            onChange={handleInputChange}
          />
          <br />

          <label htmlFor="Battery_capacity">Battery Capacity (Number) : </label>
          <input
            type="number"
            id="Battery_capacity"
            name="Battery_capacity"
            placeholder="in kWh"
            step="0.01"
            value={formData.Battery_capacity}
            onChange={handleInputChange}
          />
          <br />

          <label htmlFor="charge_consumption">
            Charge Consumption (Number) :{" "}
          </label>
          <input
            type="number"
            id="charge_consumption"
            name="charge_consumption"
            placeholder="in kWh/100km"
            step="0.01"
            value={formData.charge_consumption}
            onChange={handleInputChange}
          />
          <br />

          <label htmlFor="Battery_type">Battery Type (String): </label>
          <input
            type="text"
            id="Battery_type"
            name="Battery_type"
            value={formData.Battery_type}
            onChange={handleInputChange}
          />
          <br />

          <label htmlFor="No_of_Batteries">
            Number of Batteries (Number):{" "}
          </label>
          <input
            type="number"
            id="No_of_Batteries"
            name="No_of_Batteries"
            value={formData.No_of_Batteries}
            onChange={handleInputChange}
          />
          <br />

          <label htmlFor="range">Range (Number): </label>
          <input
            type="number"
            id="range"
            name="range"
            placeholder="in kms"
            value={formData.range}
            onChange={handleInputChange}
          />
          <br />

          <label htmlFor="speed">Speed (Number) : </label>
          <input
            type="number"
            id="speed"
            name="speed"
            placeholder="in km/hr"
            value={formData.speed}
            onChange={handleInputChange}
          />
          <br />

          <label htmlFor="Acceleration_0_to_60">
            Acceleration 0 to 60 (Number):{" "}
          </label>
          <input
            type="number"
            id="Acceleration_0_to_60"
            name="Acceleration_0_to_60"
            placeholder="in secs"
            step="0.01"
            value={formData.Acceleration_0_to_60}
            onChange={handleInputChange}
          />
          <br />

          <label htmlFor="Battery_charging_time">
            Battery Charging Time (Number):{" "}
          </label>
          <input
            type="number"
            id="Battery_charging_time"
            name="Battery_charging_time"
            placeholder="in hrs"
            step="0.01"
            value={formData.Battery_charging_time}
            onChange={handleInputChange}
          />
          <br />

          <label htmlFor="Fast_charging">Fast Charging (String): </label>
          <input
            type="text"
            id="Fast_charging"
            name="Fast_charging"
            value={formData.Fast_charging}
            onChange={handleInputChange}
          />
          <br />

          <label htmlFor="Riding_Modes">Riding Modes (String): </label>
          <input
            type="text"
            id="Riding_Modes"
            name="Riding_Modes"
            value={formData.Riding_Modes}
            onChange={handleInputChange}
          />
          <br />

          <label htmlFor="Transmission">Transmission (String): </label>
          <input
            type="text"
            id="Transmission"
            name="Transmission"
            value={formData.Transmission}
            onChange={handleInputChange}
          />
          <br />

          <label htmlFor="Motor_type">Motor Type (String): </label>
          <input
            type="text"
            id="Motor_type"
            name="Motor_type"
            value={formData.Motor_type}
            onChange={handleInputChange}
          />
          <br />

          <label htmlFor="Portable_Battery">Portable Battery (String): </label>
          <input
            type="text"
            id="Portable_Battery"
            name="Portable_Battery"
            value={formData.Portable_Battery}
            onChange={handleInputChange}
          />
          <br />

          <label htmlFor="Swappable_Battery">
            Swappable Battery (String):{" "}
          </label>
          <input
            type="text"
            id="Swappable_Battery"
            name="Swappable_Battery"
            value={formData.Swappable_Battery}
            onChange={handleInputChange}
          />
          <br />

          <label htmlFor="Charger_Type">Charger Type (String): </label>
          <input
            type="text"
            id="Charger_Type"
            name="Charger_Type"
            value={formData.Charger_Type}
            onChange={handleInputChange}
          />
          <br />

          <label htmlFor="Carrying_capacity">
            Carrying Capacity (Number) :{" "}
          </label>
          <input
            type="number"
            id="Carrying_capacity"
            name="Carrying_capacity"
            placeholder="in kgs"
            value={formData.Carrying_capacity}
            onChange={handleInputChange}
          />
          <br />

          <label htmlFor="Overall_Width">Overall Width (Number) : </label>
          <input
            type="number"
            id="Overall_Width"
            name="Overall_Width"
            placeholder="in mm"
            value={formData.Overall_Width}
            onChange={handleInputChange}
          />
          <br />

          <label htmlFor="Overall_Height">Overall Height (Number) : </label>
          <input
            type="number"
            id="Overall_Height"
            name="Overall_Height"
            placeholder="in mm"
            value={formData.Overall_Height}
            onChange={handleInputChange}
          />
          <br />

          <label htmlFor="Kerb_Weight">Kerb Weight (Number) : </label>
          <input
            type="number"
            id="Kerb_Weight"
            name="Kerb_Weight"
            placeholder="in kgs"
            value={formData.Kerb_Weight}
            onChange={handleInputChange}
          />
          <br />

          <label htmlFor="Battery_warranty">Battery Warranty (String) : </label>
          <input
            type="text"
            id="Battery_warranty"
            name="Battery_warranty"
            value={formData.Battery_warranty}
            onChange={handleInputChange}
          />
          <br />

          <label htmlFor="Motor_warranty">Motor Warranty (String) : </label>
          <input
            type="text"
            id="Motor_warranty"
            name="Motor_warranty"
            value={formData.Motor_warranty}
            onChange={handleInputChange}
          />
          <br />

          <label htmlFor="Connectivity">Connectivity (String): </label>
          <input
            type="text"
            id="Connectivity"
            name="Connectivity"
            value={formData.Connectivity}
            onChange={handleInputChange}
          />
          <br />

          <label htmlFor="Navigation">Navigation (String): </label>
          <input
            type="text"
            id="Navigation"
            name="Navigation"
            value={formData.Navigation}
            onChange={handleInputChange}
          />
          <br />

          <label htmlFor="Operating_System">Operating System (String): </label>
          <input
            type="text"
            id="Operating_System"
            name="Operating_System"
            value={formData.Operating_System}
            onChange={handleInputChange}
          />
          <br />

          <label htmlFor="Processor">Processor (String): </label>
          <input
            type="text"
            id="Processor"
            name="Processor"
            value={formData.Processor}
            onChange={handleInputChange}
          />
          <br />

          <label htmlFor="Mobile_Application">
            Mobile Application (String):{" "}
          </label>
          <input
            type="text"
            id="Mobile_Application"
            name="Mobile_Application"
            value={formData.Mobile_Application}
            onChange={handleInputChange}
          />
          <br />

          <label htmlFor="other_features">Other Features (String): </label>
          <input
            type="text"
            id="other_features"
            name="other_features"
            value={formData.other_features}
            onChange={handleInputChange}
          />
          <br />

          <label htmlFor="colors">Colors (String): </label>
          <input
            type="text"
            id="colors"
            name="colors"
            value={formData.colors}
            onChange={handleInputChange}
          />
          <br />

          <label htmlFor="main_photo">Main Photo Link (String): </label>
          <input
            type="text"
            id="main_photo"
            name="main_photo"
            value={formData.main_photo}
            onChange={handleInputChange}
          />
          <br />

          <label htmlFor="photo1">Photo 2 Link (String): </label>
          <input
            type="text"
            id="photo1"
            name="photo1"
            value={formData.photo1}
            onChange={handleInputChange}
          />
          <br />

          <label htmlFor="photo2">Photo 3 Link (String): </label>
          <input
            type="text"
            id="photo2"
            name="photo2"
            value={formData.photo2}
            onChange={handleInputChange}
          />
          <br />

          <label htmlFor="company_link">Company Link (String): </label>
          <input
            type="text"
            id="company_link"
            name="company_link"
            value={formData.company_link}
            onChange={handleInputChange}
          />
          <br />

          <label htmlFor="reviews">Review Link (String): </label>
          <input
            type="text"
            id="reviews"
            name="reviews"
            value={formData.reviews}
            onChange={handleInputChange}
          />
          <br />
          <button type="submit" name="submit">
            Add
          </button>
        </form>
        <br />
        <br />
        <div className="text_com">
          <h2>Delete entries from database by giving vehicle name:</h2>
        </div>
        <form onSubmit={handleDeleteSubmit}>
          <label htmlFor="vehicle_del">Vehicle Name: </label>
          <input
            type="text"
            name="vehicle_del"
            value={formData.vehicle_del}
            onChange={handleInputChange}
          />
          <button type="submit" name="button">
            Delete
          </button>
        </form>

        <div className="text_com">
          <h3>
            Update elements by giving vehicle name and the updated entry...
          </h3>
        </div>
        <form className="update" onSubmit={handleUpdateSubmit}>
          <label htmlFor="vehicle">Vehicle Name (String): </label>
          <input
            type="text"
            name="vehicle"
            value={formData.vehicle}
            onChange={handleInputChange}
          />
          <br />

          <label htmlFor="to_update">Select an option to be updated: </label>
          <select
            name="to_update"
            value={formData.to_update}
            onChange={handleInputChange}
          >
            <option value="" disabled selected>
              Select an option to be updated
            </option>
            <option value="" disabled selected>
              Select an option to be updated
            </option>
            <option name="vehicle_id" value="vehicle_id">
              vehicle_id (Number)
            </option>
            <option name="company" value="company">
              company (String)
            </option>
            <option name="vehicle" value="vehicle">
              vehicle (String)
            </option>
            <option name="price" value="price">
              price (Number)
            </option>
            <option name="Max_Power" value="Max_Power">
              Max_Power (Number)
            </option>
            <option name="Rated_Power" value="Rated_Power">
              Rated_Power (Number)
            </option>
            <option name="Max_Torque" value="Max_Torque">
              Max_Torque (Number)
            </option>
            <option name="Battery_capacity" value="Battery_capacity">
              Battery_capacity (Number)
            </option>
            <option name="charge_consumption" value="charge_consumption">
              charge_consumption (Number)
            </option>
            <option name="Battery_type" value="Battery_type">
              Battery_type (String)
            </option>
            <option name="No_of_Batteries" value="No_of_Batteries">
              No_of_Batteries (Number)
            </option>
            <option name="range" value="range">
              range (Number)
            </option>
            <option name="speed" value="speed">
              speed (Number)
            </option>
            <option name="Acceleration_0_to_60" value="Acceleration_0_to_60">
              Acceleration_0_to_60 (Number)
            </option>
            <option name="Battery_charging_time" value="Battery_charging_time">
              Battery_charging_time (Number)
            </option>
            <option name="Fast_charging" value="Fast_charging">
              Fast_charging (String)
            </option>
            <option name="Riding_Modes" value="Riding_Modes">
              Riding_Modes (String)
            </option>
            <option name="Transmission" value="Transmission">
              Transmission (String)
            </option>
            <option name="Motor_type" value="Motor_type">
              Motor_type (String)
            </option>
            <option name="Portable_Battery" value="Portable_Battery">
              Portable_Battery (String)
            </option>
            <option name="Swappable_Battery" value="Swappable_Battery">
              Swappable_Battery (String)
            </option>
            <option name="Charger_Type" value="Charger_Type">
              Charger_Type (String)
            </option>
            <option name="Carrying_capacity" value="Carrying_capacity">
              Carrying_capacity (Number)
            </option>
            <option name="Overall_Width" value="Overall_Width">
              Overall_Width (Number)
            </option>
            <option name="Overall_Height" value="Overall_Height">
              Overall_Height (Number)
            </option>
            <option name="Kerb_Weight" value="Kerb_Weight">
              Kerb_Weight (Number)
            </option>
            <option name="Battery_warranty" value="Battery_warranty">
              Battery_warranty (String)
            </option>
            <option name="Motor_warranty" value="Motor_warranty">
              Motor_warranty (String)
            </option>
            <option name="Connectivity" value="Connectivity">
              Connectivity (String)
            </option>
            <option name="Navigation" value="Navigation">
              Navigation (String)
            </option>
            <option name="Operating_System" value="Operating_System">
              Operating_System (String)
            </option>
            <option name="Processor" value="Processor">
              Processor (String)
            </option>
            <option name="Mobile_Application" value="Mobile_Application">
              Mobile_Application (String)
            </option>
            <option name="other_features" value="other_features">
              other_features (String){" "}
            </option>
            <option name="colors" value="colors">
              Colors (String){" "}
            </option>
            <option name="main_photo" value="main_photo">
              Main Photo Link (String)
            </option>
            <option name="photo1" value="photo1">
              Photo 2 link (String){" "}
            </option>
            <option name="photo2" value="photo2">
              Photo 3 link (String){" "}
            </option>
            <option name="company_link" value="company_link">
              Company link (String){" "}
            </option>
            <option name="reviews" value="reviews">
              Review link (String){" "}
            </option>
          </select>
          <br />

          <label htmlFor="update_data">Enter the data to be updated: </label>
          <input
            type="text"
            name="update_data"
            value={formData.update_data}
            onChange={handleInputChange}
          />
          <br />

          <button type="submit" name="update_submit">
            Update
          </button>
        </form>
        <div className="align_cen">
          <Link className="button_link" to="/logout">
            Logout from Admin Access
          </Link>
        </div>
        <footer style={{ margin: "75px auto" }}>
          <div className="container text-center">
            <p>© 2023 EV Dekho. All rights reserved.</p>
          </div>
        </footer>
      </div>
    );
  }
};

export default Admin_entry;
