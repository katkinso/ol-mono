import React, { useState } from "react";
   
const PasswordInput = props => {

    const [inputType, setVisibility] = useState('password');
    const [buttonText, setButtonText] = useState('SHOW');

    const onClick = () => {
        setVisibility(prevInputType => prevInputType === 'password' ? 'text' : 'password')
        setButtonText(prevButtonText => prevButtonText === 'SHOW' ? 'HIDE' : 'SHOW')
    }
   
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
                    type={inputType}
                    className={className}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                />
                <div className="input-group-append">
                    <button className="btn text-white" type="button"
                        onClick={onClick}>
                        {buttonText}
                    </button>
                </div>
                <div className={messageClassName}>
                    {message}
                </div>
                
            </div>
        )
}

export default PasswordInput





