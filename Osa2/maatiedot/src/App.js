import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Find = (props) => {
  return (
    <div>
      find countries: <input value={props.input} onChange={props.handle}/>
    </div>
  )
}

const ShowCountries = ({countries}) => {
  console.log(countries)
  return (
      <div>
          {countries.map(country =>
            <List key={country.name} country={country}/>
          )}
      </div>
  )
}

const List = (props) => (
  <p>{props.person.name} {props.person.number}</p>
)

const App = () => {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    axios
    .get('https://restcountries.eu/all')
    .then(response => {
      console.log(response.data)
      setCountries(response.data)
    })
  }, [])

  const handleInput = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <Find input={newSearch} handle={handleInput}/>
      <ShowCountries countries={countries}/>
    </div>
  );
}

export default App;
