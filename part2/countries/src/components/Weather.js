import React from 'react'

function Weather() {
    return (
        <div>
            <h2>Weather in Tbilisi</h2>
            <p>temperature: <strong> Celsius</strong></p>
            <img src='' alt={`weather`} />
            <p>wind: <strong> Mph</strong>, Direction: <strong></strong></p>
        </div>
    )

}

export default Weather