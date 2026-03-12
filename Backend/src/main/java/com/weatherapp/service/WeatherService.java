package com.weatherapp.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;

import com.weatherapp.model.Weather;
import com.weatherapp.repository.WeatherRepository;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.List;

@Service
@SuppressWarnings({"null", "unchecked"})
public class WeatherService {

    @Value("${weather.api.key}")
    private String apiKey;

    @Value("${weather.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate;
    private final WeatherRepository weatherRepository;

    public WeatherService(RestTemplate restTemplate, WeatherRepository weatherRepository) {
        this.restTemplate = restTemplate;
        this.weatherRepository = weatherRepository;
    }
    public Map<String, Object> getCurrentWeather(String city) {
        String url = UriComponentsBuilder.fromHttpUrl(apiUrl + "/weather")
                .queryParam("q", city)
                .queryParam("appid", apiKey)
                .queryParam("units", "metric")
                .toUriString();
        Map<String, Object> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<Map<String, Object>>() {
        }).getBody();
        saveWeatherData(response);
        return response;
    }

    public Map<String, Object> getCurrentWeatherByCoords(double lat, double lon) {
        String url = UriComponentsBuilder.fromHttpUrl(apiUrl + "/weather")
                .queryParam("lat", lat)
                .queryParam("lon", lon)
                .queryParam("appid", apiKey)
                .queryParam("units", "metric")
                .toUriString();
        Map<String, Object> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<Map<String, Object>>() {
        }).getBody();
        saveWeatherData(response);
        return response;
    }

    public Map<String, Object> getForecast(String city) {
        String url = UriComponentsBuilder.fromHttpUrl(apiUrl + "/forecast")
                .queryParam("q", city)
                .queryParam("appid", apiKey)
                .queryParam("units", "metric")
                .toUriString();
        return restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<Map<String, Object>>() {
        }).getBody();
    }

    public Map<String, Object> getForecastByCoords(double lat, double lon) {
        String url = UriComponentsBuilder.fromHttpUrl(apiUrl + "/forecast")
                .queryParam("lat", lat)
                .queryParam("lon", lon)
                .queryParam("appid", apiKey)
                .queryParam("units", "metric")
                .toUriString();
        return restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<Map<String, Object>>() {
        }).getBody();
    }

    private void saveWeatherData(Map<String, Object> response) {
        if (response != null && response.containsKey("name")) {
            try {
                String city = (String) response.get("name");
                
                Map<String, Object> main = (Map<String, Object>) response.get("main");
                Double temp = Double.valueOf(main.get("temp").toString());
                Integer humidity = Integer.valueOf(main.get("humidity").toString());
                
                List<Map<String, Object>> weatherList = (List<Map<String, Object>>) response.get("weather");
                String description = "";
                if (weatherList != null && !weatherList.isEmpty()) {
                    description = (String) weatherList.get(0).get("description");
                }

                Weather weather = new Weather(null, city, temp, humidity, description, LocalDateTime.now());
                weatherRepository.save(weather);
            } catch (Exception e) {
                // Ignore parsing errors so it doesn't fail the request
            }
        }
    }

    public List<Weather> getWeatherHistory(String city) {
        return weatherRepository.findByCityIgnoreCaseOrderByCreatedAtDesc(city);
    }
}
