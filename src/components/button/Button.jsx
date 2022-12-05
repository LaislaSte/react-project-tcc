import React from 'react';
import './Button.css';

const Button = ({
    text,
    fun,
    disable = false,
    type,
    bg_color,
    change

}) => {
    return (
        <button
            type={type}
            onClick={fun}
            disabled={disable}
            className={change ? `btn disable ` : `btn ${bg_color}`}
        >
            {text}
        </button>
    )
}

export default Button