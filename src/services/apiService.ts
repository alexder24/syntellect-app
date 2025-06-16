export interface Country {
    name: string;
    fullName: string;
    flag: string;
}

const mockCountries: Country[] = [
    { name: 'Russia', fullName: 'Russian Federation', flag: '🇷🇺' },
    { name: 'USA', fullName: 'United States of America', flag: '🇺🇸' },
    { name: 'UK', fullName: 'United Kingdom', flag: '🇬🇧' },
    { name: 'Germany', fullName: 'Federal Republic of Germany', flag: '🇩🇪' },
    { name: 'France', fullName: 'French Republic', flag: '🇫🇷' },
    { name: 'Italy', fullName: 'Italian Republic', flag: '🇮🇹' },
    { name: 'Spain', fullName: 'Kingdom of Spain', flag: '🇪🇸' },
    { name: 'Japan', fullName: 'Japan', flag: '🇯🇵' },
    { name: 'China', fullName: "People's Republic of China", flag: '🇨🇳' },
    { name: 'India', fullName: 'Republic of India', flag: '🇮🇳' },
    { name: 'Brazil', fullName: 'Federative Republic of Brazil', flag: '🇧🇷' },
    { name: 'Canada', fullName: 'Canada', flag: '🇨🇦' },
    { name: 'Australia', fullName: 'Commonwealth of Australia', flag: '🇦🇺' },
    { name: 'Mexico', fullName: 'United Mexican States', flag: '🇲🇽' },
    { name: 'South Korea', fullName: 'Republic of Korea', flag: '🇰🇷' },
    { name: 'Netherlands', fullName: 'Kingdom of the Netherlands', flag: '🇳🇱' },
    { name: 'Switzerland', fullName: 'Swiss Confederation', flag: '🇨🇭' },
    { name: 'Sweden', fullName: 'Kingdom of Sweden', flag: '🇸🇪' },
    { name: 'Poland', fullName: 'Republic of Poland', flag: '🇵🇱' },
    { name: 'Turkey', fullName: 'Republic of Turkey', flag: '🇹🇷' }
];

const getRandomDelay = (min: number, max: number) => 
    Math.floor(Math.random() * (max - min + 1)) + min;

export const getCountryByName = async (searchText: string): Promise<Country[]> => {
    await new Promise(resolve => setTimeout(resolve, getRandomDelay(100, 800)));

    if (!searchText.trim()) {
        return [];
    }

    const searchLower = searchText.toLowerCase();
    return mockCountries.filter(country => 
        country.name.toLowerCase().includes(searchLower) ||
        country.fullName.toLowerCase().includes(searchLower)
    );
}; 