import searchIcon from '../assets/weather/searchIcon.jpg';
import cloudIcon from '../assets/weather/cloudIcon.jpg';
import drizzleIcon from '../assets/weather/dizzleIcon.jpeg';
import rainIcon from '../assets/weather/rainIcon.jpg';
import windIcon from '../assets/weather/windIcon.jpg';
import snowIcon from '../assets/weather/snowIcon.png';
import humidityIcon from '../assets/weather/humidityIcon.png';
import clearIcon from '../assets/weather/clearIcon.jpg';
import styles from '../styles/weatherapp.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Props {
  icon: any;
  temp: number;
  city: string;
  country: string;
  lat: number;
  log: number;
  humidity: number;
  wind: number;
}

let api_key = "e37b8733190d8d083458e5a2dfe06677"

const WeatherDetails = ({ icon, temp, city, country, lat, log, humidity, wind }: Props) => {
  return (
    <>
      <div className={styles.image}>
        <img src={icon} alt="image" />
      </div>
      <div className={styles.temp}>{temp} &deg;C</div>
      <div className={styles.city}>{city}</div>
      <div className={styles.country}>{country}</div>
      <div className={styles.cord}>
        <div>
          <span>Lattitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span>Longitude</span>
          <span>{log}</span>
        </div>
      </div>
      <div className={styles.data_container}>
        <div className={styles.element}>
          <img src={humidityIcon} alt="humidity" />
          <div className={styles.data}>
            <div className={styles.humidity}>
              {humidity}%
            </div>
            <div className={styles.text}>Humidity</div>
          </div>
        </div>
        <div className={styles.element}>
          <img src={windIcon} alt="wind" />
          <div className={styles.data}>
            <div className={styles.wind}>
              {wind} km/hr
            </div>
            <div className={styles.text}>Wind speed</div>
          </div>
        </div>
      </div>
    </>
  )
}

const WeatherApp = () => {

  const [state, setState] = useState({
    icon: clearIcon,
    temp: 0,
    city: "Chennai",
    country: "IN",
    lat: 0,
    log: 0,
    humidity: 0,
    wind: 0
  });
  const [cityName, setCityName] = useState("Chennai");
  const [loading, setLoading] = useState(false);
  const [cityNotFound,setCityNotFound] = useState("");

  let weatherUrl: any = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&units=Metric`;

  const weatherIconMap: any = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": drizzleIcon,
    "03n": drizzleIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
  }

  useEffect(()=>{
   weatherApiCall();
  },[]);

  const weatherApiCall = async () => {
    setLoading(true);
    setCityNotFound("");
    try {
      const { data } = await axios.get(weatherUrl);
      const weatherIconCode = data.weather[0].icon as any;
      setState({
        ...state,
        icon: weatherIconMap[weatherIconCode] || clearIcon,
        temp: Math.floor(data?.main?.temp),
        city: data?.name,
        country: data?.sys.country,
        humidity: data?.main.humidity,
        lat: data?.coord?.lat,
        log: data?.coord?.lon,
        wind: data?.wind?.speed,
      });
    } catch (err: any) {
      console.log(err.message);
     setCityNotFound("City not found");
    } finally {
      setLoading(false);
    }
  }

  const handleCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') weatherApiCall();
  }

  return (
    <div className={styles.container}>
      <div className={styles.inner_wrapper}>
        <div className={styles.input_group}>
          <input type="text" placeholder='search city' onChange={handleCity} value={cityName} onKeyDown={handleKeyDown} />
          <img src={searchIcon} alt="search" onClick={() => weatherApiCall()} />
        </div>
        {loading && <h1>Loading...</h1>}
        {cityNotFound && <h1 className={styles.error}>{cityNotFound}</h1>}
        { !loading && !cityNotFound && <WeatherDetails icon={state.icon} temp={state.temp} city={state.city} country={state.country} lat={state.lat} log={state.log} humidity={state.humidity} wind={state.wind} />}
      </div>
    </div>
  )
}

export default WeatherApp