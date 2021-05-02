import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Weather({ filteredSearch }) {
    const [weather, setWeather] = useState([])
    const api_key = process.env.REACT_APP_API_KEY
    const params = {
        access_key: api_key,
        query: filteredSearch[0].capital,
        units: 'm'
    }

    useEffect(() => {
        axios
            .get("http://api.weatherstack.com/current", { params })
            .then(res => {
                setWeather(res.data)
            })
    }, [])

    return weather.location ? (
        <div>
            <h2>Weather in {weather['location'].name}, {weather['location'].country}</h2>
            <p>Temperature: <strong>{weather.current.temperature} Celsius</strong></p>
            <img src={weather.current.weather_icons[0]} alt='weather'/>
            <p>Wind: <strong>{weather.current.wind_speed} Mph, Direction: {weather.current.wind_dir}</strong></p>
        </div>
    ) : (
        <div>
            <h1>Searching...</h1>
        </div>
    )
}

export default Weather