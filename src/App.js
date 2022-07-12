import "./App.css"
import { useState } from "react"
import allContacts from './contacts.json'

const firstFiveContacts = allContacts.splice(0, 5)

function App() {

  const [contacts, setContacts] = useState(firstFiveContacts)

  const addRandomContact = () => {
    const randomNumber = Math.floor(Math.random() * allContacts.length)
    const contactsCopy = [...allContacts.splice(randomNumber, 1), ...contacts]
    setContacts(contactsCopy)
  }

  const sortByPopularity = () => {
    const contactsCopy = [...contacts]
    contactsCopy.sort((a, b) => b.popularity - a.popularity)
    setContacts(contactsCopy)
  }

  const sortByName = () => {
    const contactsCopy = [...contacts]
    contactsCopy.sort((a, b) => a.name.localeCompare(b.name))
    setContacts(contactsCopy)
  }

  const delteContact = (id) => {
    const contactIndex = contacts.findIndex(contact => contact.id === id)

    if (contactIndex !== -1) {

      const contactsCopy = [...contacts]
      allContacts.push(contactsCopy[contactIndex])
      contactsCopy.splice(contactIndex, 1)

      setContacts(contactsCopy)
    }
  }

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <button onClick={addRandomContact}>Add Random Contact</button>
      <button onClick={sortByPopularity}>Sort by popularity</button>
      <button onClick={sortByName}>Sort by name</button>

      <table>
        <thead>
          <tr>
            <td>Picture</td>
            <td>Name</td>
            <td>Popularity</td>
            <td>Won Oscar</td>
            <td>Won Emmy</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact =>
            <tr key={contact.id}>
              <td><img src={contact.pictureUrl} alt="pic"></img></td>
              <td>{contact.name}</td>
              <td>{contact.popularity.toFixed(2)}</td>
              <td>{contact.wonOscar ? '🏆' : undefined}</td>
              <td>{contact.wonEmmy ? '🏆' : undefined}</td>
              <td><button onClick={() => delteContact(contact.id)}>Delte</button></td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  )
}
export default App;