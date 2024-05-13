import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const WeatherIcon = () => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [weatherData, setWeatherData] = useState();

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
          import.meta.env.VITE_API_KEY //API키를 dotenv에서 가져오기
        }&lang=kr&units=metric`
      );

      console.log(response);
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    if (!latitude) return;
    getWeather();
  }, [latitude]);

  //   return <div>{weatherData && weatherData.name}</div>; //똑같다
  return (
    <div className="text-xs flex items-center">
      {weatherData && (
        <img
          className="w-12 h-12"
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} //문서 참고 https://openweathermap.org/weather-conditions
        />
      )}
      <div>
        <div className="font-semibold">{weatherData?.name}</div>
        <div>{weatherData?.main.temp.toFixed(1)}℃</div>
      </div>
    </div>
  );
};

export default WeatherIcon;
