import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { MapPin, Search, Satellite, Map as MapIcon } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Pin Icon
const pinIcon = L.divIcon({
    html: '<div style="width: 32px; height: 40px; background: linear-gradient(135deg, #667Eea 0%, #764Ba2 100%); border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; box-shadow: 0 4px 12px rgba(102,126,234,0.4); display: flex; align-items: center; justify-content: center; border: 3px solid #fff;"><MapPin size={18} color="#fff" /></div>',
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    className: 'custom-pin-marker'
});

const LocationMarker = ({ onLocationSelect }) => {
    const [position, setPosition] = useState(null);

    useMapEvents({
        click(e) {
            const newPos = e.latlng;
            setPosition(newPos);
            const temp = Math.floor(Math.random() * 25 + 5);
            const humidity = Math.floor(Math.random() * 40 + 50);
            const wind = Math.floor(Math.random() * 4 + 1);
            const feels_like = temp + Math.floor(Math.random() * 3 - 1);

            onLocationSelect({
                lat: newPos.lat,
                lng: newPos.lng,
                name: `Your Pin (${newPos.lat.toFixed(1)}°, ${newPos.lng.toFixed(1)}°)`,
                temp,
                humidity,
                wind,
                feels_like,
                isUserPin: true
            });
        }
    });

    return position === null ? null : (
        <Marker position={position} icon={pinIcon}>
            <Popup>
                <div style={{ minWidth: 220, textAlign: 'center' }}>
                    <h4 style={{
                        margin: '0 0 12px 0',
                        fontSize: '1.3rem',
                        fontWeight: 600,
                        color: '#f66f91'
                    }}>
                        📍 Clicked Location
                    </h4>
                    <p>🌡 Lat/Lng: <strong>{position.lat.toFixed(2)}°, {position.lng.toFixed(2)}</strong></p>
                </div>
            </Popup>
        </Marker>
    );
};

const MapExplorer = () => {
    const [mainCities] = useState([

        { name: 'London', lat: 51.505, lng: -0.09, temp: 15, humidity: 80, wind: 4, feels_like: 13 },
        { name: 'New York', lat: 40.7128, lng: -74.0060, temp: 22, humidity: 60, wind: 3, feels_like: 22 },
        { name: 'Tokyo', lat: 35.6895, lng: 139.6917, temp: 18, humidity: 70, wind: 5, feels_like: 17 },
        { name: 'Mumbai', lat: 19.0760, lng: 72.8777, temp: 28, humidity: 85, wind: 2, feels_like: 32 },
        { name: 'Sydney', lat: -33.8688, lng: 151.2093, temp: 25, humidity: 55, wind: 6, feels_like: 24 },
        { name: 'Nagpur', lat: 21.1458, lng: 79.0882, temp: 26, humidity: 65, wind: 3, feels_like: 27 },
        { name: 'Bangalore', lat: 12.9716, lng: 77.5946, temp: 27, humidity: 70, wind: 2, feels_like: 30 },
        { name: 'Hyderabad', lat: 17.3850, lng: 78.4867, temp: 25, humidity: 75, wind: 3, feels_like: 28 },
        { name: 'Pune', lat: 18.5204, lng: 73.8567, temp: 24, humidity: 68, wind: 4, feels_like: 26 },
        { name: 'Chennai', lat: 13.0827, lng: 80.2707, temp: 29, humidity: 82, wind: 5, feels_like: 33 },
        { name: 'Gurgaon', lat: 28.4595, lng: 77.0266, temp: 18, humidity: 60, wind: 2, feels_like: 17 },
        { name: 'Noida', lat: 28.5355, lng: 77.3910, temp: 19, humidity: 62, wind: 3, feels_like: 18 },
        { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714, temp: 26, humidity: 55, wind: 4, feels_like: 28 },
        { name: 'Kolkata', lat: 22.5726, lng: 88.3639, temp: 23, humidity: 78, wind: 6, feels_like: 25 },
        { name: 'Delhi', lat: 28.7041, lng: 77.1025, temp: 20, humidity: 65, wind: 3, feels_like: 19 },
        { name: 'Chandigarh', lat: 30.7333, lng: 76.7794, temp: 17, humidity: 58, wind: 2, feels_like: 16 },
        { name: 'San Francisco', lat: 37.7749, lng: -122.4194, temp: 16, humidity: 72, wind: 8, feels_like: 14 },
        { name: 'Seattle', lat: 47.6062, lng: -122.3321, temp: 12, humidity: 85, wind: 7, feels_like: 10 },
        { name: 'Austin', lat: 30.2672, lng: -97.7431, temp: 21, humidity: 68, wind: 5, feels_like: 22 },
        { name: 'Singapore', lat: 1.3521, lng: 103.8198, temp: 30, humidity: 88, wind: 4, feels_like: 36 },
        { name: 'Dubai', lat: 25.2048, lng: 55.2708, temp: 24, humidity: 52, wind: 10, feels_like: 23 },
        { name: 'Amsterdam', lat: 52.3676, lng: 4.9041, temp: 8, humidity: 82, wind: 12, feels_like: 5 },
        { name: 'Berlin', lat: 52.5200, lng: 13.4050, temp: 6, humidity: 78, wind: 9, feels_like: 3 },
        { name: 'Toronto', lat: 43.6532, lng: -79.3832, temp: -2, humidity: 75, wind: 11, feels_like: -7 }
    ]);

    const [userPins, setUserPins] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [mapType, setMapType] = useState('street'); // 'street' or 'satellite'

    const handleLocationSelect = (locationData) => {
        setUserPins(prev => {
            const cleaned = prev.filter(pin =>
                !(Math.abs(pin.lat - locationData.lat) < 0.001 &&
                    Math.abs(pin.lng - locationData.lng) < 0.001)
            );
            return [locationData, ...cleaned.slice(0, 4)];
        });
    };

    const clearUserPins = () => {
        setUserPins([]);
    };

    const filteredMainCities = mainCities.filter(city =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredUserPins = userPins.filter(pin =>
        pin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="glass" style={{ padding: '32px', minHeight: '70vh' }}>
            <div
                className="flex-row mb-8"
                style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 12
                }}
            >
                <h2 className="flex-center gap-3" style={{ fontSize: '2rem', fontWeight: 700 }}>
                    <MapPin size={28} />
                    Global Cities Map
                </h2>

                <div className="flex-row gap-3" style={{ alignItems: 'center' }}>
                    {/* Satellite Toggle */}
                    <div className="glass flex-center" style={{ padding: '8px 12px', borderRadius: 12, cursor: 'pointer' }}
                        onClick={() => setMapType(mapType === 'street' ? 'satellite' : 'street')}
                    >
                        {mapType === 'satellite' ? <MapIcon size={18} /> : <Satellite size={18} />}
                        <span style={{ fontSize: '0.85rem', marginLeft: 6 }}>
                            {mapType === 'satellite' ? 'Street' : 'Satellite'}
                        </span>
                    </div>

                    <div className="glass flex-center" style={{ padding: '10px 14px', borderRadius: 12 }}>
                        <Search size={18} />
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search Cities"
                            style={{
                                background: 'none',
                                border: 'none',
                                outline: 'none',
                                fontSize: '0.9rem',
                                marginLeft: 6,
                                color: 'inherit',
                                width: 160
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* INTERACTIVE MAP */}
            <div style={{ height: '500px', borderRadius: '20px', overflow: 'hidden', marginBottom: '28px' }}>
                <MapContainer
                    center={[20, 0]}
                    zoom={2.5}
                    minZoom={2}
                    maxZoom={18}
                    style={{ height: '100%', width: '100%', borderRadius: '20px' }}
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url={mapType === 'satellite'
                            ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                            : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        }
                    />
                    <LocationMarker onLocationSelect={handleLocationSelect} />


                    {filteredMainCities.map((city, index) => (
                        <Marker
                            key={`main-${index}`}
                            position={[city.lat, city.lng]}
                            icon={pinIcon}
                        >
                            <Popup>
                                <div style={{ minWidth: 220, textAlign: 'center' }}>
                                    <h4 style={{
                                        margin: '0 0 16px 0',
                                        fontSize: '1.4rem',
                                        fontWeight: 700,
                                        color: '#667Eea'
                                    }}>
                                        🏙️ {city.name}
                                    </h4>
                                    <div style={{ lineHeight: 1.6, fontSize: '1rem' }}>
                                        <p>🌡 Temp: <strong>{city.temp}°C</strong></p>
                                        <p>💧 Humidity: <strong>{city.humidity}%</strong></p>
                                        <p>🌬 Wind: <strong>{city.wind} m/s</strong></p>
                                        <p>🤔 Feels Like: <strong>{city.feels_like}°C</strong></p>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    ))}

                    {/* USER PINS */}
                    {filteredUserPins.map((pin, index) => (
                        <Marker
                            key={`user-${index}-${pin.lat}-${pin.lng}`}
                            position={[pin.lat, pin.lng]}
                            icon={pinIcon}
                        >
                            <Popup>
                                <div style={{ minWidth: 220, textAlign: 'center' }}>
                                    <h4 style={{
                                        margin: '0 0 16px 0',
                                        fontSize: '1.4rem',
                                        fontWeight: 700,
                                        color: '#f66f91'
                                    }}>
                                        📍 {pin.name}
                                    </h4>
                                    <div style={{ lineHeight: 1.6, fontSize: '1rem' }}>
                                        <p>🌡 Temp: <strong>{pin.temp}°C</strong></p>
                                        <p>💧 Humidity: <strong>{pin.humidity}%</strong></p>
                                        <p>🌬 Wind: <strong>{pin.wind} m/s</strong></p>
                                        <p>🤔 Feels Like: <strong>{pin.feels_like}°C</strong></p>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>

            {/* LOCATION COUNT */}
            <div style={{ textAlign: 'center', opacity: 0.8 }}>
                <p style={{ fontSize: '0.95rem' }}>
                    🏙️ <strong>{mainCities.length}</strong> cities |{' '}
                    📍 <strong>{userPins.length}</strong> your pins |{' '}
                    <span style={{ color: mapType === 'satellite' ? '#4caf50' : '#667Eea' }}>
                        {mapType === 'satellite' ? '🛰️ Satellite' : '🗺️ Street'}
                    </span>
                </p>
                {userPins.length > 0 && (
                    <p style={{ fontSize: '0.9rem', marginTop: 4 }}>
                        <span
                            style={{ cursor: 'pointer', color: '#f66f91', fontWeight: 500 }}
                            onClick={clearUserPins}
                        >
                            Clear your pins
                        </span>
                    </p>
                )}
                <p style={{ fontSize: '0.85rem', marginTop: 4, opacity: 0.7 }}>
                    💡 Click anywhere to add pin • Toggle satellite view • Search cities
                </p>
            </div>
        </div>
    );
};

export default MapExplorer;
