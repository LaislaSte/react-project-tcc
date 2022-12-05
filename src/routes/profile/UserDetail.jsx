// HOOKS AND LIBS 
import React from 'react';
import { useParams } from 'react-router-dom';
import { BsFillArrowDownCircleFill } from 'react-icons/bs';

// ARCHIVES FROM PROJECT
import './Profile.css';
import avatarDefault from '../../assets/img-avatar.png';
import { UserAuth } from '../../services/UserContext'

/*PAGES AND COMPONENTS */
import LikeButton from '../../components/likebutton/LikeButton';
import { Post } from '../../components/post/Post';
import Navbar from '../../components/navbar/Navbar';
import CreateButton from '../../components/createbutton/CreateButton';

const UserDetail = () => {

    //parametro da url
    const { id } = useParams();

    // imports
    const { users, posts } = UserAuth();

    return (
        <div className='Profile'>
            <Navbar />
            <CreateButton />

            <div className="aaa">
                <h1>
                    google ads
                </h1>
            </div>

            {users.filter(user => user.euid === id).map(user => {

                return (
                    <>
                        <header className='section-profile'>
                            <div className="profile-container">
                                <div className="img-background">
                                    <img src={user.eavatar ? user.eavatar : avatarDefault} alt="" />
                                </div>
                            </div>

                            <div className="bio">
                                <h2>{user.ename ? user.ename : 'Sem Nome'}</h2>
                                {user.ebios ? user.ebios : 'Nada por aqui'}
                            </div>
                        </header>


                        <main className="section-posts">
                            <h1>Postagens Realizadas <BsFillArrowDownCircleFill className='footer-icon' /> </h1>

                            <div className="posts-container">
                                {posts.filter(post => post.user_id === id).map((post, index) => {
                                    return (
                                        <>
                                            <Post
                                                key={index}
                                                postId={post.id}
                                                user_id={post.user_id}
                                                user_name={user.ename ? user.ename : 'Sem Nome'}
                                                avatar={user.eavatar ? user.eavatar : null}
                                                title={post.title}
                                                category={post.category}
                                                content={post.content}
                                                img_content={post.img_content}
                                                likes={post.likes}
                                                click_type_like={
                                                    <LikeButton
                                                        postId={post.id}
                                                        uid={post.user_id}
                                                        user_name={user.ename ? user.ename : 'Sem Nome'}
                                                        userPhoto={user.eavatar ? user.eavatar : null}
                                                        title={post.title}
                                                        category={post.category}
                                                        content={post.content}
                                                        imgContent={post.img_content}
                                                    />
                                                }
                                                internalUser={false}
                                            />
                                        </>
                                    )
                                })}
                            </div>

                        </main>
                    </>
                )
            })}


        </div>
    )
}

export default UserDetail;

