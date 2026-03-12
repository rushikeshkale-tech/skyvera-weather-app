package com.weatherapp.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "weather")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Weather {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String city;

    private Double temperature;

    private Integer humidity;

    @Column(name = "weather_description")
    private String weatherDescription;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
