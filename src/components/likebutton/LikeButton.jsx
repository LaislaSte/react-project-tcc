import React, { useState } from 'react';
import './LikeButton.css';
import { onChangeHeart } from '../../utils/ArraysAndFunctions';


import { AiOutlineClose, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import Button from '../button/Button';

const LikeButton = ({ postId }) => {

    const [popUp, setPopUp] = useState(false);
    const showPopUp = () => setPopUp(!popUp);

    const registerReview = () => {
        console.log('user e conteudo registrado em revisoes, setado o contador e primeira data de revisao');
        showPopUp()
    }
    const removeReview = () => {
        console.log('user e conteudo removido das revisoes');
        showPopUp()
    }

    return (
        <>
            <div className="post-like-container">
                {
                    onChangeHeart(postId) ? (<AiFillHeart className='post-like-container-icon' onClick={showPopUp} />) : (<AiOutlineHeart className='post-like-container-icon' onClick={showPopUp} />)
                }
            </div>

            <div className={popUp ? 'modal open' : 'modal'}>
                <AiOutlineClose onClick={showPopUp} />
                <div className="popup-container">

                    {onChangeHeart(postId)
                        ? (
                            <>
                                <h1>Deseja remover este post das suas revisões?</h1>
                                <div className="btns-popup">
                                    <Button type='button' bg_color='secondary' fun={removeReview} text='sim' />
                                    <Button type='button' bg_color='secondary' fun={showPopUp} text='não' />
                                </div>
                            </>
                        )

                        : (
                            <>
                                <h1>Deseja registrar este post nas suas revisões?</h1>
                                <div className="btns-popup">
                                    <Button type='button' bg_color='secondary' fun={registerReview} text='sim' />
                                    <Button type='button' bg_color='secondary' fun={showPopUp} text='não' />
                                </div>
                            </>
                        )
                    }

                </div>
            </div>
        </>
    )
}

export default LikeButton