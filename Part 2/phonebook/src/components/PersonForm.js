import React from 'react'

const PersonForm = ({addNewPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
    const someStyling = {
      marginBottom: '0.3em',
    }
  
    return (
        <form onSubmit={addNewPerson}>
        <div style={someStyling}>
          <label htmlFor="name">name: </label>
          <input
            id="name"
            value={ newName }
            onChange={ handleNameChange }
          />
        </div>        
        <div style={someStyling}>
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