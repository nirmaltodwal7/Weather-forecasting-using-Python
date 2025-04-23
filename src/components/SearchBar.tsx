import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

export const SearchBar: React.FC = () => {
  const { fetchWeatherByCity, searchCities } = useWeather();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.length >= 3) {
        const results = searchCities(query);
        setSuggestions(results);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, searchCities]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      fetchWeatherByCity(query);
      setQuery('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (city: string) => {
    fetchWeatherByCity(city);
    setQuery('');
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSearch} className="flex">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-blue-300" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a city..."
            className="block w-full pl-10 pr-3 py-2 rounded-l-lg border-none bg-white/20 backdrop-blur-sm text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-4 py-2 rounded-r-lg transition-colors duration-200"
        >
          Search
        </button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef} 
          className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto"
        >
          <ul>
            {suggestions.map((city, index) => (
              <li 
                key={index}
                onClick={() => handleSuggestionClick(city)}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              >
                {city}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};