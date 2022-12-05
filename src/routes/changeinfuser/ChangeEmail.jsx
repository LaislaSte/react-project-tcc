import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import './Global.css';
import { emailValid, passwordValid, passConfValid } from '../../utils/validators';
import { UserAuth } from '../../services/UserContext';
import avatarDefault from '../../assets/img-avatar.png';

const ChangeEmail = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const { imgUrl, updateUserEmail } = UserAuth();

    const formValid = () => {

    }

    function sendEmail(e) {
        e.preventDefault();

        updateUserEmail(email, password);

    }

    return (
        <>
            <div className="change-container">
                <Link to='/config'>
                    <BiArrowBack className='back-icon' />
                </Link>
                <div className="img-container">
                    <img src={imgUrl ? imgUrl : avatarDefault} alt="" />
                    <h1 className="title">Altere seu E-mail</h1>
                </div>

                <form className="form" onSubmit={sendEmail}>
                    <p>Insira sua senha</p>
                    <Input
                        className="input-outline-secondary"
                        type="password"
                        text="Senha"
                        value={password}
                        onchange={(e) => setPassword(e.target.value)}
                        message='Insira um e-mail válido'
                        showMessage={password && !passwordValid(password)}
                    />
                    <p>confirme sua senha</p>
                    <Input
                        className="input-outline-secondary"
                        type="password"
                        text="Confirme sua senha"
                        value={passwordConf}
                        onchange={(e) => setPasswordConf(e.target.value)}
                        message='Insira um e-mail válido'
                        showMessage={passwordConf && !passConfValid(password, passwordConf)}
                    />
                    <p>Insira seu novo e-mail</p>
                    <Input
                        className="input-outline-secondary"
                        type="text"
                        text="Novo e-mail"
                        value={email}
                        onchange={(e) => setEmail(e.target.value)}
                        message='Insira um e-mail válido'
                        showMessage={email && !emailValid(email)}
                    />

                    <Button
                        text='Enviar'
                        type='submit'
                        bg_color='secondary'
                    />
                </form>
            </div>
        </>
    )
}

export default ChangeEmail