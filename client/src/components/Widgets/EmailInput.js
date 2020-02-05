import React from "react";

const EmailInput = props => {
    
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
        <div className="input-group">
                <input 
                    id={id}
                    type='email'
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

export default EmailInput

