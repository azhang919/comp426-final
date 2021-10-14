import { Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Weather = () => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    getWeather();
    const weatherInterval = setInterval(() => {
      getWeather();
    }, 300000);

    return () => clearInterval(weatherInterval);
  }, []);

  const getWeather = async () => {
    const result = await axios({
      method: "GET",
      url: `https://api.weatherbit.io/v2.0/current?key=${process.env.REACT_APP_WEATHER_API_KEY}&city=Raleigh&country=US&units=I`,
    });

    if (result.status === 200) {
      setWeather({
        temp: result.data.data[0].temp,
        desc: result.data.data[0].weather.description,
        icon: result.data.data[0].weather.icon,
      });
    } else {
      setWeather({});
    }
  };

  return (
    <>
      <Card className="mb-3">
        <Card.Body className="text-center justify-content-center">
          <img
            src={`https://www.weatherbit.io/static/img/icons/${weather.icon}.png`}
            alt={weather.desc}
            style={{ maxWidth: "50px", height: "auto" }}
          />
          <p>{weather.desc}</p>
          <p>{weather.temp}° F</p>
        </Card.Body>
        <Card.Footer>
          <em>Data from Raleigh, NC. Weather updates automatically occur every 5 min.</em>
        </Card.Footer>
      </Card>
    </>
  );
};

export default Weather;
