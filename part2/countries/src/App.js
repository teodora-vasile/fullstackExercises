import { useState, useEffect } from 'react'
import axios from 'axios'
import css from './App.css'

const Country = ({country, handleShow}) => {
  return(
    <div>
  <p>{country} <button onClick={handleShow} value ={country}>Show</button> </p>
  </div>
  )
  }

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
 const [weather, setWeather] = useState([])
 const API_KEY= process.env.REACT_APP_API_KEY

 useEffect( () => {
 axios
 .get (`https://api.openweathermap.org/data/2.5/weather?q=${datesToRender.capital}&units=metric&appid=${API_KEY}`)
 .then (response => { const cityWeather = response.data;
   setWeather(cityWeather)
 }
   )
   },[]
   )
   
 return(
    <>
      {weather.main ? (
      <div>
<h2>{datesToRender.name.common}</h2>
<p>capital: {datesToRender.capital}</p>
<p>area: {datesToRender.area}</p>
<p > <b>languages:</b></p>
<ul> {languages.map(lang => <li key = {lang}>{lang}</li>)}</ul>
<img src={datesToRender.flags.png}></img>
<h2>Weather in {datesToRender.capital}</h2>
 <p>temperature {weather.main.temp}°C</p>
 <img src = {`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
 <p>wind {weather.wind.speed} m/s</p>
 </div>) : null}
    </>
  )
}

const RenderCountries = (props) => {
if (props.countriesList.length > 10)
{return(<p>Too many matches,specify another filter</p>)}
else if (props.countriesList.length > 1) {
   return ((props.show) ?
     (<div><CountryData countryChoosed={props.countriesList} 
    countryDates = {props.countryDates}/></div>)
    :
    (<div>{props.countriesList.map(country =>
      <Country country ={country} key = {country} 
      handleShow={props.handleShow}/>)}</div>
      )
   )
    }

else if (props.countriesList.length === 1){
  return <CountryData countryChoosed={props.countriesList} 
  countryDates = {props.countryDates}/>}
}

const App = () => {
const [search, setSearch] = useState('')
const [countries, setCountries] = useState([])
const [countriesList, setCountriesList] = useState ([])
const [countryDates, setCountryDates] = useState ([])
const [show, setShow] = useState(false)


useEffect(() => {
  axios
  .get('https://restcountries.com/v3.1/all')
  .then(response => {
    const countriesAllDates = response.data
    setCountries(countriesAllDates.map(countrydates =>
       countrydates.name.common))
    setCountryDates(countriesAllDates)
  })},[])

const handleSearch = (event) => {
setSearch(event.target.value)
let list;
if (event.target.value !== '') {list = countries.filter((country) => 
country.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1)
setCountriesList(list)
}}

const handleShow = (event) => {
  setShow(!show)
  setCountriesList([event.target.value])
}

  return (
    <>
<FindCountries onChange={handleSearch} value={search} list ={countriesList}/>
<RenderCountries countriesList = {countriesList} 
countries= {countries} search ={search} countryDates={countryDates}
 handleShow={handleShow} show={show}/>
    </>
  )
}

export default App