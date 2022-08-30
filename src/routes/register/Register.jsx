import React, { useState } from 'react';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import { Link } from 'react-router-dom';
import './Register.css';
import Explore from '../../assets/image-girl-holding-phone.png';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    //const {cadastrar, singInGoogle, singInFacebook } = useContext(CostumerContext);

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
                        icon='jd'
                        value={name}
                        onchange={(e) => { setName(e.target.value) }}
                    />
                    <Input
                        text='E-mail'
                        className='input-outline-primary'
                        type='text'
                        icon='jd'
                        value={email}
                        onchange={(e) => { setEmail(e.target.value) }}
                    />
                    <Input
                        text='Senha'
                        className='input-outline-primary'
                        type='password'
                        icon='dj'
                        value={password}
                        onchange={(e) => { setPassword(e.target.value) }}
                    />
                    <Input
                        text='Confirme a senha'
                        className='input-outline-primary'
                        type='password'
                        icon='dj'
                        value={passwordConfirm}
                        onchange={(e) => { setPasswordConfirm(e.target.value) }}
                    />

                    <Button
                        type='submit'
                        text='Cadastrar'
                        bg_color='primary'
                    />
                    <Button
                        type='submit'
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

