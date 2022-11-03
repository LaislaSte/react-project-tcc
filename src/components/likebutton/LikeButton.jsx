import React, { useState } from 'react';
import './LikeButton.css';
import { onChangeHeart } from '../../utils/profileFunctions';


import { AiOutlineClose, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import Button from '../button/Button';

const LikeButton = ({ postId }) => {

    const [popUp, setPopUp] = useState(false);
    const showPopUp = () => setPopUp(!popUp);

    const registerReview = () => {
        console.log('user e conteudo registrado em revisoes, setado o contador e primeira data de revisao');
        showPopUp()
    }

    return (
        <>
            <div className="post-like-container">
                {
                    onChangeHeart(postId) ? (<AiFillHeart className='post-like-container-icon' onClick={showPopUp} />) : (<AiOutlineHeart className='post-like-container-icon' onClick={showPopUp} />)
                }
                {/* <FaHeart
                    // className='post-like-container-icon post-like-container-true'
                    className={onChangeHeart(postId) ? 'post-like-container-icon post-like-container-true' : 'post-like-container-icon post-like-container-false'}
                    onClick={showPopUp}
                /> */}
            </div>

            <div className={popUp ? 'popup-menu popup-menu-active' : 'popup-menu'}>
                <div className="popup-container">
                    <div className='icon-container close-popup'>
                        <AiOutlineClose onClick={showPopUp} />
                    </div>
                    <div className="popup-content">
                        <h1>Deseja registrar este post nas suas revisões?</h1>
                        <div className="btns-popup">
                            <Button type='button' bg_color='secondary' fun={registerReview} text='sim' />
                            <Button type='button' bg_color='secondary' fun={showPopUp} text='não' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LikeButton