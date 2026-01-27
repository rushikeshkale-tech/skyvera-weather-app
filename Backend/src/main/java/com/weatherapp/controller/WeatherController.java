package com.weatherapp.controller;

import com.weatherapp.service.WeatherService;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/weather")
@CrossOrigin(origins = "*")
public class WeatherController {

    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping("/current")
    public Map<String, Object> getCurrentWeather(@RequestParam(required = false) String city,
            @RequestParam(required = false) Double lat,
            @RequestParam(required = false) Double lon) {
        if (lat != null && lon != null) {
            return weatherService.getCurrentWeatherByCoords(lat, lon);
        }
        return weatherService.getCurrentWeather(city != null ? city : "London");
    }

    @GetMapping("/forecast")
    public Map<String, Object> getForecast(@RequestParam(required = false) String city,
            @RequestParam(required = false) Double lat,
            @RequestParam(required = false) Double lon) {
        if (lat != null && lon != null) {
            return weatherService.getForecastByCoords(lat, lon);
        }
        return weatherService.getForecast(city != null ? city : "London");
    }
}
