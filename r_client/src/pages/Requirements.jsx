import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import NotAuth from "../components/NotAuth";
import LoadingPage from "../components/LoadingPage";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Requirements = () => {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const navigate = useNavigate();
  const [Companies, setCompanies] = useState([]);
  const [AuthUser, setAuthUser] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState("Ola");
  const [selectedPrice, setSelectedPrice] = useState(10000000);
  const [selectedRange, setSelectedRange] = useState(50);
  const [selectedSpeed, setSelectedSpeed] = useState(40);
  const [Showall, setShowall] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (token) {
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.get(`${apiUrl}/requirements`, {
            headers,
          });

          setCompanies(response.data);
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
  }, []);

  const uniqueCompanies = Array.from(
    new Set(Companies.map((item) => item.company))
  );

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (Showall === true) {
        await axios
          .post(`${apiUrl}/data`, {
            showall: "showall",
          })
          .then((res) => {
            const { evdb, redirectUrl } = res.data;
            if (redirectUrl) {
              navigate(redirectUrl, { state: { id: evdb } });
            } else {
              toast.error("Error Occured", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000, // Duration for which the toast will be shown (in milliseconds)
              });
            }
          });
      } else {
        await axios
          .post(`${apiUrl}/data`, {
            company: selectedCompany,
            price: selectedPrice,
            range: selectedRange,
            speed: selectedSpeed,
          })
          .then((res) => {
            const { evdb, redirectUrl } = res.data;
            //console.log(res.data);
            if (redirectUrl) {
              navigate(redirectUrl, { state: { id: evdb } });
            } else {
              toast.error("Error Occured", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000, // Duration for which the toast will be shown (in milliseconds)
              });
            }
          });
      }
    } catch (e) {
      console.log(e);
      toast.error("Error Occured", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Duration for which the toast will be shown (in milliseconds)
      });
    }
  }

  if (Loading === true) {
    return <LoadingPage />;
  } else if (AuthUser === true && Loading === false) {
    return (
      <>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Evolve</title>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
          />
          <link rel="stylesheet" href="./css-js/css/index.css" />
        </head>
        <body>
          <ToastContainer />
          <header>
            <nav className="navbar navbar-expand-lg ">
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

          <h1>EV Dekho</h1>

          <h2>Please select your requirements: </h2>

          <form onSubmit={handleSubmit} className="ev" method="post">
            <label htmlFor="company">Company :</label>
            <select
              name="company"
              id="company"
              defaultValue="Ola"
              value={selectedCompany}
              onChange={(e) => {
                setSelectedCompany(e.target.value);
              }}
            >
              {uniqueCompanies.map((company, index) => (
                <option key={index} value={company}>
                  {company}
                </option>
              ))}
            </select>
            <br />
            <label htmlFor="price">price range</label>
            <select
              name="price"
              id="price"
              defaultValue="10000000"
              value={selectedPrice}
              onChange={(e) => {
                setSelectedPrice(parseInt(e.target.value, 10));
              }}
            >
              <option value="50"> &lt;50k </option>
              <option value="75"> &lt;75k </option>
              <option value="100"> &lt;100k </option>
              <option value="125"> &lt;125k </option>
              <option value="126"> &gt;125k </option>
              <option value="10000000"> any </option>
            </select>
            <br />
            <label htmlFor="range">Min range in kms</label>
            <select
              name="range"
              id="range"
              defaultValue="50"
              value={selectedRange}
              onChange={(e) => {
                setSelectedRange(parseInt(e.target.value, 10));
              }}
            >
              <option value="50"> &gt;50kms </option>
              <option value="75"> &gt;75kms</option>
              <option value="100"> &gt;100kms </option>
              <option value="150"> &gt;150kms </option>
              <option value="175"> &gt;175kms</option>
              <option value="0"> any </option>
            </select>
            <br />
            <label htmlFor="speed">Top Speed:</label>
            <select
              name="speed"
              id="speed"
              defaultValue="40"
              value={selectedSpeed}
              onChange={(e) => {
                setSelectedSpeed(parseInt(e.target.value, 10));
              }}
            >
              <option value="40"> &gt;40kmph </option>
              <option value="80"> &gt;80kmph </option>
              <option value="120"> &gt;120kmph </option>
              <option value="160"> &gt;160kmph </option>
              <option value="0">any</option>
            </select>
            <br />
            <button
              onClick={() => setShowall(false)}
              type="submit"
              name="ev"
              value="ev"
            >
              Search
            </button>
            <button
              onClick={() => setShowall(true)}
              type="submit"
              name="showall"
              value="showall"
            >
              Show All
            </button>
          </form>
          <Footer />
        </body>
      </>
    );
  } else if (AuthUser === false) {
    return <NotAuth />;
  }
};

export default Requirements;
