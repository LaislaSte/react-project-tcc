// HOOKS AND LIBS 
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BsGearFill, BsFillArrowDownCircleFill } from 'react-icons/bs';
import { useAuthState } from 'react-firebase-hooks/auth';

// ARCHIVES FROM PROJECT
import './Profile.css';
import { post } from '../../utils/ArraysAndFunctions';
import avatarDefault from '../../assets/img-avatar.png';
import { auth, db } from '../../services/Banco';
import { UserAuth } from '../../services/UserContext'

/*PAGES AND COMPONENTS */
import LikeButton from '../../components/likebutton/LikeButton';
import { Post } from '../../components/post/Post';
import Navbar from '../../components/navbar/Navbar';
import CreateButton from '../../components/createbutton/CreateButton';
import { resultSearch } from '../../utils/arraysNavbar';
import { collection, getDocs, query, where } from 'firebase/firestore';

const UserDetail = () => {
    // states 
    const [name, setName] = useState("");
    const [imgURL, setImgURL] = useState("");
    const [bio, setBio] = useState("");
    const [userPosts, setUserPosts] = useState([]);
    // const [euser, setEuser] = useState({});
    // const [eposts, setEposts] = useState({});

    //parametro da url
    const { id } = useParams();

    // imports
    const { getExternalUser, getExternalPost, euser, eposts } = UserAuth();



    // function 
    /*ao clicar para redirecionar para o perfil, é redirecionado paraa a rota /user e passado o uid como parametro da url (/user/:id), nesta url estara o componente userdetails que ira usar o hook do router-dom para usar os parametros passados, esse parametro será usado para realizar uma filtragem de todos os users que há no banco e renderiar o que corresponder com a query feita.*/
    useEffect(() => {

        const getUser = () => {
            getExternalPost(id);
            getExternalUser(id);
        }
        // return () => {
        getUser()
        // }

    }, [id])


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
                        <img src={euser?.avatar || avatarDefault} alt="" />
                    </div>
                </div>

                <div className="bio">
                    <h2>{euser?.name ? euser?.name : 'Sem Nome'}</h2>
                    {euser?.bio ? euser?.bio : 'Nada psor aqui'}
                </div>

            </header>

            <main className="section-posts">
                <h1>Postagens Realizadas <BsFillArrowDownCircleFill className='footer-icon' /> </h1>

                {eposts.map((item, index) => {
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

