import React from "react";

const Filter = (props) => {
    return (
        <div>
            shown with: <input value={props.value} onChange={props.handle}/>
        </div>
    )
} 

export default Filter