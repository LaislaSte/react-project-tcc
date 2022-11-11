import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth'; //tem q instalar**

import { auth } from '../../services/Banco';
import { registerWithEmailAndPassword, signInWithGoogle } from '../../services/googleAuthenticatios';
import { emailValid, passConfValid, passwordValid, nameValid } from '../../utils/validators';
import { UserAuth } from '../../services/UserAuth';

import './Register.css';
import Explore from '../../assets/image-girl-holding-phone.png';

import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import Footer from '../../components/footer/Footer';

import { FaEnvelope } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { BsFillPersonFill } from 'react-icons/bs';
import { CostumerContext } from '../../services/UserContext';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [user, loading, error] = useAuthState(auth);
    const history = useNavigate();

    const { registerWithEmailAndPassword } = useContext(CostumerContext);

    const formValidRegister = () => {
        if (emailValid(email) && passwordValid(password) && nameValid(name) && passConfValid(passwordConfirm)) {
            return true;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`usuario cadastrado`);
        registerWithEmailAndPassword(name, email, password);
        setName('');
        setEmail('');
        setPassword('');
        setPasswordConfirm('');
    }

    useEffect(
        () => {
            if (loading) {
                //a loading screen/component
                return;
            }
            if (user) history('/explore');

        },
        [user, loading]
    )

    return (
        <>
            <div className='register'>

                <div className="brand-img-register">
                    <img src={Explore} alt="" />
                </div>

                <div className="register-container">
                    <div className="brand-content-item">
                        <h1>Crie sua conta</h1>
                        <p className="p-italic">Preencha seus dados</p>
                    </div>
                    <form className="register-form-container" onSubmit={handleSubmit}>
                        <Input
                            text='Nome'
                            className='input-outline-primary'
                            type='text'
                            icon={<BsFillPersonFill />}
                            value={name}
                            onchange={(e) => { setName(e.target.value) }}
                            message='Nome tem que ter mais de 3 caracteres'
                            showMessage={name && !nameValid(name)}
                        />

                        <Input
                            text='E-mail'
                            className='input-outline-primary'
                            type='text'
                            icon={<FaEnvelope />}
                            value={email}
                            onchange={(e) => { setEmail(e.target.value) }}
                            message='E-mail inválido'
                            showMessage={email && !emailValid(email)}
                        />
                        <Input
                            text='Senha'
                            className='input-outline-primary'
                            type='password'
                            icon={< RiLockPasswordFill />}
                            value={password}
                            onchange={(e) => { setPassword(e.target.value) }}
                            message='Senha inválida'
                            showMessage={password && !passwordValid(password)}
                        />
                        <Input
                            text='Confirme a senha'
                            className='input-outline-primary'
                            type='password'
                            icon={< RiLockPasswordFill />}
                            value={passwordConfirm}
                            onchange={(e) => { setPasswordConfirm(e.target.value) }}
                            message='As senhas tem que conhecidirem'
                            showMessage={passwordConfirm && !passConfValid(password, passwordConfirm)}
                        />

                        <Button
                            type='submit'
                            text='Cadastrar'
                            bg_color='primary'
                            fun={handleSubmit}
                            disable={formValidRegister()}
                        />

                        <Button
                            type='button'
                            text='Entrar com Google'
                            bg_color='google'
                            fun={signInWithGoogle}
                        />

                    </form>

                    <div className="footer">
                        <h3 className='label'>
                            Já possui uma conta?
                            <Link to={'/login'} className=' colorfull-text' >Acesse aqui</Link>
                        </h3>
                    </div>
                </div>

            </div>

            <Footer />

        </>
    )
}

export default Register;

