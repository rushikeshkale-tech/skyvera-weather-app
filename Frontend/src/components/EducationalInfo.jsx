import React from 'react';
import { BookOpen, Lightbulb, ShieldCheck, Droplets } from 'lucide-react';

const EducationalInfo = () => {
    const tips = [
        {
            icon: Lightbulb,
            title: 'Understand Heat Index',
            content: 'Combines temperature and humidity to show true "feel" temperature. Above 27°C feels uncomfortable.'
        },
        {
            icon: Droplets,
            title: 'Humidity Guide',
            content: '40-60% is ideal for comfort. High humidity makes hot weather feel worse.'
        },
        {
            icon: ShieldCheck,
            title: 'UV Protection',
            content: 'UV index 3+ requires sunscreen. Check daily forecasts for protection needs.'
        },
        {
            icon: BookOpen,
            title: 'Weather Patterns',
            content: 'Learn local microclimates. Urban areas are 2-3°C warmer than surroundings.'
        },
        {
            icon: Lightbulb,
            title: 'Wind Chill Effect',
            content: 'Cold wind makes temperatures feel lower than actual readings, increasing frostbite risk.'
        },
        {
            icon: Droplets,
            title: 'Rain Probability',
            content: 'A 40% rain chance means rain may occur in 40% of the forecast area, not 40% of the time.'
        },
        {
            icon: ShieldCheck,
            title: 'Air Quality Awareness',
            content: 'High pollution levels can worsen breathing issues. Always check AQI during outdoor plans.'
        },
        {
            icon: BookOpen,
            title: 'Cloud Types Matter',
            content: 'Dark towering clouds often indicate storms, while thin high clouds signal weather change.'
        },
        {
            icon: Lightbulb,
            title: 'Morning vs Evening Temps',
            content: 'Temperatures usually drop before sunrise and peak mid-afternoon, not at noon.'
        },
        {
            icon: Droplets,
            title: 'Dew Point Comfort',
            content: 'A dew point above 18°C feels sticky and uncomfortable, even if temperature is moderate.'
        },
        {
            icon: ShieldCheck,
            title: 'Storm Safety',
            content: 'During thunderstorms, avoid open fields and tall objects. Lightning can strike far from rain.'
        },
        {
            icon: BookOpen,
            title: 'Seasonal Shifts',
            content: 'Weather patterns change gradually. Sudden swings often signal strong pressure systems.'
        },
        {
            icon: Lightbulb,
            title: 'Pressure Changes',
            content: 'Falling air pressure usually means rain or storms are approaching.'
        },
        {
            icon: Droplets,
            title: 'Fog Formation',
            content: 'Fog occurs when air cools to its dew point, reducing visibility during early mornings.'
        },
        {
            icon: ShieldCheck,
            title: 'Hydration in Heat',
            content: 'Hot and humid weather increases dehydration risk even if you don’t feel sweaty.'
        },
        {
            icon: BookOpen,
            title: 'Urban Heat Islands',
            content: 'Cities trap heat due to concrete and asphalt, making nights warmer than rural areas.'
        }
    ];

    return (
        <div className="animated-entry" style={{ padding: '0 16px' }}>
            <h2 className="text-center mb-12" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800 }}>
                <span className="text-gradient">Weather</span>  Guide
            </h2>

            {/* Responsive Grid */}
            <div
                style={{
                    maxWidth: '1000px',
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '28px'
                }}
            >
                {tips.map((tip, index) => (
                    <div
                        key={index}
                        className="glass"
                        style={{
                            padding: '28px',
                            borderRadius: '20px',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                        }}
                    >
                        <div
                            className="flex-center mb-6"
                            style={{
                                width: '70px',
                                height: '70px',
                                background: 'linear-gradient(135deg, rgba(102,126,234,0.25), rgba(6,182,212,0.25))',
                                borderRadius: '18px',
                                margin: '0 auto 20px'
                            }}
                        >
                            <tip.icon size={30} style={{ color: '#6366f1' }} />
                        </div>

                        <h3 className="mb-4 text-center" style={{ fontSize: '1.4rem', fontWeight: 700 }}>
                            {tip.title}
                        </h3>

                        <p style={{ opacity: 0.9, lineHeight: 1.7, fontSize: '1.05rem', textAlign: 'center' }}>
                            {tip.content}
                        </p>
                    </div>
                ))}
            </div>

            {/* Pro Tip Card */}
            <div
                className="glass mt-16"
                style={{
                    maxWidth: '700px',
                    margin: '4rem auto',
                    padding: 'clamp(20px, 4vw, 40px)',
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, rgba(102,126,234,0.15), rgba(118,75,162,0.15))'
                }}
            >
                <h3 className="mb-6" style={{ fontSize: '1.8rem', fontWeight: 700 }}>
                    Pro Tip ✨
                </h3>
                <p style={{ fontSize: '1.15rem', lineHeight: 1.8, opacity: 0.95 }}>
                    Always check <strong>feels like</strong> temperature over actual temperature.
                    It's what your body actually experiences!
                </p>
            </div>
        </div>
    );
};

export default EducationalInfo;
