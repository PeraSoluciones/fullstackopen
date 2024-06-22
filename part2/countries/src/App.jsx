import { useEffect, useState } from 'react';
import getAll from './services/countries';
import Countries from './components/Countries';

function App() {
  const [value, setValue] = useState('');
  const [countries, setCountries] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState(null);

  useEffect(() => {
    getAll().then((countries) => setCountries(countries));
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    setFilteredCountries(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(value.toLowerCase())
      )
    );
    setValue(value);
  };

  return (
    <>
      <form>
        <span>
          find countries <input value={value} onChange={handleSearch} />
        </span>
      </form>
      <br />
      {filteredCountries && value && (
        <Countries countries={filteredCountries} />
      )}
    </>
  );
}

export default App;
