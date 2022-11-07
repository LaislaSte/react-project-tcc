import React from 'react';
import './Global.css';
import { fakeUser } from '../../utils/ArraysAndFunctions';
import { Navigate, Link } from 'react-router-dom';
import Button from '../../components/button/Button';

const DeleteAccount = () => {

    const navigate = Navigate();

    const deleteAccount = () => {
        navigate('public');
    }

    const notDeleteAccount = () => {
        navigate('/explore');
    }

    return (
        <div className='container'>
            <div className="img-container">
                <img src={fakeUser.avatar} alt="" srcset="" />
            </div>

            <h1>Certeza que deseja deletar sua consta?</h1>

            <div className="btns-container">

                <Button
                    text='Não deletar'
                    type='submit'
                    bg_color='secondary'
                    fun={notDeleteAccount()}
                />

                <Button
                    text='Deletar'
                    type='submit'
                    bg_color='secondary'
                    fun={deleteAccount()}
                />

            </div>

            <Link to='/explore' className='link'>
                <p>Voltar para página principal</p>
            </Link>
        </div>
    )
}

export default DeleteAccount