import { CurrentWeatherType, ForecastDayType } from '../context/WeatherContext';

// Mock API key (in a real app, this would be in .env)
const API_KEY = 'mock-api-key';

// Mock API URLs (in a real app, we'd use actual OpenWeatherMap endpoints)
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Mock data for demo purposes
const mockCities = {
  'london': {
    current: {
      city: 'London',
      country: 'GB',
      temperature: 12,
      feelsLike: 10,
      humidity: 65,
      windSpeed: 5.2,
      pressure: 1012,
      visibility: 10000,
      condition: 'Cloudy',
      sunrise: 1684391400,
      sunset: 1684445700,
    },
    forecast: [
      { date: '2023-05-18', minTemp: 10, maxTemp: 15, condition: 'Cloudy' },
      { date: '2023-05-19', minTemp: 11, maxTemp: 16, condition: 'Rain' },
      { date: '2023-05-20', minTemp: 12, maxTemp: 18, condition: 'Clear' },
      { date: '2023-05-21', minTemp: 13, maxTemp: 19, condition: 'Clear' },
      { date: '2023-05-22', minTemp: 12, maxTemp: 17, condition: 'Cloudy' },
    ]
  },
  'new york': {
    current: {
      city: 'New York',
      country: 'US',
      temperature: 22,
      feelsLike: 23,
      humidity: 55,
      windSpeed: 4.1,
      pressure: 1015,
      visibility: 15000,
      condition: 'Clear',
      sunrise: 1684391100,
      sunset: 1684443000,
    },
    forecast: [
      { date: '2023-05-18', minTemp: 18, maxTemp: 24, condition: 'Clear' },
      { date: '2023-05-19', minTemp: 17, maxTemp: 23, condition: 'Clear' },
      { date: '2023-05-20', minTemp: 19, maxTemp: 26, condition: 'Clear' },
      { date: '2023-05-21', minTemp: 20, maxTemp: 28, condition: 'Clear' },
      { date: '2023-05-22', minTemp: 22, maxTemp: 30, condition: 'Partly Cloudy' },
    ]
  },
  'tokyo': {
    current: {
      city: 'Tokyo',
      country: 'JP',
      temperature: 25,
      feelsLike: 26,
      humidity: 70,
      windSpeed: 3.5,
      pressure: 1008,
      visibility: 9000,
      condition: 'Rain',
      sunrise: 1684390200,
      sunset: 1684441900,
    },
    forecast: [
      { date: '2023-05-18', minTemp: 22, maxTemp: 27, condition: 'Rain' },
      { date: '2023-05-19', minTemp: 21, maxTemp: 26, condition: 'Rain' },
      { date: '2023-05-20', minTemp: 20, maxTemp: 25, condition: 'Cloudy' },
      { date: '2023-05-21', minTemp: 22, maxTemp: 28, condition: 'Clear' },
      { date: '2023-05-22', minTemp: 23, maxTemp: 29, condition: 'Clear' },
    ]
  },
  'sydney': {
    current: {
      city: 'Sydney',
      country: 'AU',
      temperature: 18,
      feelsLike: 17,
      humidity: 62,
      windSpeed: 6.8,
      pressure: 1014,
      visibility: 12000,
      condition: 'Partly Cloudy',
      sunrise: 1684390800,
      sunset: 1684442500,
    },
    forecast: [
      { date: '2023-05-18', minTemp: 15, maxTemp: 20, condition: 'Partly Cloudy' },
      { date: '2023-05-19', minTemp: 14, maxTemp: 19, condition: 'Cloudy' },
      { date: '2023-05-20', minTemp: 13, maxTemp: 18, condition: 'Rain' },
      { date: '2023-05-21', minTemp: 15, maxTemp: 21, condition: 'Partly Cloudy' },
      { date: '2023-05-22', minTemp: 16, maxTemp: 22, condition: 'Clear' },
    ]
  },
  'paris': {
    current: {
      city: 'Paris',
      country: 'FR',
      temperature: 15,
      feelsLike: 14,
      humidity: 58,
      windSpeed: 4.7,
      pressure: 1013,
      visibility: 11000,
      condition: 'Clear',
      sunrise: 1684391300,
      sunset: 1684445200,
    },
    forecast: [
      { date: '2023-05-18', minTemp: 13, maxTemp: 18, condition: 'Clear' },
      { date: '2023-05-19', minTemp: 14, maxTemp: 19, condition: 'Clear' },
      { date: '2023-05-20', minTemp: 15, maxTemp: 21, condition: 'Partly Cloudy' },
      { date: '2023-05-21', minTemp: 14, maxTemp: 20, condition: 'Cloudy' },
      { date: '2023-05-22', minTemp: 13, maxTemp: 19, condition: 'Rain' },
    ]
  },
};

// Default mock data for unknown cities or geolocation
const defaultMockData = {
  current: {
    city: 'San Francisco',
    country: 'US',
    temperature: 17,
    feelsLike: 16,
    humidity: 68,
    windSpeed: 5.5,
    pressure: 1016,
    visibility: 13000,
    condition: 'Partly Cloudy',
    sunrise: 1684390600,
    sunset: 1684444000,
  },
  forecast: [
    { date: '2023-05-18', minTemp: 15, maxTemp: 19, condition: 'Partly Cloudy' },
    { date: '2023-05-19', minTemp: 14, maxTemp: 18, condition: 'Cloudy' },
    { date: '2023-05-20', minTemp: 15, maxTemp: 20, condition: 'Partly Cloudy' },
    { date: '2023-05-21', minTemp: 16, maxTemp: 21, condition: 'Clear' },
    { date: '2023-05-22', minTemp: 17, maxTemp: 22, condition: 'Clear' },
  ]
};

// Simulate API response delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Convert units (this would be unnecessary with a real API)
const convertUnits = (data: any, units: 'metric' | 'imperial') => {
  if (units === 'imperial') {
    // Convert temperatures from Celsius to Fahrenheit
    const current = {
      ...data.current,
      temperature: Math.round(data.current.temperature * 9/5 + 32),
      feelsLike: Math.round(data.current.feelsLike * 9/5 + 32),
      windSpeed: Math.round(data.current.windSpeed * 2.237 * 10) / 10, // m/s to mph
    };
    
    const forecast = data.forecast.map((day: any) => ({
      ...day,
      minTemp: Math.round(day.minTemp * 9/5 + 32),
      maxTemp: Math.round(day.maxTemp * 9/5 + 32),
    }));
    
    return { current, forecast };
  }
  
  return data; // Already in metric
};

// Mock API service
export const weatherApi = {
  getWeatherByCity: async (
    city: string, 
    units: 'metric' | 'imperial'
  ): Promise<{ current: CurrentWeatherType; forecast: ForecastDayType[] }> => {
    // Simulate network delay
    await delay(800);
    
    // Lookup city in mock data (case insensitive)
    const cityKey = city.toLowerCase();
    const data = mockCities[cityKey as keyof typeof mockCities] || defaultMockData;
    
    // Convert units if needed
    return convertUnits(data, units);
  },
  
  getWeatherByCoords: async (
    lat: number, 
    lon: number, 
    units: 'metric' | 'imperial'
  ): Promise<{ current: CurrentWeatherType; forecast: ForecastDayType[] }> => {
    // Simulate network delay
    await delay(800);
    
    // Return default data for any coordinates (in a real app, we'd use the coords)
    const data = defaultMockData;
    
    // Convert units if needed
    return convertUnits(data, units);
  }
};