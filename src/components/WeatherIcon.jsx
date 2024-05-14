import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import {
  TiWeatherSunny,
  TiWeatherDownpour,
  TiWeatherSnow,
} from "react-icons/ti";
import { BsCloudsFill } from "react-icons/bs";
import { WiDayRain, WiDayStormShowers, WiFog } from "react-icons/wi";

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
      {weatherData.weather[0].icon.substring(0, 2) == "01" && (
        <TiWeatherSunny size={30} className="text-red-500" />
      )}
      {weatherData.weather[0].icon.substring(0, 2) == "02" && (
        <TiWeatherPartlySunny size={30} />
      )}
      {weatherData.weather[0].icon.substring(0, 2) == "03" && (
        <TiWeatherPartlySunny size={30} />
      )}
      {weatherData.weather[0].icon.substring(0, 2) == "04" && (
        <BsCloudsFill size={30} />
      )}
      {weatherData.weather[0].icon.substring(0, 2) == "09" && (
        <TiWeatherDownpour size={30} className="text-red-500" />
      )}
      {weatherData.weather[0].icon.substring(0, 2) == "10" && (
        <WiDayRain size={30} className="text-red-500" />
      )}
      {weatherData.weather[0].icon.substring(0, 2) == "11" && (
        <WiDayStormShowers size={30} className="text-red-500" />
      )}
      {weatherData.weather[0].icon.substring(0, 2) == "13" && (
        <TiWeatherSnow size={30} className="text-red-500" />
      )}
      {weatherData.weather[0].icon.substring(0, 2) == "50" && (
        <WiFog size={30} className="text-red-500" />
      )}

      {/* <img
        className="w-12 h-12"
        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} //문서 참고 https://openweathermap.org/weather-conditions
      /> */}
      <div className="w-16">
        <div className="font-semibold">{weatherData?.name}</div>
        <div>{weatherData.main.temp.toFixed(1)}℃</div>
      </div>
    </div>
  );
};

export default WeatherIcon;
