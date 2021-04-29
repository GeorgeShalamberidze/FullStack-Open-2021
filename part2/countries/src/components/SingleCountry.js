import React from 'react'
import Weather from "./Weather"

function SingleCountry({ filteredSearch }) {
    return (
        <div>
            {filteredSearch.map(country => {
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
            })}
            <Weather />
        </div>
    )
}

export default SingleCountry
