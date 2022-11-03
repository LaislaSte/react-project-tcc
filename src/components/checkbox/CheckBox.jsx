import React, { useState, useEffect } from 'react';
import './CheckBox.css'
import { category, categorys } from '../../utils/arraysHeader';
import { BsCheck } from 'react-icons/bs';

const CheckBox = ({ options = [], onChange }) => {


    const [isItLimited, setItIsLimited] = useState(false);
    const [aa, setAA] = useState(false);
    const changeA = () => setAA(!aa);

    const [favCategory_user, setCategorys] = useState([]);

    return (
        <div className='cb-group'>
            {options.map((item, index) => {
                return (
                    <div className="form-checked-box" onClick={() => changeA()}>

                        <div className="check-container">
                            <BsCheck className={aa ? 'check-show' : 'check-hide'} />
                        </div>

                        <label htmlFor={index}>{item.name}</label>
                    </div>
                )
            })
            }

        </div>
    )
}

export default CheckBox;