import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { query, collection, getDocs, where } from "firebase/firestore";
import { db } from '../../services/Banco';
import './Profile.css';
import { morePostI } from '../../utils/arraysHeader';
import { fakeReviews } from '../../utils/ArraysAndFunctions';
import { post, fakeUser } from '../../utils/ArraysAndFunctions';
import avatarDefault from '../../assets/img-avatar.png';

import LikeButton from '../../components/likebutton/LikeButton';
import { Post } from '../../components/post/Post';
import Navbar from '../../components/navbar/Navbar';
import CreateButton from '../../components/createbutton/CreateButton';

import { BsGearFill, BsFillArrowDownCircleFill } from 'react-icons/bs';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../services/Banco';

const Profile = () => {

    const [name, setName] = useState("");
    const [imgURL, setImgURL] = useState("");
    const [bios, setBios] = useState("");

    const [userPosts, setUserPosts] = useState([]);

    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const fetchUserInfos = async () => {
        try {
            // const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            // const doc = await getDocs(q);
            // const data = doc.docs[0].data();
            const userBios = user?.bios;
            const userName = user?.email;
            const userAvatar = user?.photoURL;
            setName(userName);
            setImgURL(userAvatar);
            setBios(userBios);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };

    useEffect(
        () => {
            fetchUserInfos();
        },
        [user, loading]
    )

    // useEffect(() => {
    //     if (loading) return;
    //     if (!user) return navigate("/");
    //     fetchUserName();
    // }, [user, loading]);

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

                <div className="bios">
                    <h2>{name}</h2>
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
                                moreContent={morePostI}
                            />
                        )
                    })}
                </div>
            </main>

        </div>
    )
}

export default Profile;

