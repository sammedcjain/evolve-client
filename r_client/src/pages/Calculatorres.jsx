import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";

function Calculatorres() {
  const location = useLocation();
  const [evcal, setEvcal] = useState({});

  useEffect(() => {
    if (location.state?.id) {
      setEvcal(location.state.id);
    }
  }, [location.state?.id]);
  console.log(evcal);
  if (Object.keys(evcal).length > 0) {
    return (
      <>
        <html lang="en" dir="ltr">
          <head>
            <meta charSet="utf-8" />
            <title>Calculator</title>
            <link rel="stylesheet" href="./css-js/css/calres.css" />
            <link
              rel="stylesheet"
              href="https://kit.fontawesome.com/1465e7da9e.js"
              crossOrigin="anonymous"
            />
          </head>
          <a href="/calculator" style={{ backgroundColor: "black" }}>
            <IoArrowBackCircleSharp
              className="fa-solid fa-arrow-left fa-beat-fade fa-2xl"
              style={{ color: "#4CAF50", fontSize: "55px" }}
            ></IoArrowBackCircleSharp>
          </a>
          <body style={{ background: "black" }}>
            <div className="container">
              <h1
                style={{ fontSize: "70px", color: "lightgreen", marginTop: 0 }}
              >
                Your Savings!
              </h1>
              <div className="card">
                <h3>
                  Your spend Rs. <span>{evcal.petrol_Total}</span> in 1 year for
                  your Petrol/Diesel vehicle
                </h3>
                <h3>
                  Whereas with your EV you spend only <span>{evcal.cpy}</span>{" "}
                  per year
                </h3>
                <h3>
                  <span className="arrow-highlight">
                    Total savings = <span>{evcal.total}</span> Rs per year
                  </span>
                </h3>
              </div>

              <div className="card">
                <h3>
                  Your {evcal.vehicle} vehicle emits a total of{" "}
                  <span>{Math.round(evcal.fcarbon * 100) / 100}</span> kgs of
                  CO2 per year
                </h3>
                <h3>
                  Carbon footprint of your EV vehicle ={" "}
                  <span>{Math.round(evcal.ecarbon * 100) / 100}</span> kgs per
                  year in India
                </h3>
                <h3>
                  Therefore, you'll reduce your carbon footprint by{" "}
                  <span className="arrow-highlight">
                    {Math.round(evcal.carbon * 100) / 100} kgs
                  </span>{" "}
                  if you switch to EV
                </h3>
              </div>
            </div>
          </body>
        </html>
      </>
    );
  } else {
    return <h1>Something went wrogn</h1>;
  }
}

export default Calculatorres;
