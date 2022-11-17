import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../services/Banco";
import { logout } from "../../services/googleAuthenticatios";
import { query, collection, getDocs, where } from "firebase/firestore";

import './Explore.css';

import LikeButton from '../../components/likebutton/LikeButton';
import { Post } from '../../components/post/Post';
import Navbar from '../../components/navbar/Navbar';
import Categorys from '../../components/categorys/Categorys';
import { post } from '../../utils/ArraysAndFunctions';
import CreateButton from "../../components/createbutton/CreateButton";

const Explore = () => {

    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [bios, setBios] = useState("");
    const [imgURL, setImgURL] = useState("");
    const navigate = useNavigate();

    const fetchUserInfo = async () => {
        try {
            // const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            // const doc = await getDocs(q);
            // const data = doc.docs[0].data();
            const userBios = user?.bios;
            const uid = user?.uid;
            const token = user?.getIdToken();
            const userName = user?.name;
            const userAvatar = user?.photoURL;
            setName(userName);
            setImgURL(userAvatar);
            setBios(userBios);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        fetchUserInfo();
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
                <p>{name}</p>
                <p>{user?.email}</p>

                <button onClick={logout}
                >Logout Button</button>

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