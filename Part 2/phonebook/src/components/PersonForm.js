import React from 'react'

const PersonForm = ({addNewPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
    return (
        <form onSubmit={addNewPerson}>
        <div>
          <label htmlFor="name">name: </label>
          <input
            id="name"
            value={ newName }
            onChange={ handleNameChange }
          />
        </div>        
        <div>
          <label htmlFor="number">number: </label>
          <input
            id="number"
            value={ newNumber }
            onChange={ handleNumberChange }
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm