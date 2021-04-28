import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(res => {
        setCountries(res.data)
      })
  }, [])


  const handleSearchInput = (e) => setSearchInput(e.target.value)
  const filteredSearch = countries.filter(country => country.name.toLowerCase().includes(searchInput.toLowerCase()))
  
  console.log(filteredSearch)

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
          ? filteredSearch.map((country, id) => {
            return (
              <div key={country.numericCode}>
                <h1>{country.name}</h1>
                <p>Currency: <strong>{country.currencies[0].name}</strong></p>
                <p>Capital: <strong>{country.capital}</strong></p>
                <p>Population: <strong>{country.population}</strong></p>
                <h3>Languages: </h3>
                {country.languages.map((lang, id) => {
                  return (
                    <li key={id}>{lang.name}</li>
                  )
                })}
                <br />
                <img src={country.flag} alt="flag" style={{ width: "250px", height: "150px" }} />
              </div>
            )
          })
          : filteredSearch.map(country => {
            return (
              <div key={country.numericCode}>
                <p style={{display: "inline-block", margin: "5px"}}>{country.name}</p>
                <button onClick={() => setSearchInput(country.name)} value={country.numericCode}>Show</button>
                {}
              </div>
            )
          })}
    </div>
  )
}

export default App