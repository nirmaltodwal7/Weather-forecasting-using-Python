import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { 
  CloudRain, 
  CloudSnow, 
  Cloud, 
  Sun, 
  CloudLightning, 
  CloudFog 
} from 'lucide-react';

export const Forecast: React.FC = () => {
  const { forecast, units } = useWeather();

  if (!forecast || forecast.length === 0) return null;

  const getWeatherIcon = (condition: string) => {
    const iconSize = 36;
    
    if (condition.includes('rain') || condition.includes('drizzle')) {
      return <CloudRain size={iconSize} className="text-blue-400" />;
    } else if (condition.includes('snow')) {
      return <CloudSnow size={iconSize} className="text-blue-200" />;
    } else if (condition.includes('cloud')) {
      return <Cloud size={iconSize} className="text-gray-400" />;
    } else if (condition.includes('clear')) {
      return <Sun size={iconSize} className="text-yellow-400" />;
    } else if (condition.includes('thunder') || condition.includes('lightning')) {
      return <CloudLightning size={iconSize} className="text-purple-500" />;
    } else if (condition.includes('fog') || condition.includes('mist')) {
      return <CloudFog size={iconSize} className="text-gray-300" />;
    } else {
      return <Sun size={iconSize} className="text-yellow-400" />;
    }
  };

  const formatTemperature = (temp: number) => {
    return `${Math.round(temp)}°${units === 'metric' ? 'C' : 'F'}`;
  };

  const formatDay = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {forecast.map((day, index) => (
        <div 
          key={index} 
          className="bg-white/20 backdrop-blur-md rounded-xl p-4 text-white text-center transition-transform duration-300 hover:scale-105"
        >
          <h3 className="font-semibold mb-2">{formatDay(day.date)}</h3>
          <div className="flex justify-center my-3">
            {getWeatherIcon(day.condition.toLowerCase())}
          </div>
          <p className="capitalize text-sm mb-3">{day.condition}</p>
          <div className="flex justify-between items-center px-2">
            <span className="text-blue-100">{formatTemperature(day.minTemp)}</span>
            <span className="font-medium">{formatTemperature(day.maxTemp)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};