import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Inquiry from './components/Inquiry'
import ShowCountries from './components/ShowCountries'

const App = () => {
  const [ countries, setCountries ] = useState([]) 
  const [ inquiry, setInquiry ] = useState('sw')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((response) => {
        console.log('promise fulfilled')
        console.log(response.data)
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = countries
  .filter((country) => country.name.toLowerCase().includes(inquiry.toLowerCase()))

  console.log('rendering', countriesToShow.length, 'countries')

  const handleInquiryChange = (event) => {
    setInquiry(event.target.value)
  }

  return (
  <div>
    <Inquiry
      inquiry={inquiry}
      handleInquiryChange={handleInquiryChange}
    />
    
    <ShowCountries
      countries={countriesToShow}
      dataLoaded={countries.length}
    />
  </div>
  );
}

export default App;
