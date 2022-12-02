// HOOKS AND LIBS 
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BsGearFill, BsFillArrowDownCircleFill } from 'react-icons/bs';
import { useAuthState } from 'react-firebase-hooks/auth';

// ARCHIVES FROM PROJECT
import './Profile.css';
import { onChangeFollow, post } from '../../utils/ArraysAndFunctions';
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
import { MdClose } from 'react-icons/md';
import GoToPageModal from './GoToPageModal';
import Button from '../../components/button/Button';

const UserDetail = () => {
    // states 
    // const [name, setName] = useState("");
    // const [imgURL, setImgURL] = useState("");
    // const [bio, setBio] = useState("");
    // const [userPosts, setUserPosts] = useState([]);
    // const [euser, setEuser] = useState({});
    // const [eposts, setEposts] = useState({});

    //modais para os seguidores e seguindo
    const [modalFollowing, setModalFollowing] = useState(false);
    const changeModalFollowing = () => setModalFollowing(!modalFollowing);
    const [modalFollowers, setModalFollowers] = useState(false);
    const changeModalFollowers = () => setModalFollowers(!modalFollowers);

    //parametro da url
    const { id } = useParams();

    // imports
    const { getExternalUser, getExternalPost, euser, eposts, uid, addFollowing, removeFollowing } = UserAuth();



    // function 
    /*ao clicar para redirecionar para o perfil, é redirecionado paraa a rota /user e passado o uid como parametro da url (/user/:id), nesta url estara o componente userdetails que ira usar o hook do router-dom para usar os parametros passados, esse parametro será usado para realizar uma filtragem de todos os users que há no banco e renderiar o que corresponder com a query feita.*/
    useEffect(() => {

        const getUser = () => {
            getExternalUser(id);
            getExternalPost(id);
        }
        // return () => {
        getUser()
        // }

    }, [id])

    const callAddFollower = () => {
        addFollowing(id);
    }
    const callRemoveFollower = () => {
        removeFollowing(id);
    }

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
                        <img src={euser.avatar ? euser.avatar : avatarDefault} alt="" />
                    </div>
                </div>

                <div className="bio">
                    <h2>{euser.name ? euser.name : 'Sem Nome'}</h2>
                    {euser.bio ? euser.bio : 'Nada por aqui'}

                    <div className="network">
                        <p onClick={changeModalFollowing} className='cursor-pointer'> Seguindo: {euser.following ? euser.following.length : 0} </p>
                        {
                            <div className={modalFollowing ? "modal open" : 'modal'}>
                                <MdClose onClick={changeModalFollowing} />
                                <div className="popup-container">
                                    <h1 className='follower-modal-h1'> Seguindo </h1>
                                    {euser.following
                                        ? euser.following.map(i => {
                                            return (
                                                <div className="modal-follows-container">
                                                    <GoToPageModal
                                                        uid={i.uid}
                                                        name={i.name}
                                                        avatar={i.avatar}
                                                        text='Seguindo'
                                                    />
                                                </div>
                                            )
                                        })
                                        : null
                                    }
                                </div>
                            </div>
                        }
                        <p onClick={changeModalFollowers} className='cursor-pointer'> Seguidores: {euser.followers ? euser.followers.length : 0} </p>
                        {
                            <div className={modalFollowers ? "modal open" : 'modal'}>
                                <MdClose onClick={changeModalFollowers} />
                                <div className="popup-container">
                                    <h1 className='follower-modal-h1'>Seguidores</h1>
                                    {euser.followers
                                        ? euser.followers.map(i => {
                                            return (
                                                <GoToPageModal
                                                    className='popup-container'
                                                    uid={i.uid}
                                                    name={i.name}
                                                    avatar={i.avatar}
                                                    text='seguidores'
                                                />
                                            )
                                        })
                                        : null
                                    }
                                </div>
                            </div>
                        }
                    </div>

                </div>

                <div className="header-button-profile">
                    {onChangeFollow(euser.followers ? euser.followers : [], uid)
                        ? (
                            <Button
                                text='Deixar de seguir'
                                type='button'
                                bg_color='primary'
                                fun={callRemoveFollower}
                            />
                        )
                        : (
                            <Button
                                text='Seguir'
                                type='button'
                                bg_color='primary'
                                fun={callAddFollower}
                            />
                        )
                    }
                </div>

            </header>

            <main className="section-posts">
                <h1>Postagens Realizadas <BsFillArrowDownCircleFill className='footer-icon' /> </h1>

                <div className="posts-container">
                    {eposts.map((item, index) => {
                        return (
                            <>
                                <Post
                                    key={index}
                                    postId={item.eid}
                                    user_id={item.euid}
                                    // user_name={name}
                                    // avatar={imgURL}
                                    user_name={euser.name ? euser.name : 'Sem Nome'}
                                    avatar={euser.avatar ? euser.avatar : null}
                                    title={item.etitle}
                                    category={item.ecategory}
                                    content={item.econtent}
                                    img_content={item.econtentImg}
                                    likes={item.elikes}
                                    click_type_like={
                                        <LikeButton
                                            postId={item.eid}
                                            uid={item.euid}
                                            user_name={euser.name ? euser.name : 'Sem Nome'}
                                            userPhoto={euser.avatar ? euser.avatar : null}
                                            title={item.etitle}
                                            category={item.ecategory}
                                            content={item.econtent}
                                            imgContent={item.econtent}
                                        />
                                    }
                                    internalUser={false}
                                />
                            </>
                        )
                    })
                    }
                </div>

            </main>

        </div>
    )
}

export default UserDetail;

