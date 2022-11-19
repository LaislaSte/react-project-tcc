import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import './Global.css';
import { emailValid } from '../../utils/validators';
import { UserAuth } from '../../services/UserContext';

const ChangeEmail = () => {
    const [email, setEmail] = useState('');
    const [confirmCod, setConfirmCod] = useState('');
    const [nemEmail, setNewEmail] = useState('');
    const { user } = UserAuth();

    function sendEmail(e) {
        e.preventDefault();

        if (email === '') {
            alert('Preencha corretamente o formulário');
        }

    }

    return (
        <>
            <div className="container">
                <Link to='/config'>
                    <BiArrowBack className='back-icon' />
                </Link>
                <div className="img-container">
                    <img src={user?.photoURL} alt="" />
                </div>
                <h1 className="title">Altere seu E-mail</h1>

                <form className="form" onSubmit={sendEmail}>
                    <p>Confirme seu e-mail atual inserindo o código enviado</p>
                    <Input
                        className="input-outline-secondary"
                        type="text"
                        text="Código de confirmação"
                        value={confirmCod}
                        onchange={(e) => setConfirmCod(e.target.value)}
                    />

                    <Button
                        text='Enviar'
                        type='submit'
                        bg_color='secondary'
                    />
                </form>
            </div>

            <div className="container">
                <h1 className="title">Altere seu E-mail</h1>

                <form className="form" onSubmit={sendEmail}>
                    <p>insira seu novo e-mail</p>
                    <Input
                        className="input-outline-secondary"
                        type="text"
                        text="E-mail"
                        value={email}
                        onchange={(e) => setEmail(e.target.value)}
                        message='Insira um e-mail válido'
                        showMessage={email && !emailValid(email)}
                    />

                    <Button
                        text='Alterar'
                        type='submit'
                        bg_color='secondary'
                    />
                </form>
            </div>
        </>
    )
}

export default ChangeEmail