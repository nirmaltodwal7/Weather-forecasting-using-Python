import React from 'react';
import { WeatherDashboard } from './components/WeatherDashboard';
import { WeatherProvider } from './context/WeatherContext';

function App() {
  return (
    <WeatherProvider>
      <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 dark:from-blue-900 dark:to-slate-900">
        <WeatherDashboard />
      </div>
    </WeatherProvider>
  );
}

export default App;