import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { emailValid, passConfValid, passwordValid, nameValid } from '../../utils/validadores';

import './Register.css';
import Explore from '../../assets/image-girl-holding-phone.png';

import Button from '../../components/button/Button';
import Input from '../../components/input/Input';

import {FaEnvelope} from 'react-icons/fa';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    //const {cadastrar, singInGoogle, singInFacebook } = useContext(CostumerContext);

    const formValidRegister = () => {
        return emailValid(email) && passwordValid(password) && nameValid(name) && passConfValid(passwordConfirm)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('dados do form', { email, password })

        //fun cadastrar do CostumerContext
        //cadastrar({nome, email, senha})
    }

    return (
        <div className='register'>
            <div className="brand-img-register">
                <img src={Explore} alt="" />
            </div>

            <div className="register-container">
                <div className="brand-content-item">
                    <h1>Crie sua conta</h1>
                    <p className="p-italic">Preencha seus dados</p>
                </div>
                <form className="register-form-container">
                    <Input
                        text='Nome'
                        className='input-outline-primary'
                        type='text'
                        icon={ <FaEnvelope/> }
                        value={name}
                        onchange={(e) => { setName(e.target.value) }}
                        message='Nome tem que ter mais de 3 caracteres'
                        showMessage={name && !nameValid(name)}
                    />

                    <Input
                        text='E-mail'
                        className='input-outline-primary'
                        type='text'
                        icon='jd'
                        value={email}
                        onchange={(e) => { setEmail(e.target.value) }}
                        message='E-mail inválido'
                        showMessage={email && !emailValid(email)}
                    />
                    <Input
                        text='Senha'
                        className='input-outline-primary'
                        type='password'
                        icon='dj'
                        value={password}
                        onchange={(e) => { setPassword(e.target.value) }}
                        message='Senha inválida'
                        showMessage={password && !passwordValid(password)}
                    />
                    <Input
                        text='Confirme a senha'
                        className='input-outline-primary'
                        type='password'
                        icon='dj'
                        value={passwordConfirm}
                        onchange={(e) => { setPasswordConfirm(e.target.value) }}
                        message='As senhas tem que conhecidirem'
                        showMessage={passwordConfirm && !passConfValid(password, passwordConfirm)}
                    />

                    <Button
                        type='submit'
                        text='Cadastrar'
                        bg_color='primary'
                        disable={!formValidRegister()}
                    />

                    <Button
                        type='button'
                        text='Entrar com Google'
                        bg_color='google'
                    />

                </form>
                <h3 className='label'>
                    Já possui uma conta?
                    <Link to={'/'} className=' colorfull-text' >Acesse por aqui</Link>
                </h3>
            </div>

        </div>
    )
}

export default Register;

