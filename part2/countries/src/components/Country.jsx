const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>
        Capital {country.capital[0]} <br />
        Area {country.area} <br />
      </p>
      <p>
        <b>languages:</b>
      </p>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img
        src={`https://flagcdn.com/w160/${country.cca2.toLowerCase()}.png`}
        srcSet={`https://flagcdn.com/w320/${country.cca2.toLowerCase()}.png 2x`}
        width='160'
        alt={country.name.common}
      ></img>
    </div>
  );
};

export default Country;
