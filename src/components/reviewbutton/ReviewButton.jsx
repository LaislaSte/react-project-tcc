import React, { useState } from 'react';
import moment from 'moment/moment';
import './ReviewButton.css'
import Button from '../button/Button';
import { AiOutlineClose } from 'react-icons/ai';

import { findPostsOfUser, onChangeHeart } from '../../utils/ArraysAndFunctions';
import { dateChangeReview, testMoment } from '../../utils/fakeData'
import { UserAuth } from '../../services/UserContext';

const ReviewButton = ({ reviewId }) => {

    //usestate
    const [isReviwed, setIsReviwed] = useState(false);

    const [popUp, setPopUp] = useState(false);
    const showPopUp = () => setPopUp(!popUp);

    //imports
    const { updateReview } = UserAuth();

    const alreadyReviewed = () => {
        // console.log('setado no contador e atualizando ele na tabela revisao mais a nova data de revisao');
        let isReviwed = true;
        //  setIsReviwed(true);

        // const aa = testMoment();

        // pegar a data atual no banco e colocar em current date
        const currentDate = moment();
        const counter = 5
        const result = dateChangeReview(currentDate, isReviwed, counter);
        console.log('nova data: ', result.date, 'novo contador: ', result.count);

        //atualiza o documento com os novos valores dos parametros data de review e contador
        // updateReview(reviewId, newDate, newCounter);

        //  setIsReviwed(false);
        isReviwed = false;
        alert('revisão atualizada');
        showPopUp()
    }

    const deleteReview = () => {
        console.log('excluir revisão');
        showPopUp()
    }

    function verifiedLoginAndReview(id_post, arrPost) {
        //há um post atribuido a revisao? se sim return true 
        const a = onChangeHeart(id_post);

        //o post é do user logado? se sim return true 
        const b = findPostsOfUser(arrPost);
    }

    return (
        <div className='post-review-container'>
            <Button
                text='Já revisei'
                fun={showPopUp}
                bg_color='primary review-btn'
            />

            <div className={popUp ? 'modal open' : 'modal'}>
                <div className="popup-container">
                    <div className='icon-container close-popup'>
                        <AiOutlineClose onClick={showPopUp} />
                    </div>
                    <div className="popup-content">
                        <h1>Continuar revisando este post?</h1>
                        <div className="btns-popup">
                            <Button type='button' bg_color='secondary' fun={alreadyReviewed} text='sim' />
                            <Button type='button' bg_color='secondary' fun={deleteReview} text='não' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewButton