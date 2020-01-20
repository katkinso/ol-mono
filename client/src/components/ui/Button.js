import React from "react";


const Button = props => {

    const classInfo = `btn btn-primary btn-block ${props.for}`

    return (
        <button type={props.type} onClick={props.action} className={classInfo}>{props.text}</button>
    )
}

export default Button