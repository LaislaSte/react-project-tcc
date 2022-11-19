import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Post.css';
import { morePostE, morePostI } from '../../utils/arraysHeader';

import { BiDotsVertical } from 'react-icons/bi';
import { useState } from 'react';

export const Post = ({
    content,
    user_name,
    user_id, //será usado para redirecionar a página para o perfil recebido pelo id/token
    avatar,
    category,
    title,
    img_content,
    click_type,
    userPostedIt
}) => {

    const [showMore, setShowMore] = useState(false);
    const onChange = () => setShowMore(!showMore);

    const navigate = useNavigate();

    const handleClick = (index) => {
        // if (index == 'Editar Postagem') {
        //     console.log(index)
        // }
        // if (index == 'Excluir Postagem') {
        //     console.log(index)
        // }
        // if (index == 'Adicionar às revisões') {
        //     console.log(index)
        // }
        console.log('clicado')
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

                </div>

                <div className="content-post">
                    <p>
                        {content}
                    </p>
                    <div className="img-content-container">
                        {img_content && (
                            <img src={img_content} alt="imagem do conteúdo do post" className='img-content' />
                        )}
                    </div>

                </div>

                <div className="footer-post">

                    {click_type}

                </div>



            </div>

        </>
    )
}