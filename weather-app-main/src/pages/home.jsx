import React, { useEffect, useState } from "react";
import weather from "../icons/weather.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=0c8b41179f5e0e85745e60a5a044c871&units=metric";

  const cityName = (e) => {
    setCity(e.target.value);
  };
  const submit = (e) => {
      if(city === ""){
          alert("Enter city name")
          navigate("/")
      } else {
        setIsLoading(true);
    setTimeout(()=> {
        axios
        .get(url)
        .then((response) => {
          localStorage.setItem("weatherResponse", JSON.stringify(response.data));
          navigate("/response")
        })
        .finally(() => setIsLoading(false));
    }, 1000)
      }
    
   
  };
  useEffect(() => {
    localStorage.clear();
  });

  return (
    <div className="home-page">
      { 
      isLoading ?
      <div className="loading">
          <div className="circle-container">
            <div className="circle circle-1"></div>
            <div className="circle circle-2"></div>
            <div className="circle circle-3"></div>
          </div>
        </div>
        : 
        <div className="home">
          <div className="heading-img">
            <h1 className="welcome-heading">Weather App!</h1>
            <img className="weather-img" src={weather} alt="" />
          </div>

          <form action="">
            <input
              type="text"
              placeholder="Enter City name"
              onChange={(e) => cityName(e)}
            />
            <div className="btn-container">
                <button className="btn" type="submit" href onClick={submit}>
                  Search
                </button>
            </div>
          </form>
        </div>
      }
    </div>
  );
};

export default Home;
