import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import {
  TiWeatherSunny,
  TiWeatherDownpour,
  TiWeatherPartlySunny,
  TiWeatherSnow,
} from "react-icons/ti";
import { CiCloud } from "react-icons/ci";
import { BsCloudsFill } from "react-icons/bs";
import { WiDayRain, WiDayStormShowers, WiFog } from "react-icons/wi";

const weatherIcons = {
  "01": <TiWeatherSunny size={30} className="text-red-500" />,
  "02": <TiWeatherPartlySunny size={30} />,
  "03": <CiCloud size={30} />,
  "04": <BsCloudsFill size={30} />,
  "09": <TiWeatherDownpour size={30} />,
  10: <WiDayRain size={30} />,
  11: <WiDayStormShowers size={30} />,
  13: <TiWeatherSnow size={30} />,
  50: <WiFog size={30} />,
};

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

  useEffect(() => {
    if (!weatherData) return;
    console.log(weatherData.weather[0].icon.substring(0, 2));
  }, [weatherData]);

  if (!weatherData)
    return <div className="w-28 h-12 flex items-center">loading...</div>;

  //   return <div>{weatherData && weatherData.name}</div>; //똑같다
  return (
    <div className="text-xs flex items-center gap-2">
      {weatherIcons[weatherData.weather[0].icon.substring(0, 2)]}
      <div className="w-16">
        <div className="font-semibold">{weatherData?.name}</div>
        <div>{weatherData.main.temp.toFixed(1)}℃</div>
      </div>
    </div>
  );
};

export default WeatherIcon;
