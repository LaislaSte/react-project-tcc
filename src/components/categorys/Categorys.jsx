import React, { useState } from 'react';
import './Categorys.css';
import { userCategorys } from '../../utils/arraysHeader';

const Categorys = () => {

    const [color, setColor] = useState(false)
    const changeColor = () => setColor(!color);

    return (
        <ul className='menu-item-category'>
            {
                userCategorys.map((item, index) => {
                    return (
                        <li className='item-category' value={item} key={index} onClick={changeColor}> {item} </li>
                    )
                })
            }
        </ul>
    )

}

export default Categorys