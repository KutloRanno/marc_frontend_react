import { useEffect, useState } from "react";
import styles from "./DropDown.module.css";

const baseUrl = `https://restcountries.com/v3.1/all`;
function DropDown() {
  const [countries, setCountries] = useState([]);

  useEffect(function () {
    async function getCountries() {
      try {
        const res = await fetch(baseUrl);
        const data = await res.json();
        setCountries((prevCountries) => [...prevCountries, ...data]);
      } catch (e) {
        console.error(e.message);
      }
    }
    getCountries();
  }, []);

  return (
    <>
      <select className={styles.select}>
        <option key={"default"} value={"Country"}>
          Select a country
        </option>
        {countries.map((country) => (
          <option
            key={
              country.cca3 +
              "@" +
              country.ccn3 +
              "@" +
              country.cca2 +
              "@" +
              crypto.randomUUID()
            }
            value={country.countryCode}
          >
            {country.name.common}
          </option>
        ))}
      </select>
    </>
  );
}

export default DropDown;
