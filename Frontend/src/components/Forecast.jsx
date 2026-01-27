import React from 'react';
import { Calendar, Wind, Clock } from 'lucide-react';

const Forecast = ({ data }) => {
    if (!data || !data.list) {
        return (
            <div className="glass animated-entry" style={{ padding: 20 }}>
                <h3 className="mb-4" style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                    Forecast
                </h3>
                <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>
                    Forecast data not available. Check your API plan or request.
                </p>
            </div>
        );
    }

    // 1) DAILY DATA
    const dailyMap = {};
    data.list.forEach((item) => {
        const date = new Date(item.dt * 1000).toLocaleDateString('en-US', {
            weekday: 'short'
        });
        if (!dailyMap[date]) {
            dailyMap[date] = {
                min: item.main.temp_min,
                max: item.main.temp_max,
                icon: item.weather[0].icon,
                desc: item.weather[0].main,
                wind: item.wind.speed
            };
        } else {
            dailyMap[date].min = Math.min(dailyMap[date].min, item.main.temp_min);
            dailyMap[date].max = Math.max(dailyMap[date].max, item.main.temp_max);
        }
    });
    const days = Object.entries(dailyMap).slice(0, 6);

    // 2) NEXT 24 HOURS (3-3 hours gap)
    const next24Hours = data.list.slice(0, 8);

    return (
        <div className="glass animated-entry" style={{ padding: 20 }}>
            {/* Upcoming days */}
            <div
                className="flex-row mb-6"
                style={{ justifyContent: 'space-between', alignItems: 'center' }}
            >
                <div className="flex-row gap-2" style={{ alignItems: 'center' }}>
                    <Calendar size={20} />
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 600 }}>Upcoming days</h3>
                </div>
                <span style={{ fontSize: '0.82rem', opacity: 0.7 }}>
                    5-day snapshot
                </span>
            </div>

            <div className="forecast-strip mb-8">
                {days.map(([label, day], idx) => (
                    <div
                        key={idx}
                        className="glass forecast-card flex-col flex-center"
                        style={{
                            padding: 12,
                            textAlign: 'center',
                            background: 'rgba(15,23,42,0.9)'
                        }}
                    >
                        <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>{label}</span>

                        {/* ✅ HD ICON */}
                        <img
                            src={`https://openweathermap.org/img/wn/${day.icon}@4x.png`}
                            alt={day.desc}
                            style={{ width: 60, height: 60 }}
                            className="weather-icon-img"
                        />

                        <div
                            className="text-gradient"
                            style={{ fontSize: '1.4rem', fontWeight: 700 }}
                        >
                            {Math.round((day.min + day.max) / 2)}°
                        </div>
                        <div
                            style={{
                                fontSize: '0.8rem',
                                opacity: 0.75,
                                marginTop: 4
                            }}
                        >
                            {Math.round(day.min)}° / {Math.round(day.max)}°
                        </div>
                        <div
                            className="flex-center gap-2"
                            style={{ fontSize: '0.78rem', opacity: 0.7, marginTop: 4 }}
                        >
                            <Wind size={14} />
                            <span>{day.wind} m/s</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Next 24 hours */}
            <div
                className="flex-row mb-4"
                style={{ justifyContent: 'space-between', alignItems: 'center' }}
            >
                <div className="flex-row gap-2" style={{ alignItems: 'center' }}>
                    <Clock size={18} />
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>Next 24 hours</h3>
                </div>
                <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Scroll →</span>
            </div>

            <div className="forecast-strip">
                {next24Hours.map((item, idx) => {
                    const time = new Date(item.dt * 1000).toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                    return (
                        <div
                            key={idx}
                            className="glass forecast-card flex-col flex-center"
                            style={{
                                padding: 12,
                                textAlign: 'center',
                                background: 'rgba(15,23,42,0.9)'
                            }}
                        >
                            <span style={{ fontSize: '0.86rem', opacity: 0.8 }}>{time}</span>

                            {/* ✅ HD ICON */}
                            <img
                                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`}
                                alt={item.weather[0].main}
                                style={{ width: 52, height: 52 }}
                                className="weather-icon-img"
                            />

                            <div
                                className="text-gradient"
                                style={{ fontSize: '1.3rem', fontWeight: 700 }}
                            >
                                {Math.round(item.main.temp)}°
                            </div>
                            <div
                                style={{
                                    fontSize: '0.8rem',
                                    opacity: 0.75,
                                    marginTop: 4
                                }}
                            >
                                {item.weather[0].main}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Forecast;
