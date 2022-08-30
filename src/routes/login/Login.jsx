
import React,  { useState } from 'react';
import './Login.css'

const Login = ({
    PropriedadeOnSubmit
}) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('dados do form', { email, senha })
        PropriedadeOnSubmit = {email, senha}
    }

    return (
        <div className='login'>

            <form action="" class="container-log" onSubmit={handleSubmit}>
                <div class="top-card ">
                    <p> Acesse com seu Email ou Usuário </p>
                </div>
                <div class="d-flex flex-column align-content-around gap-4 mb-3">

                    <div class="um-so">
                        <label class="mx-5" htmlFor='email'>Insira seu email ou nome de usuário</label>
                        <input
                            type="email"
                            name='email'
                            id='email'
                            className='my-input'
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div class="um-so">
                        <label class="mx-5" htmlFor='password'>Insira sua Senha</label>
                        <input
                            type="password"
                            name='password'
                            id='password'
                            className='my-input'
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)} />
                    </div>

                    <input type="submit" id="enviar" value="Entrar" class="btn" />

                </div>
            </form>

            <div className="container-log">
                <div className="top-card top-card-fg">
                    <p> Ou Acesse pela conta </p>
                </div>
                <button class="ms-lg-4 btn-face " type="submit">
                    Facebook
                </button>
                <button class="btn-google " type="submit">
                    Google
                </button>
            </div>

        </div>
    )
}

export default Login;
