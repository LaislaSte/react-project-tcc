// HOOKS AND LIBS 
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsGearFill, BsFillArrowDownCircleFill } from 'react-icons/bs';
import { useAuthState } from 'react-firebase-hooks/auth';

// ARCHIVES FROM PROJECT
import './Profile.css';
import { morePostI } from '../../utils/arraysHeader';
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
    const [name, setName] = useState("");
    const [imgURL, setImgURL] = useState("");
    const [bio, setBio] = useState("");
    const [userPosts, setUserPosts] = useState([]);

    // imports
    const [user, loading, error] = useAuthState(auth);
    const { bios } = UserAuth();

    // useeffect 
    useEffect(
        () => {
            fetchUserInfos();
        },
        [user, loading]
    )

    // functions 
    const fetchUserInfos = async () => {
        try {
            const userName = user?.displayName;
            const userAvatar = user?.photoURL;
            setName(userName);
            setImgURL(userAvatar);
            setBio(bios);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };

    return (
        <div className='Profile'>
            <Navbar />
            <CreateButton />

            <header className='section-profile'>

                <div className="profile-container">
                    <div className="img-background">
                        <img src={imgURL ? imgURL : avatarDefault} alt="" />
                    </div>
                </div>

                <div className="bio">
                    <h2>{name}</h2>
                    {bio}
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
                    {post.map((item, index) => {
                        return (
                            <Post
                                key={index}
                                content={item.description}
                                user_name={item.user_name}
                                img_content={item.post_archive}
                                user_id={item.user_id}
                                avatar={item.user_vatar}
                                category={item.category}
                                title={item.title}
                                click_type={<LikeButton postId={item.id} />}
                            // moreContent={morePostI}
                            />
                        )
                    })}
                </div>
            </main>

        </div>
    )
}

export default Profile;

