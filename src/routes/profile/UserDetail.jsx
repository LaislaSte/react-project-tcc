// HOOKS AND LIBS 
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BsGearFill, BsFillArrowDownCircleFill } from 'react-icons/bs';
import { useAuthState } from 'react-firebase-hooks/auth';

// ARCHIVES FROM PROJECT
import './Profile.css';
import { post } from '../../utils/ArraysAndFunctions';
import avatarDefault from '../../assets/img-avatar.png';
import { auth } from '../../services/Banco';
import { UserAuth } from '../../services/UserContext'

/*PAGES AND COMPONENTS */
import LikeButton from '../../components/likebutton/LikeButton';
import { Post } from '../../components/post/Post';
import Navbar from '../../components/navbar/Navbar';
import CreateButton from '../../components/createbutton/CreateButton';
import { resultSearch } from '../../utils/arraysNavbar';

const UserDetail = () => {
    // states 
    const [name, setName] = useState("");
    const [imgURL, setImgURL] = useState("");
    const [bio, setBio] = useState("");
    // const [euser, setEuser] = useState(null);
    // todos: importar posts do usuario logado do firestore e adicionalos nesse estado
    const [userPosts, setUserPosts] = useState([]);

    const { id } = useParams();

    // imports
    const [user, loading, error] = useAuthState(auth);
    const { getExternalUser, euser } = UserAuth();

    // function 
    /*ao clicar para redirecionar para o perfil, é redirecionado para a rota /user e passado o uid como parametro da url (/user/:id), nesta url estara o componente userdetails que ira usar o hook do router-dom para usar os parametros passados, esse parametro será usado para realizar uma filtragem de todos os users que há no banco e renderiar o que corresponder com a query feita.*/
    useEffect(() => {
        const callUser = () => {
            try {
                getExternalUser(id);
                console.log(euser?.espost.map(i => i.econtent));
                // setName(euser.name);
                // setImgURL(euser.avatar);
            } catch (error) {
                console.log(error);
            }
        }
        callUser()

    }, [])


    return (
        <div className='Profile'>
            <Navbar />
            <CreateButton />

            <div className="aaa">
                <h1>
                    google ads
                </h1>
            </div>

            <header className='section-profile'>

                <div className="profile-container">
                    <div className="img-background">
                        <img src={euser?.avatar ? euser?.avatar : avatarDefault} alt="" />
                    </div>
                </div>

                <div className="bio">
                    <h2>{euser?.name ? euser?.name : 'Sem Nome'}</h2>
                    {euser?.bio ? euser?.bio : 'Nada por aqui'}
                </div>

            </header>

            <main className="section-posts">
                <h1>Postagens Realizadas <BsFillArrowDownCircleFill className='footer-icon' /> </h1>

                {euser.espost[0] && (
                    <>
                        {euser?.espost.map((item, index) => {
                            return (
                                <>
                                    <div className="posts-container">
                                        <Post
                                            key={index}
                                            postId={item.eid}
                                            user_id={item.euid}
                                            // user_name={name}
                                            // avatar={imgURL}
                                            user_name={euser.name}
                                            avatar={euser.avatar}
                                            title={item.etitle}
                                            category={item.ecategory}
                                            content={item.econtent}
                                            img_content={item.econtentImg}
                                            click_type_like={<LikeButton postId={item.eid} />}
                                            internalUser={false}
                                        />
                                    </div>
                                </>
                            )
                        })
                        }
                    </>
                )}
                {/* {euser?.espost?.map((item, index) => {
                    <>
                        <div className="posts-container">
                            <Post
                                key={index}
                                postId={item.eid}
                                user_id={item.euid}
                                // user_name={name}
                                // avatar={imgURL}
                                user_name={euser.name}
                                avatar={euser.avatar}
                                title={item.etitle}
                                category={item.ecategory}
                                content={item.econtent}
                                img_content={item.econtentImg}
                                click_type_like={<LikeButton postId={item.eid} />}
                                internalUser={false}
                            />
                        </div>
                    </>


                })} */}

            </main>

        </div>
    )
}

export default UserDetail;

