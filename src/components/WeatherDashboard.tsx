import React, { useState, useEffect } from 'react';
import { useWeather } from '../context/WeatherContext';
import { SearchBar } from './SearchBar';
import { CurrentWeather } from './CurrentWeather';
import { Forecast } from './Forecast';
import { WeatherStats } from './WeatherStats';
import { UnitToggle } from './UnitToggle';

export const WeatherDashboard: React.FC = () => {
  const { 
    loading, 
    error, 
    currentWeather, 
    forecast,
    units, 
    setUnits,
    fetchWeatherByCoords
  } = useWeather();

  const [locationPermission, setLocationPermission] = useState<boolean | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationPermission(true);
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        () => {
          setLocationPermission(false);
        }
      );
    } else {
      setLocationPermission(false);
    }
  }, [fetchWeatherByCoords]);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Weather Forecast</h1>
        <p className="text-blue-100">Get accurate weather forecasts for any location</p>
      </header>

      <div className="flex justify-center mb-6">
        <SearchBar />
        <UnitToggle units={units} setUnits={setUnits} />
      </div>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-500 text-white p-4 rounded-lg mb-6 text-center">
          {error}
        </div>
      )}

      {!loading && !error && currentWeather && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <CurrentWeather />
          </div>
          <div>
            <WeatherStats />
          </div>
        </div>
      )}

      {!loading && !error && forecast && forecast.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-white mb-4">5-Day Forecast</h2>
          <Forecast />
        </div>
      )}

      {locationPermission === false && (
        <div className="mt-8 text-center text-white">
          <p>
            Enable location services for automatic local weather.
          </p>
        </div>
      )}
    </div>
  );
};