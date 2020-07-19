import React, { useState, useEffect } from 'react'
import axios from 'axios'

const DisplayWhenLoaded = ({ weather, city }) => {
    return (
        <div>
            <h3>Weather in {city}</h3>
            <div><b>Temperature: </b>{weather.temperature} Celcius</div>
            <div>
                <figure>
                    <img src={weather.weather_icons[0]} alt='weather icon' />
                    <figcaption>{weather.weather_descriptions[0]}</figcaption>
                </figure>
            </div>
            <div>
                <b>Wind: </b>{weather.wind_speed} km/h direction {weather.wind_dir}
            </div>
        </div>
    )
}

const DisplayWeather = ({city}) => {
    const [ weather, setWeather ] = useState(0) //its current weather

    const api_key = process.env.REACT_APP_API_KEY
    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current`+
            `?access_key=${api_key}` +
            `&query=${city}`)
            .then((response)=> {
                console.log('weather promise fulfilled')
                setWeather(response.data)
            })
    }, [city, api_key])
    console.log('rendring weather widget')

    if (weather === 0) {
        return <div>Loading weather...</div>
    } else if (weather.success === false) {
        console.log(weather)
        return <div>Failed to load weather</div>
    } else {
        return (<DisplayWhenLoaded 
                weather={weather.current}
                city={city} />)
    }
}

export default DisplayWeather