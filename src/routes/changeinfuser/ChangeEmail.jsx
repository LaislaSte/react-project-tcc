import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Link } from 'react-router-dom';
import { fakeUser } from '../../utils/ArraysAndFunctions';
import { BiArrowBack } from 'react-icons/bi';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import './Global.css';
import { emailValid } from '../../utils/validators';

export const ChangeEmail1 = () => {

    const [confirmCod, setConfirmCod] = useState('');

    function sendEmail(e) {
        e.preventDefault();

        // const confirmPasswordParams = {
        //     confirm_key: 'id_aleatorio',
        //     message: message,
        //     email: email
        // }

        // emailjs.send('service_4jqwlml', 'template_kmkc58i', templateParams, 'wPqwTjjSoaxXx0cEM')
        //     .then((res) => {
        //         alert('email sended', res.status, res.text);
        //         setEmail('');
        //         setName('');
        //         setMessage('');
        //     }, (error) => {
        //         alert('error: ', error);
        //     });
    }

    return (
        <div className="change-container">
            <Link to='/config'>
                <BiArrowBack className='back-icon' />
            </Link>
            <div className="img-container">
                <img src={fakeUser.avatar} alt="" />
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
    )
}


export const ChangeEmail2 = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    function sendEmail(e) {
        e.preventDefault();

        if (name === '' || email === '' || message === '') {
            alert('preencha corretamente o formulário');
            return
        }

        const templateParams = {
            from_name: name,
            message: message,
            email: email
        }

        const confirmPasswordParams = {
            confirm_key: 'id_aleatorio',
            message: message,
            email: email
        }

        emailjs.send('service_4jqwlml', 'template_kmkc58i', templateParams, 'wPqwTjjSoaxXx0cEM')
            .then((res) => {
                alert('email sended', res.status, res.text);
                setEmail('');
                setName('');
                setMessage('');
            }, (error) => {
                alert('error: ', error);
            });
    }

    return (
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
    )
}
