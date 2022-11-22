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
    // todos: importar posts do usuario logado do firestore e adicionalos nesse estado
    const [userPosts, setUserPosts] = useState([]);

    const { id } = useParams();

    // imports
    const [user, loading, error] = useAuthState(auth);
    const { bios } = UserAuth();

    return (
        <div className='Profile'>
            <Navbar />
            <CreateButton />

            {resultSearch.filter(item => item.id.includes(id)).map(i => {
                return (
                    <>
                        <header className='section-profile' key={i.id}>

                            <div className="profile-container">
                                <div className="img-background">
                                    <img src={i.avatar ? i.avatar : avatarDefault} alt="" />
                                </div>
                            </div>

                            <div className="bio">
                                <h2>{i.name}</h2>
                                {i.bios}
                            </div>

                        </header>

                        <main className="section-posts">
                            {i.posts && (
                                <>
                                    <h1>Postagens Realizadas <BsFillArrowDownCircleFill className='footer-icon' /> </h1>
                                    <div className="posts-container">
                                        {i.posts.map((item, index) => {
                                            return (
                                                <Post
                                                    key={index}
                                                    content={item.content}
                                                    user_name={item.name}
                                                    img_content={item.imgContent}
                                                    user_id={item.uid}
                                                    avatar={item.userPhoto}
                                                    category={item.category}
                                                    title={item.title}
                                                    postId={item.postId}
                                                    click_type_like={<LikeButton postId={item.postId} />}
                                                    internalUser={false}
                                                />
                                            )
                                        })}
                                    </div>
                                </>
                            )}
                        </main>

                    </>
                )
            })}


            <main className="section-posts">
                {resultSearch.filter(item => item.id.includes(id)).map((item, index) => {
                    item.posts && (
                        <>

                            <h1>Postagens Realizadas <BsFillArrowDownCircleFill className='footer-icon' /> </h1>
                            <div className="posts-container">
                                {item.posts.map((i, index) => {
                                    return (
                                        <Post
                                            key={index}
                                            content={i.content}
                                            user_name={i.name}
                                            img_content={i.imgContent}
                                            user_id={i.uid}
                                            avatar={i.userPhoto}
                                            category={i.category}
                                            title={i.title}
                                            postId={i.postId}
                                            click_type_like={<LikeButton postId={i.postId} />}
                                            internalUser={false}
                                        />
                                    )
                                })}
                            </div>

                        </>
                    )


                })}

            </main>

        </div>
    )
}

export default UserDetail;

