import { useState } from "react";

interface TerminalSelectionProps {
  onCalculateAmount: (amount: number) => void;
}

export default function TerminalSelection({ onCalculateAmount }: TerminalSelectionProps) {
  const cities = ["Kaunas", "Vilnius", "Kėdainiai", "Šiauliai", "Klaipėda"];
  const localities = ["Iki gegučių", "Akropolis", "Traukinių stotis"];

  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedLocality, setSelectedLocality] = useState<string>("");

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCityValue = event.target.value;
    setSelectedCity(selectedCityValue);
    setSelectedLocality("");
  };

  const handleLocalityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLocalityValue = event.target.value;
    setSelectedLocality(selectedLocalityValue);
    const calculatedAmount = calculateAmount(selectedCity, selectedLocalityValue);
    onCalculateAmount(calculatedAmount);
  };

  const calculateAmount = (city: string, locality: string): number => {
    //calculate shipping cost
    return 100;
  };

  return (
    <div className="border border-collapse">
      <div className="block text-gray-500">Pasirinkite savo miestą</div>
      <select
        value={selectedCity}
        onChange={handleCityChange}
        className="bg-white text-gray-800 border border-gray-300 rounded-md px-4 py-2 w-full"
      >
        <option value="">Prašome pasirinti miestą</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {selectedCity && ( // Render locality dropdown only if a city is selected
        <div className="block text-gray-500 mt-4">Pasirinkite savo paštomatą</div>
      )}
      {selectedCity && ( // Render locality dropdown only if a city is selected
        <select
          value={selectedLocality}
          onChange={handleLocalityChange}
          className="bg-white text-gray-800 border border-gray-300 rounded-md px-4 py-2 w-full"
        >
          <option value="">Prašome pasirinti paštomatą</option>
          {localities.map((locality) => (
            <option key={locality} value={locality}>
              {locality}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}