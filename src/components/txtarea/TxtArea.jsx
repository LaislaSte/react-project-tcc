import React from 'react';
import './TxtArea.css';

const TxtArea = ({
    text,
    onchange,
    value,
    message,
    showMessage

}) => {

    return (
        <div className="TxtArea-container">
            <div className={`TxtArea-outline ${className}`}>

                <textarea
                    placeholder={text}
                    onChange={onchange}
                    value={value}
                />

            </div>
            {showMessage && <p className='TxtArea-error-message'> {message} </p>}
        </div>
    )
}

export default TxtArea