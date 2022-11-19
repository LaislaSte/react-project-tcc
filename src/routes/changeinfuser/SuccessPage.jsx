import React from 'react'
import { Link } from 'react-router-dom'
import './Global.css';
import { fakeUser } from '../../utils/ArraysAndFunctions'

const SuccessPage = () => {
    return (
        <div className='container'>
            <div className="img-container">
                <img src={fakeUser.avatar} alt="" srcset="" />
            </div>

            <h1>Alteração realizada</h1>

            <Link to='/explore' className='link'>
                <p>Voltar para página principal</p>
            </Link>

        </div>
    )
}

export default SuccessPage