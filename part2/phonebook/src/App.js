import { useState } from 'react'

  const Person = ({person}) => <p>{person.name} {person.number}</p>

  const App = () => {
    const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-123456'}
    ]) 
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleNameChange = (event) => {
    setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
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
      {persons.map(person => <Person person = {person} key = {person.name} />)}
    </div>
  )
}

export default App