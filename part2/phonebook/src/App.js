import axios from 'axios'
import { useEffect, useState } from 'react'
import personService from './services/persons'

const Person = ({person}) => <p>{person.name} {person.number}</p>

const Filter = (props) => {
  return(
      <div>
        filter shown with <input onChange = {props.onChange} onKeyDown = {props.onKeyDown} value = {props.value}></input>
      </div>)
}

const PersonForm = (props) => {
  return(
<form onSubmit = {props.addName}>
      <div>
        name: <input onChange = {props.onChange} value = {props.value.name} id="name"/>
      </div>
      <div>
        number: <input onChange = {props.onChange} value = {props.value.number} id="number"/>
        </div>
      <div>
        <button type="submit" >add</button>
      </div>
    </form>
  )
}

const Persons = (props) => {
  return(
    (props.search) !== '' ?
     (<div> {props.listToShow.map(person =>
          <Person person = {person} key = {person.name} />)} </div>)
     :
    (<div>
      {props.persons.map(person =>
        <Person person = {person} key = {person.name} />)} 
    </div> ) 
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newPerson, setNewPerson] = useState({name:'', number:''})
  const [search, setSearch] = useState('')
  const [listToShow, setListToShow] = useState([])

  useEffect(() => {
    personService
    .getAll()
    .then (initialList => {
      setPersons(initialList)
    })
  }, [])

  const handlePersonChange = (event) => {
  setNewPerson({...newPerson, [event.target.id]: event.target.value})
  }
  
  const handleSearch = (event) => {
    setSearch(event.target.value)
    setListToShow (persons.filter((person) =>
     person.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1))}

  const handleEnter = (event) => {
     if (event.key === 'Enter') {setSearch('')}
  }

  const addName = (event) => {
  event.preventDefault()
  if(persons.some(person=>person.name===newPerson.name))
      {alert(`${newPerson.name} is already added to phonebook`);
      setNewPerson({name:'', number:''});
      return}
  {const nameObject = {
    name: newPerson.name,
    number: newPerson.number
  }
  
  personService
  .create(nameObject)
  .then(returnedList=>{
    setPersons(persons.concat(returnedList))
    setNewPerson({name:'', number:''})
  })
  }
  }
return (
  <div>
    <h2>Phonebook</h2>
    <Filter onChange = {handleSearch} onKeyDown = {handleEnter} value = {search}/>
    <PersonForm onChange = {handlePersonChange} value = {{name: newPerson.name,
    number: newPerson.number}} addName = {addName}/>
    <h2>Numbers</h2>
   <Persons persons={persons} search ={search} listToShow={listToShow}/>
  </div>
)
}

export default App