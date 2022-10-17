import React, { useState } from "react";
import './Post.css';
import { FaHeart } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { BiDotsVertical } from 'react-icons/bi'
// import Explore from '../../assets/Explore.jpg';
// import Image from "react-bootstrap/esm/Image";
import Button from "../button/Button";
import { Link } from 'react-router-dom';

export const Post = ({
    img_profile,
    user_name,
    content
}) => {


    const [popUp, setPopUp] = useState(false);
    const showPopUp = () => setPopUp(!popUp);

    const registerReview = () => {
        console.log('user e conteudo registrado em revisoes, setado o contador e primeira data de revisao');
        showPopUp()
    }
    // return (
    //     <div className="popup-container">
    //         <h1>Deseja registrar este post nas suas revisões?</h1>
    //         <div className="btns-popup">
    //             <Button type='button' bg_color='secondary' fun={registerReview} text='sim' />
    //             <Button type='button' bg_color='secondary' text='não' />
    //         </div>
    //     </div>
    // )


    return (
        <div className="post">
            <header className="header-post">
                <div className="user-content">
                    <div className="img-profile"> {img_profile} </div>
                    <h3 className="p-italic"> {user_name} </h3>
                </div>
                <div className="options-dots"> <BiDotsVertical />  </div>
            </header>

            <main className="main-content">
                <div className="content-container">
                    {content}
                </div>
                <div className="img-content">
                </div>
            </main>

            <footer className="footer-post">
                <Link to='#' className='icon-container'>
                    <FaHeart className="icon" onClick={showPopUp} />
                </Link>
            </footer>

            <section className={popUp ? 'popup-menu popup-menu-active' : 'popup-menu'}>
                <div className="popup-container">
                    <Link to='#' className='icon-container close-popup'>
                        <AiOutlineClose onClick={showPopUp} />
                    </Link>
                    <div className="popup-content">
                        <h1>Deseja registrar este post nas suas revisões?</h1>
                        <div className="btns-popup">
                            <Button type='button' bg_color='secondary' fun={registerReview} text='sim' />
                            <Button type='button' bg_color='secondary' fun={showPopUp} text='não' />
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}