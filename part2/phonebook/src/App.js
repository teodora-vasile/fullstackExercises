import { useState } from 'react'

const Person = ({person}) => <p>{person.name} {person.number}</p>

  const App = () => {
    const [persons, setPersons] = useState([
      { name: 'Arto Hellas', number: '040-123456', id: 1 },
      { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
      { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
      { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ]) 
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')
    const [listToShow, setListToShow] = useState([])

    const handleNameChange = (event) => {
    setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
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
    
    if(persons.some(person=>person.name===newName))
        {alert(`${newName} is already added to phonebook`);
        setNewName('');
        setNewNumber('');
        return}
    {const nameObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
    }
    }
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input onChange = {handleSearch} onKeyDown = {handleEnter} value = {search}></input>
      </div>
      <form onSubmit = {addName}>
        <div>
          name: <input onChange = {handleNameChange} value = {newName}/>
        </div>
        <div>
          number: <input onChange = {handleNumberChange} value = {newNumber}/>
          </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
      {(search !== '') ?
       (<div> {listToShow.map(person =>
            <Person person = {person} key = {person.name} />)} </div>)
       : (<div>{persons.map(person =>
            <Person person = {person} key = {person.name} />)} </div>)
  }
      </div>
    </div>
  )
}

export default App

