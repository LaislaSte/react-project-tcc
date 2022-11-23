import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiPencil, BiTrash } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';

import './Post.css';
import { UserAuth } from '../../services/UserContext';
import Button from '../button/Button';
import Input from '../input/Input';
import TxtArea from '../txtarea/TxtArea';
import { fakeUser } from '../../utils/ArraysAndFunctions';
import InputImg from '../inputImg/InputImg';
import UpdatePost from '../popupmenu/UpdatePost';
import { AiOutlineClose } from 'react-icons/ai';

export const Post = ({
    postId,
    content,
    user_name,
    user_id, //será usado para redirecionar a página para o perfil recebido pelo id/token
    avatar,
    category,
    title,
    img_content,
    click_type_review,
    click_type_like,
    internalUser
}) => {

    const [modal, setModal] = useState(false);
    const onCickImg = () => setModal(!modal);

    const [showMore, setShowMore] = useState(false);
    const onClickSM = () => setShowMore(!showMore);

    const [showMore1, setShowMore1] = useState(false);
    const onClickSM1 = () => setShowMore1(!showMore1);

    const { deletePost, updatePost } = UserAuth();

    const navigate = useNavigate();

    const clickDeletePost = () => {
        deletePost(postId);
        onClickSM1();
    }
    const clickUpdtePost = () => {
        updatePost();
    }

    return (
        <>
            <div className='post-container'>

                <div className="header-post">

                    <div className="header-content-user" >
                        <div className="header-user-avatar">
                            <img src={avatar} alt="avatar do usuário do post" className='header-user-avatar-img' />
                        </div>
                        <p> {user_name} </p>
                    </div>


                    {internalUser && (
                        <div className="header-icons">
                            <BiTrash onClick={onClickSM1} />
                            <div className={showMore1 ? 'modal open' : 'modal'}>
                                <AiOutlineClose onClick={onClickSM1} />
                                <div className="popup-container">
                                    <h1>Certeza que deseja excluir?</h1>
                                    <div className="btns-popup">
                                        <Button text='Sim' fun={clickDeletePost} bg_color='secondary' type='button' />
                                        <Button text='Não' fun={onClickSM1} bg_color='secondary' type='button' />
                                    </div>
                                </div>
                            </div>

                            <BiPencil onClick={onClickSM} />
                            {showMore
                                ? (
                                    <UpdatePost
                                        funPopUp={onClickSM}
                                        postId={postId}
                                    />
                                )
                                : null
                            }

                        </div>
                    )}

                </div>

                <div className="content-post">
                    <h2 >
                        {title} - {category}
                    </h2>

                    <p> {content} </p>
                    <div className="img-content-container">
                        {img_content && (
                            <img src={img_content} alt="imagem do conteúdo do post" onClick={onCickImg} />
                        )}
                    </div>

                    <div className={modal ? "modal open" : 'modal'}>
                        <img src={img_content} alt="" />
                        <MdClose onClick={onCickImg} />
                    </div>

                </div>

                <div className="footer-post">
                    {click_type_review}
                    {click_type_like}
                </div>

            </div>

        </>
    )
}