import React, { useState } from 'react';
import './ReviewButton.css'
import Button from '../button/Button';
import { AiOutlineClose } from 'react-icons/ai';

const ReviewButton = () => {

    const [popUp, setPopUp] = useState(false);
    const showPopUp = () => setPopUp(!popUp);

    const updateReview = () => {
        console.log('user e conteudo registrado como revisão setado no contador e atualizando ele na tabela revisao mais a nova data de revisao');
        showPopUp()
    }

    const deleteReview = () => {
        console.log('excluir revisão');
        showPopUp()
    }

    return (
        <>
            <Button
                text='Já revisei'
                fun={showPopUp}
                bg_color='primary review-btn'
            />

            <div className={popUp ? 'popup-menu popup-menu-active' : 'popup-menu'}>
                <div className="popup-container">
                    <div className='icon-container close-popup'>
                        <AiOutlineClose onClick={showPopUp} />
                    </div>
                    <div className="popup-content">
                        <h1>Deseja continuar revisando este post?</h1>
                        <div className="btns-popup">
                            <Button type='button' bg_color='secondary' fun={updateReview} text='sim' />
                            <Button type='button' bg_color='secondary' fun={deleteReview} text='não' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReviewButton