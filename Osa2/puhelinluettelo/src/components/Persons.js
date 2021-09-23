import React from "react";

const Persons = ({persons}) => {
    return (
        <div>
            {persons.map(person =>
            <List key={person.name} person={person}/>
            )}
        </div>
    )
}

const List = (props) => (
    <p>{props.person.name} {props.person.number}</p>
  )

export default Persons