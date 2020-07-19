import React from 'react'
import DisplayWeather from './DisplayWeather'

const ShowOneCountry = ({country}) => {
    console.log('rendering country widget')
    return (
        <div>
            <h2>{country.name}</h2>
            <div>capital: {country.capital}</div>
            <div>population: {country.population}</div>
            <h3>Languages</h3>
            <ul>
                {country.languages.map((language) => (
                    <li key={language.iso639_2}>{language.name}</li>
                ))}
            </ul>
            <img src={country.flag} height="100" alt="countries flag"/>
            <DisplayWeather city={country.capital}/>
        </div>
    )
}

export default ShowOneCountry