import { Country, State, City } from 'country-state-city';
import { useState } from 'react';

export const useCountriesStates = (defaultCountry) => {
  const countries = Country.getAllCountries().map(({ name, isoCode }) => ({
    label: name,
    value: isoCode,
  }));

  const [code, setCode] = useState(
    defaultCountry && countries.find((x) => x.label === defaultCountry).value
  );

  const states = State.getStatesOfCountry(code).map(({ name }) => ({
    label: name,
    value: name,
  }));

  const cities = City.getCitiesOfCountry(code).map(({ name }) => ({
    label: name,
    value: name,
  }));

  const onCountryChange = (x) => setCode(x);

  return { countries, states, cities, onCountryChange };
};
