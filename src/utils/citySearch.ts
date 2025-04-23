// List of most popular cities for autocomplete
const popularCities = [
  'London, UK', 
  'New York, US', 
  'Tokyo, JP', 
  'Paris, FR', 
  'Sydney, AU',
  'Los Angeles, US',
  'Chicago, US',
  'Shanghai, CN',
  'Berlin, DE',
  'Madrid, ES',
  'Rome, IT',
  'Dubai, AE',
  'Toronto, CA',
  'Hong Kong, HK',
  'Singapore, SG',
  'Moscow, RU',
  'Mumbai, IN',
  'Rio de Janeiro, BR',
  'Amsterdam, NL',
  'Bangkok, TH',
  'Seoul, KR',
  'Cairo, EG',
  'Mexico City, MX',
  'Cape Town, ZA',
  'Stockholm, SE',
  'Vienna, AT',
  'Istanbul, TR',
  'Athens, GR',
  'Buenos Aires, AR',
  'San Francisco, US',
  'Washington DC, US',
  'Vancouver, CA',
  'Prague, CZ',
  'Helsinki, FI',
  'Dublin, IE',
  'Zurich, CH',
  'Lisbon, PT',
  'Auckland, NZ',
  'Oslo, NO',
  'Copenhagen, DK',
  'Brussels, BE',
  'Warsaw, PL',
  'Melbourne, AU',
  'Kuala Lumpur, MY',
  'Manila, PH',
  'Jakarta, ID',
  'Nairobi, KE',
  'Tel Aviv, IL',
  'Geneva, CH',
  'Santiago, CL'
];

// Simple search utility
export const citySearch = {
  search: (query: string): string[] => {
    if (!query || query.length < 2) return [];
    
    const lowercaseQuery = query.toLowerCase();
    
    // Filter cities that match the query
    return popularCities.filter(city => 
      city.toLowerCase().includes(lowercaseQuery)
    ).slice(0, 5); // Limit results to 5
  }
};