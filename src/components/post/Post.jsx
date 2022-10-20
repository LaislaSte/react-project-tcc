import React from 'react';
import './Post.css'
import { BiDotsVertical } from 'react-icons/bi';

export const Post = ({
    content,
    user_name,
    avatar,
    img_content,
    click_type
}) => {

    return (
        <>
            <div className='post-container'>

                <div className="header-post">

                    <div className="header-content-user">
                        <div className="header-user-avatar">
                            <img src={avatar} alt="avatar do usuário do post" className='header-user-avatar-img' />
                        </div>
                        <p> {user_name} </p>
                    </div>

                    <div className="header-show-more">
                        <BiDotsVertical />
                    </div>
                </div>

                <div className="content-post">
                    <p>
                        {content}
                    </p>
                    <div className="img-content-container">
                        <img src={img_content} alt="imagem do conteúdo do post" className='img-content' />
                    </div>

                </div>

                {click_type}

            </div>

        </>
    )
}