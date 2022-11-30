// HOOKS AND LIBS 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { BiPencil, BiTrash } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';

// ARCHIVES FROM PROJECT
import './Post.css';
import { UserAuth } from '../../services/UserContext';
import avatarDefault from '../../assets/icons/avatarDefault.svg'
import { fakeUser } from '../../utils/ArraysAndFunctions';

/*PAGES AND COMPONENTS */
import Button from '../button/Button';
import UpdatePost from '../popupmenu/UpdatePost';

export const Post = ({
    postId,
    content,
    user_name,
    user_id, //será usado para redirecionar a página para o perfil recebido pelo id/token
    avatar,
    category,
    title,
    likes,
    img_content,
    click_type_review,
    click_type_like,
    internalUser
}) => {

    // states e functions para os popups 
    const [modal, setModal] = useState(false);
    const onCickImg = () => setModal(!modal);
    const [showMore, setShowMore] = useState(false);
    const onClickSM = () => setShowMore(!showMore);
    const [showMore1, setShowMore1] = useState(false);
    const onClickSM1 = () => setShowMore1(!showMore1);

    // imports 
    const { deletePost } = UserAuth();
    const navigate = useNavigate();

    // functions 
    //função que chama o deletar post do context
    const clickDeletePost = () => {
        deletePost(postId);
        onClickSM1();
    }

    /*ao clicar para redirecionar para o perfil, é redirecionado para a rota /user e passado o uid como parametro da url (/user/:id), nesta url estara o componente userdetails que ira usar o hook do router-dom para usar os parametros passados, esse parametro será usado para realizar uma filtragem de todos os users que há no banco e renderiar o que corresponder com a query feita.*/
    const goToUserPage = () => {
        navigate(`/user/${user_id}`);
    }

    return (
        <>
            <div className='post-container'>

                <div className="header-post">

                    <div className="header-content-user" onClick={goToUserPage}>
                        <div className="header-user-avatar">
                            <img src={avatar ? avatar : avatarDefault} alt="avatar do usuário do post" className='header-user-avatar-img' />
                        </div>
                        <p> {user_name ? user_name : 'Sem Nome'} </p>
                    </div>


                    {internalUser
                        ? (
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
                        )
                        : null
                    }

                </div>

                <div className="content-post">
                    <h2 >
                        {title} - {category}
                    </h2>

                    <p> {content} </p>
                    <div className="img-content-container">
                        {img_content
                            ? (
                                <>
                                    <img src={img_content} alt="imagem do conteúdo do post" onClick={onCickImg} />
                                    <div className={modal ? "modal open" : 'modal'}>
                                        <img src={img_content} alt="" />
                                        <MdClose onClick={onCickImg} />
                                    </div>
                                </>
                            )
                            : null
                        }
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