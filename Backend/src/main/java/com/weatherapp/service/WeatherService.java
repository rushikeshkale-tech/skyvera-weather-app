package com.weatherapp.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import java.util.Map;

@Service
@SuppressWarnings("null")
public class WeatherService {

    @Value("${weather.api.key}")
    private String apiKey;

    @Value("${weather.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate;

    public WeatherService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public Map<String, Object> getCurrentWeather(String city) {
        String url = UriComponentsBuilder.fromHttpUrl(apiUrl + "/weather")
                .queryParam("q", city)
                .queryParam("appid", apiKey)
                .queryParam("units", "metric")
                .toUriString();
        return restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<Map<String, Object>>() {
        }).getBody();
    }

    public Map<String, Object> getCurrentWeatherByCoords(double lat, double lon) {
        String url = UriComponentsBuilder.fromHttpUrl(apiUrl + "/weather")
                .queryParam("lat", lat)
                .queryParam("lon", lon)
                .queryParam("appid", apiKey)
                .queryParam("units", "metric")
                .toUriString();
        return restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<Map<String, Object>>() {
        }).getBody();
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
}
