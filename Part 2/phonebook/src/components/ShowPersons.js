import React from 'react'

const ShowPersons = ({persons}) => {
    return (
        <ul>
            {persons.map((person) => (
            <li key={person.name}>{person.name} {person.number}</li>
            ))}
        </ul>
    )
}

export default ShowPersons