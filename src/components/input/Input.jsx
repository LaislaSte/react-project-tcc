import React from 'react';
import './Input.css';

const Input = ({
    type,
    className,
    text,
    icon,
    onchange,
    value,
    validationMessage,
    showMessage
}) => {

    if(showMessage = true){
        
    }

    return (
        <div className="input-container">
            <input
                type={type}
                className={`input-container ${className}`}
                placeholder={text}
                onChange={onchange}
                value={value}
            />
            <p className="input-message">
                {validationMessage}
            </p>
        </div>
    )
}

export default Input