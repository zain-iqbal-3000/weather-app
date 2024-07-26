import axios from 'axios';

const API_KEY = '78be45d7dcea03e03d9a45e1058dd21f';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeather = async (city) => {
    try {
        const { lat, lon } = await fetchLatLon(city);
      const response = await axios.get(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
      
      console.log('response data in fetchWeather in api.jx');
        console.log(response.data);
        return response.data;
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
      return null; 
    }
  };
  
  export const fetchAirQuality = async (city) => {
    try {
        const { lat, lon } = await fetchLatLon(city);
      const response = await axios.get(`${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch air quality data:", error);
      return null; 
    }
  };
  export const fetchForecast = async (city) => {
    try {
        const { lat, lon } = await fetchLatLon(city);
      const response = await axios.get(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch forecast data:", error);
    //   return null; 
    }
  };
  
  export const fetchLatLon = async (city) => {
    try {
      const geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
      const response = await axios.get(geocodeUrl);
      if (response.data && response.data.length > 0) {
        const data = response.data[0]; // Assuming the first result is the most relevant
        return { lat: data.lat, lon: data.lon };
      } else {
        console.error("No results found for the specified city:", city);
        return null;
      }
    } catch (error) {
      console.error("Failed to fetch latitude and longitude:", error);
    //   return null; // or handle error as needed
    }
};