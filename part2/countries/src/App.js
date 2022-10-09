import { useState, useEffect } from 'react'
import axios from 'axios'
import css from './App.css'

const Country = ({country}) => {return(<p>{country}</p>)}

const FindCountries = (props) => {
  return(
    <div>
    <p>find countries <input value = {props.search}
     onChange = {props.onChange}></input></p>
    </div>
  )
}

const CountryData = (props) => {
 const datesToRender = props.countryDates.find((country) =>
 (country.name.common === props.countryChoosed[0]))
 const languages = Object.values(datesToRender.languages)

 return(
    <div>
<h2>{datesToRender.name.common}</h2>
<p>capital: {datesToRender.capital}</p>
<p>area: {datesToRender.area}</p>
<p > <b>languages:</b></p>
<ul> {languages.map(lang => <li key = {lang}>{lang}</li>)}</ul>
    <img src={datesToRender.flags.png} width='30%'></img>
    </div>
  )
}

const RenderCountries = (props) => {
if (props.countriesList.length > 10)
{return(<p>Too many matches,specify another filter</p>)}
else if (props.countriesList.length > 1) {
  return(<div>{props.countriesList.map(country =>
    <Country country ={country} key = {country}/>)}</div>
    ) 
}
else if (props.countriesList.length === 1){
  return <CountryData countryChoosed={props.countriesList} 
  countryDates = {props.countryDates}
/>}
else return
}

function App() {
const [search, setSearch] = useState('')
const [countries, setCountries] = useState([])
const [countriesList, setCountriesList] = useState ([])
const [countryDates, setCountryDates] = useState ([])


useEffect(() => {
  axios
  .get('https://restcountries.com/v3.1/all')
  .then(response => {
    const countriesAllDates = response.data
    setCountries(countriesAllDates.map(countrydates =>
       countrydates.name.common))
    setCountryDates(countriesAllDates)
  })})

const handleSearch = (event) => {
setSearch(event.target.value)
let list;
if (event.target.value !== '') {list = countries.filter((country) => 
country.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1)
setCountriesList(list)
}}

  return (
    <>
<FindCountries onChange={handleSearch} value={search} list ={countriesList}/>
<RenderCountries countriesList = {countriesList} 
countries= {countries} search ={search} countryDates={countryDates}/>
    </>
  )
}

export default App