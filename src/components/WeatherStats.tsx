import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { 
  Sunrise, 
  Sunset, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge,
  Thermometer
} from 'lucide-react';

export const WeatherStats: React.FC = () => {
  const { currentWeather, units } = useWeather();

  if (!currentWeather) return null;

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const StatItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
    <div className="flex items-center justify-between p-3 border-b border-blue-100/20">
      <div className="flex items-center gap-3">
        {icon}
        <span>{label}</span>
      </div>
      <span className="font-medium">{value}</span>
    </div>
  );

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 text-white shadow-lg h-full">
      <h3 className="text-xl font-semibold mb-4">Weather Details</h3>
      
      <div className="space-y-1">
        <StatItem 
          icon={<Thermometer className="h-5 w-5 text-red-400" />}
          label="Feels Like"
          value={`${Math.round(currentWeather.feelsLike)}°${units === 'metric' ? 'C' : 'F'}`}
        />
        
        <StatItem 
          icon={<Droplets className="h-5 w-5 text-blue-400" />}
          label="Humidity"
          value={`${currentWeather.humidity}%`}
        />
        
        <StatItem 
          icon={<Wind className="h-5 w-5 text-blue-300" />}
          label="Wind"
          value={`${currentWeather.windSpeed} ${units === 'metric' ? 'm/s' : 'mph'}`}
        />
        
        <StatItem 
          icon={<Gauge className="h-5 w-5 text-green-400" />}
          label="Pressure"
          value={`${currentWeather.pressure} hPa`}
        />
        
        <StatItem 
          icon={<Eye className="h-5 w-5 text-purple-300" />}
          label="Visibility"
          value={`${currentWeather.visibility / 1000} km`}
        />
        
        <StatItem 
          icon={<Sunrise className="h-5 w-5 text-yellow-400" />}
          label="Sunrise"
          value={formatTime(currentWeather.sunrise)}
        />
        
        <StatItem 
          icon={<Sunset className="h-5 w-5 text-orange-400" />}
          label="Sunset"
          value={formatTime(currentWeather.sunset)}
        />
      </div>
    </div>
  );
};