import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SingleCountry from "./components/SingleCountry"
import MultipleCountries from "./components/MultipleCountries"

function App() {
  const [countries, setCountries] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [weather, setWeather] = useState([])
  const [randomCity, setRandomCity] = useState("Tbilisi")
  const api_key = process.env.REACT_APP_API_KEY

  const params = {
      access_key: api_key,
      query: randomCity,
      units: 'm'
  }

  const test = (a) => {
    setRandomCity(a)
  }

  useEffect(() => {
    axios
        .get("http://api.weatherstack.com/current", { params })
        .then(res => {
            const data = res.data
            if (data) {
                setWeather(data)
            }
        })
}, [])

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(res => {
        setCountries(res.data)
      })
  }, [])

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value)
  }

  const filteredSearch = countries.filter(country => country.name.toLowerCase().includes(searchInput.toLowerCase()))

  return (
    <div>
      <form>
        <div>
          Search Countries: <input value={searchInput} onChange={handleSearchInput} />
        </div>
      </form>
      {filteredSearch.length > 10
        ? "Too Many Matches, specify country name"
        : filteredSearch.length == 1
          ? <SingleCountry
            filteredSearch={filteredSearch}
            test={test}
          />
          : <MultipleCountries
            filteredSearch={filteredSearch}
            setSearchInput={setSearchInput}
          />}
    </div>
  )
}

export default App