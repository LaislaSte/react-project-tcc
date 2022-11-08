import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../services/Banco";
import { sendPasswordReset } from "../../services/googleAuthenticatios";

import './Global.css';
import { passwordValid, passConfValid } from '../../utils/validators';

import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import { fakeUser } from '../../utils/ArraysAndFunctions';
import { BiArrowBack } from 'react-icons/bi';

export const ChangePassword1 = () => {

    const [confirmCod, setConfirmCod] = useState('');
    const [email, setEmail] = useState("");
    const [user, loading, error] = useAuthState(auth);

    const navigate = useNavigate();
    useEffect(() => {
        if (loading) return;
        if (user) navigate("/explore");
    }, [user, loading]);

    function sendEmail(e) {
        e.preventDefault();

        if (confirmCod === '') {
            alert('preencha corretamente o formulário');
            return
        }

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
            <h1 className="title">Altere sua senha</h1>

            <form className="form" onSubmit={sendEmail}>
                <p>Confirme seu e-mail inserindo o código enviado</p>
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
                    fun={() => sendPasswordReset(confirmCod)}
                />
            </form>

            <div className="footer">
                <h3 className='label'>
                    Não possui uma conta?
                    <Link to={'/register'} className=' colorfull-text' >Cadastre-se</Link>
                </h3>
            </div>

        </div>
    )
}


// export const ChangePassword2 = () => {

//     const [password, setPassword] = useState('')
//     const [confirmPassword, setConfirmPassword] = useState('')
//     const [message, setMessage] = useState('')

//     function sendEmail(e) {
//         e.preventDefault();

//         if (confirmPassword === '' || password === '') {
//             alert('preencha corretamente o formulário');
//             return
//         }

//         const templateParams = {
//             message: message,
//         }

//     }

//     return (
//         <div className="change-container">
//             <Link to='/changepassword1'>
//                 <BiArrowBack className='back-icon' />
//             </Link>
//             <div className="img-container">
//                 <img src={fakeUser.avatar} alt="" />
//             </div>
//             <h1 className="title">Altere sua senha</h1>

//             <form className="form" onSubmit={sendEmail}>
//                 <p>Insira sua nova senha</p>
//                 <Input
//                     className="input-outline-secondary"
//                     type="text"
//                     text="Senha"
//                     value={password}
//                     onchange={(e) => setPassword(e.target.value)}
//                     message='Insira mais de 3 caracter'
//                     showMessage={password && !passwordValid(password)}
//                 />

//                 <p>Confirme sua senha</p>
//                 <Input
//                     className="input-outline-secondary"
//                     type="text"
//                     text="Confirmação de senha"
//                     value={confirmPassword}
//                     onchange={(e) => setConfirmPassword(e.target.value)}
//                     message='As senhas não são correspondentes'
//                     showMessage={confirmPassword && !passConfValid(confirmPassword)}
//                 />

//                 <Button
//                     text='Alterar'
//                     type='submit'
//                     bg_color='secondary'
//                 />
//             </form>
//         </div>
//     )
// }
