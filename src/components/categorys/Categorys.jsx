import React from 'react';
import './Categorys.css';

const Categorys = ({
    item,
    funSetQuery,
    key
}) => {

    const setItem = () => {
        funSetQuery(item);
    }

    return (
        <li className='item-category' value={item} key={key} onClick={setItem}> {item} </li>
    )

}

export default Categorys