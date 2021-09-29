import React from "react";

const List = (props) => {
    return (
        <div>
            <p>{props.person.name} {props.person.number} 
            <button onClick={props.selectDelete}>delete</button>
            </p>
        </div>
    )
}

export default List