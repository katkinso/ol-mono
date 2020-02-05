import React from "react";

const TextInput = props => {
    
    let { id, 
        className, 
        placeholder, 
        value, 
        onChange, 
        onBlur, 
        onFocus,
        message, 
        messageClassName } = props;

    return (
        <div className="input-group pt-3">
                <input 
                    id={id}
                    type='text'
                    className={className}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                />
                <div className={messageClassName}>
                    {message}
                </div>
                
        </div>
    )
}

export default TextInput

