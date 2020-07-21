import React from 'react'

const Person = ( {name, number, handleClick}) => {
    return (
        <div className="personElement">
            {name} {number}{" "}
            <button onClick={handleClick}>delete</button>
        </div>
    )
}

const ShowPersons = ({persons, handleClick}) => {
    return (
        <div>
            {persons.map((person) => (
                <Person
                    name={person.name}
                    number={person.number}
                    handleClick={() => handleClick(person.id)}
                    key={person.id}
                />
            ))}
        </div>
    )
}

export default ShowPersons