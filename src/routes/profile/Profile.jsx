// HOOKS AND LIBS 
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

const Profile = () => {
    // states 
    // const [name, setName] = useState("");
    // const [imgURL, setImgURL] = useState("");
    // const [bio, setBio] = useState("");
    // todos: importar posts do usuario logado do firestore e adicionalos nesse estado
    const [userPosts, setUserPosts] = useState([]);

    // imports
    const [user, loading, error] = useAuthState(auth);
    const { bios, imgUrl, name, uposts, getUserId } = UserAuth();

    // function 
    useEffect(() => {
        // const callUser = () => {
        getUserId();
        // setUserPosts(uposts);
        // }

        // return () => {
        //     //useEffect antes de renderizar novamente, execute a função
        //     callUser()
        // }

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
                        <img src={imgUrl ? imgUrl : avatarDefault} alt="" />
                    </div>
                </div>

                <div className="bio">
                    <h2>{user.displayName}</h2>
                    {bios}
                </div>

                <div className="header-button-profile">
                    <Link to='/config'>
                        <BsGearFill className='header-profile-icon' />
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
                                postId={item.eid}
                                internalUser={true}
                                user_id={user.uid}
                                user_name={name}
                                avatar={imgUrl}
                                title={item.etitle}
                                category={item.ecategory}
                                content={item.econtent}
                                img_content={item.econtentImg}
                                click_type_like={<LikeButton postId={item.eid} />}
                            />
                        )
                    })}
                </div>
            </main>

        </div>
    )
}

export default Profile;

