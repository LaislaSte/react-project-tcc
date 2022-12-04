import React, { useState } from 'react';
import moment from 'moment/moment';
import './ReviewButton.css'
import Button from '../button/Button';
import { AiOutlineClose } from 'react-icons/ai';

import { findPostsOfUser, onChangeHeart } from '../../utils/ArraysAndFunctions';
import { dateChangeReview, testMoment } from '../../utils/fakeData'
import { UserAuth } from '../../services/UserContext';

const ReviewButton = ({
    reviewId,
    currentCounter
}) => {

    //usestate
    const [popUp, setPopUp] = useState(false);
    const showPopUp = () => setPopUp(!popUp);

    //imports
    const { updateReview, removeReview, getReviews } = UserAuth(); //talvez eu passe por props do elemento com o id da review

    //functions
    //função para atualizar data de revisão e contador
    const alreadyReviewed = () => {
        // console.log('setado no contador e atualizando ele na tabela revisao mais a nova data de revisao');

        // pegar a data atual no banco e colocar em current date
        //o moment pode pegar uma data e hora q passar, basta apenas especificar qual seu formato, use o boolean para strict-mode
        // moment("20-10-2010 4:30", "DD-MM-YYYY HH:mm", true); //OU:
        // moment('24/12/2019 09:15', "DD MM YYYY hh:mm", true);

        // const counter = reviews.counter; //counter
        // const currentDate = newDate
        // const counter = newCounter; //counter

        let stillReviwing = true;
        const result = dateChangeReview(currentCounter, stillReviwing);
        console.log('nova data: ', result.date, 'novo contador: ', result.count);

        //atualiza o documento com os novos valores dos parametros data de review e contador
        updateReview(reviewId, result.date, result.count);

        alert('revisão atualizada');
        showPopUp()
        stillReviwing = false;
    }

    //função para deletar review
    // const dontShowMore = () => {
    //     // removeReview(reviewId);
    //     showPopUp()
    // }

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
                            <Button type='button' bg_color='secondary' fun={showPopUp} text='não' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewButton