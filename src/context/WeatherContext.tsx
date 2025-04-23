import React, { createContext, useContext, useState, useCallback } from 'react';
import { weatherApi } from '../services/weatherApi';
import { citySearch } from '../utils/citySearch';

// Types
export type CurrentWeatherType = {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  condition: string;
  sunrise: number;
  sunset: number;
};

export type ForecastDayType = {
  date: string;
  minTemp: number;
  maxTemp: number;
  condition: string;
};

type WeatherContextType = {
  currentWeather: CurrentWeatherType | null;
  forecast: ForecastDayType[] | null;
  loading: boolean;
  error: string | null;
  units: 'metric' | 'imperial';
  setUnits: (units: 'metric' | 'imperial') => void;
  fetchWeatherByCity: (city: string) => Promise<void>;
  fetchWeatherByCoords: (lat: number, lon: number) => Promise<void>;
  searchCities: (query: string) => string[];
};

// Create context
const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

// Provider component
export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherType | null>(null);
  const [forecast, setForecast] = useState<ForecastDayType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');

  // Fetch weather by city name
  const fetchWeatherByCity = useCallback(async (city: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await weatherApi.getWeatherByCity(city, units);
      
      setCurrentWeather(data.current);
      setForecast(data.forecast);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error('Error fetching weather:', err);
    } finally {
      setLoading(false);
    }
  }, [units]);

  // Fetch weather by coordinates
  const fetchWeatherByCoords = useCallback(async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await weatherApi.getWeatherByCoords(lat, lon, units);
      
      setCurrentWeather(data.current);
      setForecast(data.forecast);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error('Error fetching weather:', err);
    } finally {
      setLoading(false);
    }
  }, [units]);

  // Search for cities
  const searchCities = (query: string): string[] => {
    return citySearch.search(query);
  };

  // Handle units change
  const handleUnitsChange = useCallback((newUnits: 'metric' | 'imperial') => {
    setUnits(newUnits);
    
    // Refresh weather data with new units
    if (currentWeather) {
      // We need to refetch weather with new units
      fetchWeatherByCity(currentWeather.city);
    }
  }, [currentWeather, fetchWeatherByCity]);

  return (
    <WeatherContext.Provider
      value={{
        currentWeather,
        forecast,
        loading,
        error,
        units,
        setUnits: handleUnitsChange,
        fetchWeatherByCity,
        fetchWeatherByCoords,
        searchCities
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

// Custom hook for using this context
export const useWeather = (): WeatherContextType => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};