// HOOKS AND LIBS 
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

// ARCHIVES FROM PROJECT
import { auth, db } from "../../services/Banco";
import { post } from '../../utils/ArraysAndFunctions';
import './Explore.css';

/*PAGES AND COMPONENTS */
import LikeButton from '../../components/likebutton/LikeButton';
import { Post } from '../../components/post/Post';
import Navbar from '../../components/navbar/Navbar';
import Categorys from '../../components/categorys/Categorys';
import CreateButton from "../../components/createbutton/CreateButton";

const Explore = () => {
    // states 
    const [name, setName] = useState("");
    const [bios, setBios] = useState("");
    const [imgURL, setImgURL] = useState("");

    // imports 
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    // useeffect 
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
    }, [user, loading]);

    return (
        <>
            <header className="header-content-explore">
                <Navbar />
                <Categorys />
                <CreateButton />
            </header>

            <main className="posts-container">

                {post.map((item, index) => {
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
                            click_type={< LikeButton postId={item.id} />}
                        />
                    )
                })}
            </main>

        </>
    )
}

export default Explore