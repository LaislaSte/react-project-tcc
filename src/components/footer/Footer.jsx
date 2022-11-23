import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'

const Footer = () => {
    return (

        <footer className='footer-container'>
            <div className="footer-header-logo">
                <Link to='/' className='link'> <h1>MemorizeStudio</h1> </Link>
                <p>Memorizar nunca foi tão fácil</p>
            </div>

            <div className="footer-info">

                <div className="footer-info-pt1">
                    {/* <Link to='/politics'>Política de privacidade e Termos</Link> */}
                    <li> <Link to='/aboutus' >Sobre o site</Link> </li>
                    <p>© Todos os direitos reservados</p>
                </div>

                <ul className="footer-info-pt2">
                    {/* <li> <Link to='/help'>FAQ - ajuda</Link> </li> */}
                    <li> <Link to='/my-insta'>Instagram</Link> </li>
                </ul>
            </div>
        </footer>

    )
}

export default Footer