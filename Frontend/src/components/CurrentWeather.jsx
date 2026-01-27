import React from 'react';
import { Wind, Droplets, Thermometer, ArrowUp, ArrowDown } from 'lucide-react';

const CurrentWeather = ({ data }) => {
    if (!data) return null;

    const { main, weather, wind, name, sys } = data;
    const current = weather?.[0] || {};

    return (
        <div className="glass animated-entry" style={{ padding: 20 }}>
            <div
                className="flex-row mb-6"
                style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}
            >
                <div>
                    <h2 className="text-gradient" style={{ margin: 0, fontSize: '2rem', fontWeight: 700 }}>
                        {name}, {sys?.country}
                    </h2>
                    <p
                        style={{
                            marginTop: 6,
                            opacity: 0.8,
                            fontSize: '0.98rem',
                            textTransform: 'capitalize'
                        }}
                    >
                        {current.description}
                    </p>
                </div>

                <div className="flex-row gap-2">
                    <span
                        className="glass flex-center"
                        style={{
                            padding: '6px 12px',
                            borderRadius: 999,
                            fontSize: '0.86rem'
                        }}
                    >
                        <ArrowUp size={14} style={{ marginRight: 4 }} />
                        {Math.round(main?.temp_max)}°
                    </span>
                    <span
                        className="glass flex-center"
                        style={{
                            padding: '6px 12px',
                            borderRadius: 999,
                            fontSize: '0.86rem'
                        }}
                    >
                        <ArrowDown size={14} style={{ marginRight: 4 }} />
                        {Math.round(main?.temp_min)}°
                    </span>
                </div>
            </div>

            <div className="flex-center" style={{ margin: '18px 0 12px' }}>
                <img
                    src={`https://openweathermap.org/img/wn/${current.icon || '01d'}@4x.png`}
                    alt={current.description || 'weather'}
                    style={{
                        width: 130,
                        height: 130,
                        filter: 'drop-shadow(0 14px 24px rgba(15,23,42,0.7))'
                    }}
                />
            </div>

            <div className="flex-center" style={{ margin: '8px 0 22px' }}>
                <h1 className="text-gradient temp-display">
                    {Math.round(main?.temp)}°C
                </h1>
            </div>

            <div className="grid-3">
                <div
                    className="glass flex-col flex-center"
                    style={{ padding: 14, textAlign: 'center' }}
                >
                    <Droplets size={22} style={{ opacity: 0.9, marginBottom: 6 }} />
                    <span style={{ fontSize: '0.84rem', opacity: 0.7 }}>Humidity</span>
                    <span style={{ fontSize: '1.3rem', fontWeight: 700 }}>
                        {main?.humidity}%
                    </span>
                </div>

                <div
                    className="glass flex-col flex-center"
                    style={{ padding: 14, textAlign: 'center' }}
                >
                    <Wind size={22} style={{ opacity: 0.9, marginBottom: 6 }} />
                    <span style={{ fontSize: '0.84rem', opacity: 0.7 }}>Wind</span>
                    <span style={{ fontSize: '1.3rem', fontWeight: 700 }}>
                        {wind?.speed} m/s
                    </span>
                </div>

                <div
                    className="glass flex-col flex-center"
                    style={{ padding: 14, textAlign: 'center' }}
                >
                    <Thermometer size={22} style={{ opacity: 0.9, marginBottom: 6 }} />
                    <span style={{ fontSize: '0.84rem', opacity: 0.7 }}>Feels like</span>
                    <span style={{ fontSize: '1.3rem', fontWeight: 700 }}>
                        {Math.round(main?.feels_like)}°
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CurrentWeather;
