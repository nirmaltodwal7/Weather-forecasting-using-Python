import React from 'react';
import { useWeather } from '../context/WeatherContext';

type UnitToggleProps = {
  units: string;
  setUnits: (units: 'metric' | 'imperial') => void;
};

export const UnitToggle: React.FC<UnitToggleProps> = ({ units, setUnits }) => {
  return (
    <div className="ml-4 flex items-center space-x-2">
      <button
        onClick={() => setUnits('metric')}
        className={`px-3 py-1 rounded-md transition-colors duration-200 ${
          units === 'metric'
            ? 'bg-white text-blue-600 font-medium'
            : 'bg-transparent text-white hover:bg-white/20'
        }`}
      >
        °C
      </button>
      <span className="text-white">|</span>
      <button
        onClick={() => setUnits('imperial')}
        className={`px-3 py-1 rounded-md transition-colors duration-200 ${
          units === 'imperial'
            ? 'bg-white text-blue-600 font-medium'
            : 'bg-transparent text-white hover:bg-white/20'
        }`}
      >
        °F
      </button>
    </div>
  );
};