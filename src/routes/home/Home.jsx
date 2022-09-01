import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {emailValid, passwordValid} from '../../utils/validadores';

import './Home.css';
import Explore from '../../assets/Explore.jpg';

import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

import { FaBrain, FaEnvelope } from 'react-icons/fa';
import { BiNetworkChart } from 'react-icons/bi';
import { MdPermMedia } from 'react-icons/md'
import { BsFillArrowDownCircleFill } from 'react-icons/bs';
import {RiLockPasswordFill} from 'react-icons/ri';

const Home = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const formValidLogin = () => {
        return emailValid(email) && passwordValid(senha)
    }

    return (
        <div className='container'>

            <section className="section-brand" id='public-header'>
                <div className="brand-content">
                    <h2>Faça seu login para começar ou se cadastre.</h2>
                    <div className="brand-content-item">
                        <h1>Entrar</h1>
                        <p className="p-italic">Insira seus dados</p>
                    </div>
                    <form className="login-form-container">
                        <Input
                            text='E-mail'
                            className='input-outline-secondary'
                            type='text'
                            icon={ <FaEnvelope /> } 
                            value={email}
                            onchange={(e) => { setEmail(e.target.value) }}
                            message='E-mail inválido'
                            showMessage={email && !emailValid(email)}
                        />
                        <Input
                            text='Senha'
                            className='input-outline-secondary'
                            type='password'
                            icon={<RiLockPasswordFill />}
                            value={senha}
                            onchange={(e) => { setSenha(e.target.value) }}
                            message='Senha inválida'
                            showMessage={senha && !passwordValid(senha)}
                        />

                        <Button
                            type='submit'
                            text='Entrar'
                            bg_color='secondary'
                            disable={!formValidLogin()}
                        />

                        <Button
                            type='button'
                            text='Entrar com Google'
                            bg_color='google'
                        />

                    </form>
                    <h3 className='label'>
                        Não possui uma conta?
                        <Link to={'/register'} className=' colorfull-text' >Cadastre-se</Link>
                    </h3>
                </div>
            </section>


            <div className="main-section">
                <div className="footer-section">
                    <h1>
                        Memorize seu conteúdos com os seguintes métodos
                        <BsFillArrowDownCircleFill className='footer-icon' />
                    </h1>
                </div>

                <section className="section section-info">
                    <div className="section-info">
                        <div className="my-card">
                            <h2>Repetição Espaçada</h2>
                            <p className="p-italic">
                                Consiste em repetir assuntos já aprendidos, ou seja, fazer revisões de tempos em
                                tempos até tê-lo de maneira consolidada no seu cérebro.
                            </p>
                            <h1><FaBrain className="my-icon" /></h1>
                        </div>
                        <div className="my-card">
                            <h2>Rede Didática</h2>
                            <p className="p-italic">
                                Será sua rede social para estudos, onde você faz o menor esforço possível, dê
                                uma chance e verá que estudar também pode ser divertido.
                            </p>
                            <h1><BiNetworkChart className='my-icon' /></h1>
                        </div>
                        <div className="my-card">
                            <h2>Post Resumidos e Interativos</h2>
                            <p className="p-italic">
                                Conte com uma variedade de textos, imagens, vídeos e muito mais.
                            </p>
                            <h1><MdPermMedia className='my-icon' /></h1>
                        </div>
                    </div>
                </section>

                <div className="footer-section fs-2">
                    <h1>
                        Veja o que mais você pode fazer
                        <BsFillArrowDownCircleFill className='footer-icon' />
                    </h1>
                </div>

                <section className="section-info">
                    <div className="my-card">
                        <img src={Explore} alt="card-image" className='card-img' />
                        <h1>Crie Conteúdos</h1>
                        <p>Crie você conteúdos a serem memorizados pela comunidade.</p>
                    </div>
                    <div className="my-card">
                        <img src={Explore} alt="card-image" className='card-img' />
                        <h1>Explore Categorias</h1>
                        <p>Veja as matérias didáticas disponíeis na plataforma.</p>
                    </div>
                    <div className="my-card">
                        <img src={Explore} alt="card-image" className='card-img' />
                        <h1>Explore Conteúdos</h1>
                        <p>Entre na guia de exploração e conheça dos mais
                            varidos
                            post.</p>
                    </div>
                </section>

            </div>
        </div>
    )
}

export default Home;

