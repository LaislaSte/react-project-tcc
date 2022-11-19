// HOOKS AND LIBS
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from 'react-icons/bi';

// ARCHIVES FROM PROJECT
import { auth } from "../../services/Banco";
import './Global.css';
import { passwordValid, passConfValid } from '../../utils/validators';
import { fakeUser } from '../../utils/ArraysAndFunctions';
import { UserAuth } from "../../services/UserContext";

/*PAGES AND COMPONENTS */
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

const ChangePassword = () => {

    const [confirmEmail, setConfirmEmail] = useState('');
    const [email, setEmail] = useState("");

    const { sendPasswordReset } = UserAuth()
    const [user, loading, error] = useAuthState(auth);

    const navigate = useNavigate();
    useEffect(() => {
        if (loading) return;
        if (user) navigate("/explore");
    }, [user, loading]);

    function sendEmail(e) {
        e.preventDefault();

        if (confirmEmail === '') {
            alert('preencha corretamente o formulário');
            return
        }

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
                <p>Insira seu e-mail cadastrado na página para enviar uma mensagem de atualização de senha </p>
                <Input
                    className="input-outline-secondary"
                    type="text"
                    text="E-mail"
                    value={confirmEmail}
                    onchange={(e) => setConfirmEmail(e.target.value)}
                />

                <Button
                    text='Enviar'
                    type='submit'
                    bg_color='secondary'
                    fun={() => sendPasswordReset(confirmEmail)}
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

export default ChangePassword
