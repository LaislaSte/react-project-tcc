import React from 'react';
import './Input.css';

const Input = ({
    type,
    className,
    text,
    icon,
    onchange,
    value,
    message,
    showMessage

}) => {

    return (
        <div className="input-container">
            <div className={`input-outline ${className}`}>
                <div className="img-input">
                    {icon}
                </div>

                <input
                    type={type}
                    placeholder={text}
                    onChange={onchange}
                    value={value}
                />

            </div>
                {showMessage && <p className='input-error-message'> {message} </p>}
        </div>
    )
}

export default Input