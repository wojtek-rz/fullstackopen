import React, { useState } from 'react'
import ShowOneCountry from './ShowOneCountry'

const initial_show_list = (countries) => {
    const init = {}
    countries.forEach((country) => {
        init[country.alpha3Code] = false
    })
    return init
}

const RenderListElement = ({ country, toShow, handleButtonClick}) => {
    if (toShow) {
        return (
            <div>
                <div>
                    {country.name} 
                    <button onClick={handleButtonClick}>Hide</button>
                </div>
                <ShowOneCountry country={country} />
                <br />
            </div>
        )
    }
    else {
        return (
            <div>
                {country.name} 
                <button onClick={handleButtonClick}>Show</button>
            </div>
        )
    }
}

const ShowCountriesList = ({countries}) => {
    const [ showList, setShowList ] = useState(initial_show_list(countries)) 

    const handleButtonClick = (country_code) => {
        const return_function = () => {
            const showListCopy = {...showList}
            showListCopy[country_code] = !showListCopy[country_code]
            setShowList(showListCopy)
        }
        return return_function
    } // function within a function, looks a little bit messy, sorry

    return (
        <div>
            {countries.map((country) => (
                <RenderListElement
                    country={country}
                    toShow={showList[country.alpha3Code]}
                    handleButtonClick={handleButtonClick(country.alpha3Code)}
                    key={country.alpha3Code}
                />
            ))}
        </div>
    )
}

export default ShowCountriesList