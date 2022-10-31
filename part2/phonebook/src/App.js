import axios from 'axios'
import { useEffect, useState } from 'react'
import personService from './services/persons'

const Person = ({person, deletePerson}) => 
<p>{person.name} {person.number} {' '}
<button onClick={() => deletePerson(person.id, person.name)}>delete</button>
</p>

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
          <Person person = {person} key = {person.name} deletePerson={props.deletePerson}/>)} </div>)
     :
    (<div>
      {props.persons.map(person =>
        <Person person = {person} key = {person.name} deletePerson={props.deletePerson}/>)} 
    </div> ) 
  )
}

const Notification = (props) => {
  
  const messageStyle = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10}

    if (props.message !== null){
      messageStyle.color = 'green'
      return (
  <div style = {messageStyle}>
    {props.message}
  </div>)
  }
  
  else if(props.messageError !== null) {
   messageStyle.color = 'red'
    return (
      <div style = {messageStyle}>
        {props.messageError}
      </div>)
  }
  {return null}
    }
  
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newPerson, setNewPerson] = useState({name:'', number:''})
  const [search, setSearch] = useState('')
  const [listToShow, setListToShow] = useState([])
  const [message, setMessage] = useState(null)
  const [messageError, setMessageError] = useState(null)
  
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
  const updateObject = persons.filter(person => person.name===newPerson.name)
  if(updateObject.length === 0)
  {personService
  .create(newPerson)
  .then(returnedList=>{
    setPersons(persons.concat(returnedList))
    setNewPerson({name:'', number:''})
    setMessage(`Added ${newPerson.name}`)
    setTimeout(() => {setMessage(null)}, 5000)
      })
    }

else {
      if(window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`))
      {
        personService
        .update(updateObject[0].id, newPerson)
        .then(changedObject => {
          setPersons(persons.map(person =>
           person.id !== changedObject.id ? person : changedObject))
          setMessage(`Changed phone number for ${updateObject[0].name}`)
          setTimeout(() => {setMessage(null)}, 5000)
          })
      }
       else {setNewPerson({name:'', number:''})}
        }
}

const deletePerson = (id, name) => {
  if(window.confirm(`Delete ${name}?`)){
    personService
    .remove(id)
    .then(() => 
    setPersons(persons.filter(person => person.id !== id)))
    .catch(error => {setMessageError(`Information of ${name} has already been removed from server`)
    setPersons(persons.filter(person => person.id !== id))}
    )
 }
}

return (
  <div>
    <h2>Phonebook</h2>
    <Notification message = {message} messageError = {messageError}/>
    <Filter onChange = {handleSearch} onKeyDown = {handleEnter} value = {search}/>
    <h2>Add a new</h2>
    <PersonForm onChange = {handlePersonChange} value = {{name: newPerson.name,
    number: newPerson.number}} addName = {addName}/>
    <h2>Numbers</h2>
   <Persons persons={persons} search ={search} listToShow={listToShow} deletePerson={deletePerson} />
  </div>
)
}

export default App