// HOOKS AND LIBS 
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

// ARCHIVES FROM PROJECT
import { auth } from "../../services/Banco";
import { post } from '../../utils/ArraysAndFunctions';
import './Explore.css';

/*PAGES AND COMPONENTS */
import LikeButton from '../../components/likebutton/LikeButton';
import { Post } from '../../components/post/Post';
import Navbar from '../../components/navbar/Navbar';
import Categorys from '../../components/categorys/Categorys';
import CreateButton from "../../components/createbutton/CreateButton";
import { UserAuth } from "../../services/UserContext";

const Explore = () => {

    // imports 
    const { getPosts, posts } = UserAuth();
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    // useeffect 
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        getPosts();
    }, [user, loading]);

    return (
        <>
            <header className="header-content-explore">
                <Navbar />
                <Categorys />
                <CreateButton />
            </header>

            <main className="posts-container">
                <h1>Bem Vindo! Usuário Logado: </h1>
                <p>{user?.displayName}</p>

                {posts.map(doc => {
                    return (
                        <Post
                            key={doc.id}
                            user_id={doc.user_id}
                            user_name={doc.user_name}
                            avatar={doc.avatar}
                            title={doc.title}
                            category={doc.category}
                            content={doc.content}
                            img_content={doc.img_content}
                            click_type_like={< LikeButton postId={doc.id} />}
                        />
                    )
                })}

                {/* {post.map((item, index) => {
                    return (
                        <Post
                            key={index}
                            content={item.description}
                            user_name={item.user_name}
                            user_id={item.user_id}
                            avatar={item.user_vatar}
                            img_content={item.post_archive}
                            category={item.category}
                            title={item.title}
                            click_type_like={< LikeButton postId={item.id} />}
                        />
                    )
                })} */}
            </main>

        </>
    )
}

export default Explore