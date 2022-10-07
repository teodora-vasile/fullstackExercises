import { useState } from 'react'

  const Person = ({person}) => <p>{person.name}</p>

  const App = () => {
    const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
    ]) 
    const [newName, setNewName] = useState('')

    const handleNameChange = (event) => {
    setNewName(event.target.value)
    }

    const addName = (event) => {
    event.preventDefault()
    
    if(persons.some(person=>person.name===newName))
        {alert(`${newName} is already added to phonebook`);
        setNewName('');
        return}
    {const nameObject = {
      name: newName
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
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
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Person person = {person} key = {person.name} />)}
    </div>
  )
}

export default App