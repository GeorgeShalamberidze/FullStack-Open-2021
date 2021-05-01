import React from 'react'

function Weather({ filteredSearch }) {
    console.log(filteredSearch)
    return (
        <div>
            {filteredSearch.map(country => {
                return (
                    <div key={country.numericCode}>
                        <h2>Weather in {country.name}</h2>
                        <p>temperature: <strong> Celsius</strong></p>
                        <img src='' alt={`weather`} />
                        <p>wind: <strong> Mph</strong>, Direction: <strong></strong></p>
                    </div>
                )
            })}
        </div>
    )
}

export default Weather