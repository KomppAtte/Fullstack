import React from "react";

const Form = (props) => {
    return (
        <form onSubmit={props.add}>
            <div>
                name: <input value={props.name} onChange={props.handleName}/>
                <br/>
                number: <input value={props.number} onChange={props.handleNum}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default Form