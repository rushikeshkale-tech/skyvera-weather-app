import React, { useState, useEffect } from 'react';
import WeatherDashboard from "./components/WeatherDashboard";
import Footer from "./components/Footer";
import { Sun, Moon } from 'lucide-react';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="app-container">
      <header
        className="flex-row"
        style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}
      >
        <div>
          <h1
            className="text-gradient"
            style={{ margin: 0, fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.04em' }}
          >
            Skyvera
          </h1>
          <p style={{ marginTop: 6, fontSize: '0.95rem', opacity: 0.7 }}>
            See the sky with smarter clarity
          </p>
        </div>

        <button
          className="glass flex-center"
          onClick={toggleTheme}
          style={{
            width: 46,
            height: 46,
            borderRadius: 999,
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={22} />}
        </button>
      </header>

      <WeatherDashboard />

      {/* Footer at bottom */}
      <Footer />
    </div>
  );
}

export default App;
