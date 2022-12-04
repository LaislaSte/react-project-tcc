import React, { useState } from 'react';
import './LikeButton.css';
import { onChangeHeart } from '../../utils/ArraysAndFunctions';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useAuthState } from 'react-firebase-hooks/auth';

// ARCHIVES FROM PROJECT
import { fakeUser } from '../../utils/ArraysAndFunctions';
import imageDefault from '../../assets/icons/uploadDefault.svg'
import avatarDefault from '../../assets/icons/avatarDefault.svg'
import { postContentValid, titleValid, validCBpost } from '../../utils/validators';
import { db, auth, storage } from '../../services/Banco';


import { AiOutlineClose, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import Button from '../button/Button';
import { UserAuth } from '../../services/UserContext';
import { async } from '@firebase/util';
import { useEffect } from 'react';

const LikeButton = ({
    postId,
    reviewId,
    uid,
    userPhoto,
    imgContent,
    user_name,
    title,
    content,
    category,
}) => {

    const [popUp, setPopUp] = useState(false);
    const showPopUp = () => setPopUp(!popUp);

    // imports 
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);
    const { registerReview, reviews, getReviews, removeReview, addLikePost, removeLikePost } = UserAuth();

    // useEffect(() => {
    //     const getAllReviews = () => {
    //         getReviews();
    //     }
    //     getAllReviews();
    // }, [])

    //colocar no useContext
    const addReview = () => {
        registerReview(
            postId,
            uid,
            userPhoto,
            imgContent,
            user_name,
            title,
            content,
            category
        );

        addLikePost(postId);
        showPopUp();
    }

    const delteReview = () => {
        removeReview(postId);
        removeLikePost(postId);
        showPopUp();
    }

    return (
        <>
            <div className="post-like-container">
                {
                    onChangeHeart(reviews, postId) ? (<AiFillHeart className='post-like-container-icon' onClick={showPopUp} />) : (<AiOutlineHeart className='post-like-container-icon' onClick={showPopUp} />)
                }
            </div>

            <div className={popUp ? 'modal open' : 'modal'}>
                <AiOutlineClose onClick={showPopUp} />
                <div className="popup-container">

                    {onChangeHeart(reviews, postId)
                        ? (
                            <>
                                <h1>Deseja remover este post das suas revisões?</h1>
                                <div className="btns-popup">
                                    <Button type='button' bg_color='secondary' fun={delteReview} text='sim' />
                                    <Button type='button' bg_color='secondary' fun={showPopUp} text='não' />
                                </div>
                            </>
                        )

                        : (
                            <>
                                <h1>Deseja registrar este post nas suas revisões?</h1>
                                <div className="btns-popup">
                                    <Button type='button' bg_color='secondary' fun={addReview} text='sim' />
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