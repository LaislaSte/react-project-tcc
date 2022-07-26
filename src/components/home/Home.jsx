import React from 'react';
import './Home.css';
import Explore from '../../assets/Explore.jpg'
//import  Info  from './Info';
import { FaBrain } from 'react-icons/fa';
import { BiNetworkChart } from 'react-icons/bi';
import { MdPermMedia } from 'react-icons/md'
import { Card } from 'react-bootstrap';

const Home = () => {
    return (
        <div className='container'>

            <div className="section-brand">
                <div className="brand-content">
                    <h1>Memorizar nunca foi tão fácil</h1>
                    <h3>Para começar acesse sua conta ou Cadastre-se no site</h3>
                    <div className="btn-log">
                        <a href="#Login"><button className="btn">Login</button></a>
                        <a href="#Register"><button className="btn">Cadastar</button></a>
                    </div>
                </div>
            </div>

            <div className="section">
                <h1>Memorize seu conteúdos com os seguintes métodos</h1>
                <div className="section-info">
                    <div className="my-card">
                        <h2>Repetição Espaçada</h2>
                        <p class="p-italic">
                            Consiste em repetir assuntos já aprendidos, ou seja, fazer revisões de tempos em
                            tempos até tê-lo de maneira consolidada no seu cérebro.
                        </p>
                        <h1><FaBrain className="my-icon" /></h1>
                    </div>
                    <div className="my-card">
                        <h2>Rede Didática</h2>
                        <p class="p-italic">
                            Será sua rede social para estudos, onde você faz o menor esforço possível, dê
                            uma chance e verá que estudar também pode ser divertido.
                        </p>
                        <h1><BiNetworkChart className='my-icon' /></h1>
                    </div>
                    <div className="my-card">
                        <h2>Post Resumidos, Interativos e Divertidos!</h2>
                        <p class="p-italic">
                            Conte com uma variedade de textos, imagens, vídeos e muito mais.
                        </p>
                        <h1><MdPermMedia className='my-icon' /></h1>
                    </div>
                </div>
            </div>

            <div className="section section-info">
                <div>
                    <h1>Crie Conteúdos</h1>
                    <p>Crie você conteúdos a serem memorizados pela
                        comunidade.</p>
                </div>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" className="img-card" src={Explore} />
                    <Card.Body>
                        <a href="#Create"><button className="btn">GO SOMEWHERE</button></a>
                    </Card.Body>
                </Card>
            </div>
            <div className="section-info">
                <div>
                    <h1>Explore Categorias</h1>
                    <p>Veja as matérias didáticas disponíeis na plataforma.</p>
                </div>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" className="img-card" src={Explore} />
                    <Card.Body>
                        <a href="#Create"><button className="btn">GO SOMEWHERE</button></a>
                    </Card.Body>
                </Card>
            </div>
            <div className="section-info">
                <div>
                    <h1>Explore Conteúdos</h1>
                    <p>Entre na guia de exploração e conheça dos mais
                        varidos
                        post.</p>
                </div>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" className="img-card" src={Explore} />
                    <Card.Body>
                        <a href="#Create"><button className="btn">GO SOMEWHERE</button></a>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default Home;

