import axios from 'axios';

const API_URL = 'http://localhost:8080/api/weather';

export const getWeather = (city) => axios.get(`${API_URL}/current`, { params: { city } });
export const getWeatherByCoords = (lat, lon) => axios.get(`${API_URL}/current`, { params: { lat, lon } });
export const getForecast = (city) => axios.get(`${API_URL}/forecast`, { params: { city } });
export const getForecastByCoords = (lat, lon) => axios.get(`${API_URL}/forecast`, { params: { lat, lon } });
