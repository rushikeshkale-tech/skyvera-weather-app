import React, { useState } from 'react';
import { getWeather, getForecast, getWeatherByCoords, getForecastByCoords } from '../services/api';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';
import Comparison from './Comparison';
import MapExplorer from './MapExplorer';
import EducationalInfo from './EducationalInfo';
import { Search, BarChart2, Home, Map as MapIcon, Info } from 'lucide-react';

const WeatherDashboard = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [view, setView] = useState('dashboard');
    const [error, setError] = useState('');

    const fetchByCity = async (queryCity) => {
        if (!queryCity.trim()) return;
        setLoading(true);
        setError('');
        try {
            const wRes = await getWeather(queryCity);
            const fRes = await getForecast(queryCity);
            setWeather(wRes.data);
            setForecast(fRes.data);
        } catch (e) {
            console.error(e);
            setError('City not found or API error. Try another city.');
            setWeather(null);
            setForecast(null);
        } finally {
            setLoading(false);
        }
    };

    const onSearch = (e) => {
        e.preventDefault();
        fetchByCity(city);
    };

    const renderDashboard = () => (
        <>
            <section className="search-section flex-col flex-center">
                <div style={{ maxWidth: 520, width: '100%', margin: '0 auto', padding: '0 16px' }}>
                    <h2 style={{ marginBottom: 12, fontSize: '1.85rem', fontWeight: 700, textAlign: 'center' }}>
                        Search weather anywhere on Earth
                    </h2>

                    <p style={{ opacity: 0.75, marginBottom: 28, fontSize: '1rem', textAlign: 'center' }}>
                        Enter a city name to view live conditions and forecast.
                    </p>

                    {/* SEARCH INPUT */}
                    <div className="search-container" style={{ width: '100%' }}>
                        <Search className="search-icon" size={20} />
                        <input
                            className="glass-input"
                            placeholder="Search city, country..."
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>

                    {/* 🔥 BUTTON CENTERED BELOW INPUT */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18 }}>
                        <button
                            className="btn-primary"
                            onClick={onSearch}
                            style={{
                                padding: '14px 32px',
                                fontSize: '1rem',
                                minWidth: 180
                            }}
                        >
                            Search
                        </button>
                    </div>
                </div>

                {error && (
                    <p style={{ marginTop: 16, color: '#f97373', fontSize: '0.95rem', textAlign: 'center' }}>
                        {error}
                    </p>
                )}
            </section>

            {loading ? (
                <div className="flex-center" style={{ height: 280 }}>
                    <div className="loader" />
                </div>
            ) : weather ? (
                <div className="dashboard-grid" style={{ height: '620px' }}>
                    <CurrentWeather data={weather} />
                    <Forecast data={forecast} />
                </div>
            ) : (
                <div className="flex-col flex-center glass" style={{ height: 620, padding: 48, textAlign: 'center' }}>
                    <Search size={64} style={{ opacity: 0.6 }} />
                    <p style={{ marginTop: 16, fontSize: '1.1rem', opacity: 0.8 }}>
                        Start by searching for a city to view its weather snapshot.
                    </p>
                </div>
            )}
        </>
    );

    const renderView = () => {
        if (view === 'dashboard') return renderDashboard();
        if (view === 'map') return <MapExplorer />;
        if (view === 'compare') return <Comparison />;
        if (view === 'info') return <EducationalInfo />;
        return null;
    };

    return (
        <div className="page-fade">
            <div className="nav-wrapper">
                <nav className="desktop-nav">
                    <button className={`btn-nav ${view === 'dashboard' ? 'active' : ''}`} onClick={() => setView('dashboard')}>
                        <Home size={18} /> Dashboard
                    </button>
                    <button className={`btn-nav ${view === 'map' ? 'active' : ''}`} onClick={() => setView('map')}>
                        <MapIcon size={18} /> Global Map
                    </button>
                    <button className={`btn-nav ${view === 'compare' ? 'active' : ''}`} onClick={() => setView('compare')}>
                        <BarChart2 size={18} /> Compare
                    </button>
                    <button className={`btn-nav ${view === 'info' ? 'active' : ''}`} onClick={() => setView('info')}>
                        <Info size={18} />  Weather Guide
                    </button>
                </nav>
            </div>

            {renderView()}
        </div>
    );
};

export default WeatherDashboard;
