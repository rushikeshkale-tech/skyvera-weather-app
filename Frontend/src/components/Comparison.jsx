import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Comparison = () => {
    const [city1, setCity1] = useState('');
    const [city2, setCity2] = useState('');
    const [data1, setData1] = useState(null);
    const [data2, setData2] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasCompared, setHasCompared] = useState(false); // NEW
    const [error, setError] = useState(''); // NEW

    const isValidCity = (city) => /^[a-zA-Z\s]{2,}$/.test(city.trim());

    const compareCities = async () => {
        setError('');
        setHasCompared(false);

        if (!isValidCity(city1) || !isValidCity(city2)) {
            setData1(null);
            setData2(null);
            return setError("Enter valid city names only");
        }

        setLoading(true);

        setTimeout(() => {
            setData1({
                name: city1,
                main: { temp: 15 + city1.length, humidity: 80, feels_like: 13 + city1.length },
                wind: { speed: 4 }
            });
            setData2({
                name: city2,
                main: { temp: 22 + city2.length, humidity: 60, feels_like: 22 + city2.length },
                wind: { speed: 3 }
            });
            setLoading(false);
            setHasCompared(true); // show results now
        }, 1000);
    };

    // 🚫 REMOVED auto useEffect call

    const chartData = data1 && data2 && {
        labels: ['Temperature (°C)', 'Humidity (%)', 'Wind (m/s)', 'Feels Like (°C)'],
        datasets: [
            {
                label: data1.name,
                data: [data1.main.temp, data1.main.humidity, data1.wind.speed, data1.main.feels_like],
                backgroundColor: 'rgba(102, 126, 234, 0.85)',
                borderRadius: 10,
            },
            {
                label: data2.name,
                data: [data2.main.temp, data2.main.humidity, data2.wind.speed, data2.main.feels_like],
                backgroundColor: 'rgba(246, 147, 251, 0.85)',
                borderRadius: 10,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(255,255,255,0.08)' },
                ticks: { color: 'rgba(255,255,255,0.85)' }
            },
            x: {
                grid: { display: false },
                ticks: { color: 'rgba(255,255,255,0.85)' }
            }
        },
    };

    const winner =
        data1 && data2 &&
        (Math.abs(data1.main.temp - 22) < Math.abs(data2.main.temp - 22)
            ? data1.name
            : data2.name);

    return (
        <div className="animated-entry" style={{ padding: '0 16px' }}>
            <h2 className="mb-12 text-center" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800 }}>
                Weather <span className="text-gradient">Battle</span>
            </h2>

            {/* MODERN CITY INPUTS (UNCHANGED UI) */}
            <div className="glass mb-12" style={{ maxWidth: '900px', margin: '0 auto 3rem', padding: '32px' }}>
                <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
                    <input
                        value={city1}
                        onChange={(e) => setCity1(e.target.value)}
                        className="glass-input"
                        placeholder="Enter First City"
                        style={{ flex: 1, minWidth: 220, fontSize: '1.05rem' }}
                    />
                    <div style={{ width: '100%', textAlign: 'center', fontSize: '2rem', opacity: 0.4 }}>VS</div>
                    <input
                        value={city2}
                        onChange={(e) => setCity2(e.target.value)}
                        className="glass-input"
                        placeholder="Enter Second City"
                        style={{ flex: 1, minWidth: 220, fontSize: '1.05rem' }}
                    />
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 12 }}>
                        <button onClick={compareCities} className="btn-primary" style={{ padding: '14px 40px', fontSize: '1rem' }}>
                            Compare Cities
                        </button>
                    </div>
                </div>

                {error && <p style={{ color: '#ff6b6b', textAlign: 'center', marginTop: 15 }}>{error}</p>}
            </div>

            {loading && (
                <div className="flex-center" style={{ height: '60vh' }}>
                    <div className="loader" style={{ width: '60px', height: '60px' }}></div>
                </div>
            )}

            {/* RESULTS SECTION (UI SAME, only condition added) */}
            {hasCompared && data1 && data2 && (
                <>
                    <div className="glass mb-6" style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px', position: 'relative' }}>
                        <h3 style={{ textAlign: 'center', marginBottom: 10, fontSize: '1.6rem' }}>
                            📈 Analytical Weather Comparison
                        </h3>
                        <p style={{ textAlign: 'center', opacity: 0.7, marginBottom: 30 }}>
                            This chart compares temperature comfort, humidity balance, and wind intensity between both cities.
                        </p>

                        <div style={{ height: '420px' }}>
                            <Bar options={options} data={chartData} />
                        </div>
                    </div>

                    <div style={{
                        maxWidth: '1000px',
                        margin: '0 auto 3rem',
                        display: 'grid',
                        gap: 20,
                        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))'
                    }}>
                        {[data1, data2].map((city, i) => (
                            <div key={i} className="glass" style={{ padding: '24px', textAlign: 'center' }}>
                                <h4 className="text-gradient" style={{ fontSize: '1.4rem', marginBottom: 10 }}>{city.name}</h4>
                                <p>🌡 Temp: <strong>{city.main.temp}°C</strong></p>
                                <p>💧 Humidity: <strong>{city.main.humidity}%</strong></p>
                                <p>🌬 Wind: <strong>{city.wind.speed} m/s</strong></p>
                                <p>🤔 Feels Like: <strong>{city.main.feels_like}°C</strong></p>
                            </div>
                        ))}
                    </div>

                    <div className="glass flex-col" style={{
                        maxWidth: '650px',
                        margin: '0 auto',
                        padding: '40px',
                        border: '2px solid rgba(102,126,234,0.4)',
                        background: 'linear-gradient(135deg, rgba(102,126,234,0.18), rgba(118,75,162,0.18))',
                        textAlign: 'center'
                    }}>
                        <h3 className="mb-8 flex-center gap-3" style={{ fontSize: '2rem' }}>
                            🏆 Winner: <span className="text-gradient">{winner}</span>
                        </h3>
                        <p style={{ fontSize: '1.2rem', lineHeight: 1.6, opacity: 0.9 }}>
                            Based on comfort-focused metrics, <strong className="text-gradient">{winner}</strong> currently offers more favorable outdoor conditions.
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

export default Comparison;
