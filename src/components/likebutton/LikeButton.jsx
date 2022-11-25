import React, { useState } from 'react';
import './LikeButton.css';
import { onChangeHeart } from '../../utils/ArraysAndFunctions';


import { AiOutlineClose, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import Button from '../button/Button';
import { UserAuth } from '../../services/UserContext';
import { async } from '@firebase/util';

const LikeButton = ({ postId }) => {

    const [popUp, setPopUp] = useState(false);
    const showPopUp = () => setPopUp(!popUp);

    const { getReviews, ereviews } = UserAuth();

    //função que verifica nas revisões se há um post atribuido à ela
    const onChangeHeart = (id) => {
        getReviews(id);
        //pode ser pego todas as revisões existentes no banco e filtra-las com findIndex para achar em qual indice eles se encontram
        // let index = reviews.findIndex(i => i.post_id === id);
        if (index !== -1) {
            return true
        }
        return false

        // ou fazer uma query na tabela reviews onde pega todos os posts com o id passado para a função
        console.log(ereviews);
    }

    //colocar no useContext
    const registerReview = async () => {
        console.log('user e conteudo registrado em revisoes, setado o contador e primeira data de revisao');
        try {
            await addDoc(collection(db, "review"), {
                uid: user?.uid,
                userPhoto: user?.photoURL,
                imgContent: imgURL,
                name: name,
                title: title,
                content: content,
                category: favCategory_user,
                data: serverTimestamp(),
                reviewData: '22/30/22'
            });
            alert('Flashcard e Review criado!');
            cleanForm();
            navigate('/explore');
        } catch (err) {
            console.log(err)
        }
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