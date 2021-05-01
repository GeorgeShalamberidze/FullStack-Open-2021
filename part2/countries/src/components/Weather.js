import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Weather({ filteredSearch }) {
    const [weather, setWeather] = useState([])
    const api_key = process.env.REACT_APP_API_KEY
    const params = {
        access_key: api_key,
        query: filteredSearch.filter(f => f.name),
        units: 'm'
    }

    useEffect(() => {
        axios
            .get("http://api.weatherstack.com/current", { params })
            .then(res => {
                const data = res.data
                setWeather(data)
            })
    }, [])
    console.log(weather)

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