import { useState } from 'react';
import Country from './Country';
import CountryWeather from './CountryWeather';

const Countries = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const handleShowCountry = (country) => {
    const selectedCountry = {
      ...country,
      showCountry: country?.showCountry ? false : true,
    };
    setSelectedCountry(selectedCountry);
  };

  const totalFiltered = countries.length;
  if (totalFiltered === 1)
    return (
      <>
        <Country country={countries[0]} />;
        <CountryWeather country={countries[0]} />
      </>
    );
  if (totalFiltered > 1 && totalFiltered <= 10)
    return (
      <div>
        {countries.map((country) => (
          <div key={country.cca2}>
            {country.name.common}
            &nbsp;
            <button
              onClick={() =>
                handleShowCountry(
                  selectedCountry?.cca2 === country.cca2
                    ? selectedCountry
                    : country
                )
              }
            >
              {selectedCountry?.showCountry &&
              selectedCountry?.cca2 === country.cca2
                ? 'Hide'
                : 'Show'}
            </button>
            {selectedCountry?.showCountry &&
              selectedCountry?.cca2 === country.cca2 && (
                <>
                  <Country country={country} />
                  <CountryWeather country={country} />
                </>
              )}
          </div>
        ))}
      </div>
    );
  if (totalFiltered > 10)
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    );
  return <></>;
};

export default Countries;
