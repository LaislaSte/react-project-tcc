// HOOKS AND LIBS 
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BsGearFill, BsFillArrowDownCircleFill } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';

// ARCHIVES FROM PROJECT
import './Profile.css';
import avatarDefault from '../../assets/img-avatar.png';
import { auth } from '../../services/Banco';
import { UserAuth } from '../../services/UserContext'

/*PAGES AND COMPONENTS */
import LikeButton from '../../components/likebutton/LikeButton';
import { Post } from '../../components/post/Post';
import Navbar from '../../components/navbar/Navbar';
import CreateButton from '../../components/createbutton/CreateButton';
import GoToPageModal from './GoToPageModal';

const Profile = () => {
    // states 
    // const [name, setName] = useState("");
    // const [imgURL, setImgURL] = useState("");
    // const [bio, setBio] = useState("");
    // todos: importar posts do usuario logado do firestore e adicionalos nesse estado
    // const [userPosts, setUserPosts] = useState([]);

    //modais para os seguidores e seguindo
    const [modalFollowing, setModalFollowing] = useState(false);
    const changeModalFollowing = () => setModalFollowing(!modalFollowing);
    const [modalFollowers, setModalFollowers] = useState(false);
    const changeModalFollowers = () => setModalFollowers(!modalFollowers);

    // imports
    const [user, loading, error] = useAuthState(auth);
    // const { bios, imgUrl, name, uposts, getUserId, following, followers } = UserAuth();
    const { bios, imgUrl, name, uposts, getUserId, getPosts, getReviews } = UserAuth();

    // useeffect
    useEffect(() => {
        console.log('effect runded');
        const callUser = () => {
            getUserId();
            getReviews();
            getPosts();
        }
        callUser()

    }, []);

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
                        <img src={imgUrl ? imgUrl : avatarDefault} alt="" />
                    </div>
                </div>

                <div className="bio">
                    <h2>{name || user.displayName || 'sem Nome'}</h2>
                    {bios}

                    {/* <div className="network">
                        <p onClick={changeModalFollowing} className='cursor-pointer'> Seguindo: {following ? following.length : 0} </p>
                        {
                            <div className={modalFollowing ? "modal open" : 'modal'}>
                                <MdClose onClick={changeModalFollowing} />
                                <div className="popup-container">
                                    <h1 className='follower-modal-h1'> Seguindo </h1>
                                    {following
                                        ? following.map(i => {
                                            return (
                                                <div className="modal-follows-container">
                                                    <GoToPageModal
                                                        className='modal-follows-container'
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
                        <p onClick={changeModalFollowers} className='cursor-pointer'> Seguidores: {followers ? followers.length : 0} </p>
                        {
                            <div className={modalFollowers ? "modal open" : 'modal'}>
                                <MdClose onClick={changeModalFollowers} />
                                <div className="popup-container">
                                    <h1 className='follower-modal-h1'>Seguidores</h1>
                                    {followers
                                        ? followers.map(i => {
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
                    </div> */}

                </div>

                <div className="header-button-profile">
                    <Link to='/config'>
                        <BsGearFill />
                    </Link>
                </div>
            </header>

            <main className="section-posts">
                <h1>Postagens Realizadas <BsFillArrowDownCircleFill className='footer-icon' /> </h1>
                <div className="posts-container">
                    {uposts.map((item, index) => {
                        return (
                            <Post
                                key={index}
                                postId={item.id}
                                internalUser={true}
                                user_id={user.uid}
                                user_name={name ? name : user.displayName}
                                avatar={imgUrl}
                                title={item.title}
                                category={item.category}
                                content={item.content}
                                img_content={item.img_content}
                                likes={item.likes}
                                click_type_like={
                                    <LikeButton
                                        postId={item.id}
                                        uid={user.uid}
                                        userPhoto={imgUrl}
                                        imgContent={item.img_content}
                                        user_name={name || user.displayName}
                                        title={item.title}
                                        content={item.content}
                                        category={item.category}
                                    />
                                }
                            />
                        )
                    })}
                </div>
            </main>

        </div>
    )
}

export default Profile;

