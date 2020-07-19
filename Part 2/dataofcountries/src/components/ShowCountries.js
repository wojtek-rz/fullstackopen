import React from 'react'
import ShowOneCountry from './ShowOneCountry'
import ShowCountriesList from './ShowCountriesList'

const ShowCountries = ({countries, dataLoaded}) => {

    if (!dataLoaded) {
        return <div>Loading data...</div>
    } 
    else if (countries.length > 10) {
        return <div>To many matches, specify another filter</div>
    }
    else if (countries.length > 1) {
        return <ShowCountriesList countries={countries} />
    }
    else if (countries.length === 1) {
        return <ShowOneCountry country={countries[0]} />
    }
    else {
        return <div>No matches found</div>
    }
}

export default ShowCountries