import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { 
  CloudRain, 
  CloudSnow, 
  Cloud, 
  Sun, 
  CloudLightning, 
  CloudFog,
  Thermometer,
  Droplets,
  Wind
} from 'lucide-react';

export const CurrentWeather: React.FC = () => {
  const { currentWeather, units } = useWeather();

  if (!currentWeather) return null;

  const getWeatherIcon = (condition: string) => {
    const iconSize = 64;
    
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

  const getFormattedDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 text-white shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold">{currentWeather.city}, {currentWeather.country}</h2>
          <p className="text-blue-100">{getFormattedDate()}</p>
          <div className="mt-6 flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-red-400" />
            <span>Feels like {formatTemperature(currentWeather.feelsLike)}</span>
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          {getWeatherIcon(currentWeather.condition.toLowerCase())}
          <p className="mt-2 capitalize text-lg">{currentWeather.condition}</p>
        </div>
        
        <div className="text-center md:text-right mt-4 md:mt-0">
          <div className="text-6xl font-bold">
            {formatTemperature(currentWeather.temperature)}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="flex items-center gap-1">
              <Droplets className="h-4 w-4 text-blue-300" />
              <span>{currentWeather.humidity}%</span>
            </div>
            <div className="flex items-center gap-1">
              <Wind className="h-4 w-4 text-blue-300" />
              <span>{currentWeather.windSpeed} {units === 'metric' ? 'm/s' : 'mph'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};