import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiPencil, BiTrash } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';

import './Post.css';
import { UserAuth } from '../../services/UserContext';

export const Post = ({
    content,
    user_name,
    user_id, //será usado para redirecionar a página para o perfil recebido pelo id/token
    avatar,
    category,
    title,
    img_content,
    click_type,
    internalUser
}) => {

    const [showMore, setShowMore] = useState(false);
    const onChange = () => setShowMore(!showMore);
    const [modal, setModal] = useState(false);
    const onCickImg = () => setModal(!modal);

    const { deletePost, updatePost } = UserAuth();

    const navigate = useNavigate();

    const clickDeletePost = () => {
        deletePost();
    }
    const clickUpdtePost = () => {
        updatePost();
    }

    return (
        <>
            <div className='post-container'>

                <div className="header-post">
                    <div className="header-user-post">

                        <div className="header-content-user" >
                            <div className="header-user-avatar">
                                <img src={avatar} alt="avatar do usuário do post" className='header-user-avatar-img' />
                            </div>
                            <p> {user_name} </p>
                        </div>

                        <h3 >
                            <p> {title} </p> - <p className='p-italic'>{category}</p>
                        </h3>

                    </div>

                    {internalUser && (
                        <div className="header-icons">
                            <BiTrash onClick={clickDeletePost} />
                            <BiPencil onClick={clickUpdtePost} />
                        </div>
                    )}

                </div>

            </div>


            <div className="content-post">
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

                {click_type}

            </div>

        </>
    )
}