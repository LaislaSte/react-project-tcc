// HOOKS AND LIBS 
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

// ARCHIVES FROM PROJECT
import { auth } from "../../services/Banco";
import './Explore.css';
import { UserAuth } from "../../services/UserContext";
import { arrCategorys } from "../../utils/arraysHeader";

/*PAGES AND COMPONENTS */
import LikeButton from '../../components/likebutton/LikeButton';
import { Post } from '../../components/post/Post';
import Navbar from '../../components/navbar/Navbar';
import CreateButton from "../../components/createbutton/CreateButton";
import Input from "../../components/input/Input";

const Modal = ({
    message,
    type,
    options
}) => {
    return(
        <>
        
        </>
    )
}

const Folloging = () => {
    //states for search
    const [query, setQuery] = useState("");

    // imports 
    const { getPosts, getReviews, posts, reviews, categorys } = UserAuth();
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    // useeffect 
    useEffect(() => {
        console.log('effect runded/ Folloging');
        if (loading) return;
        if (!user) return navigate("/login");
        const getAllPosts = () => {
            getPosts();
            getReviews();
        }
        getAllPosts();
    }, [user, loading]);

    return (
        <>
            <header className="header-content-Folloging">
                <Navbar />

                <div className="aa">
                    <h1>
                        google ads
                    </h1>
                </div>

                <div className="search-filter">
                    <Input
                        type="search"
                        className="input-outline-primary"
                        text="O que procura?"
                        icon={<BsSearch />}
                        value={query}
                        onchange={(e) => setQuery(e.target.value)}
                    />

                    <select onChange={(e) => { setQuery(e.target.value); }} className="custom-select input-outline-primary" aria-label="Filter Countries By Region">
                        {categorys
                            ? (
                                <>
                                    <option value="All"> Tudo </option>
                                    {categorys.map((item, index) => {
                                        return (

                                            <option key={index} value={item}> {item} </option>
                                        )
                                    })}
                                </>
                            )
                            : (
                                <>
                                    <option value="All"> Tudo </option>
                                    {arrCategorys.map((i, index) => {
                                        return (
                                            <option key={index} value={i}>{i}</option>
                                        )
                                    })}
                                </>
                            )
                        }
                    </select>

                </div>

                <CreateButton />
            </header>

            <main className="posts-container">

                {query.length > 2 && (
                    <div className="result-search-container-posts">

                        {posts.filter(item => item.content.includes(query) || item.category.includes(query) || item.title.includes(query) || item.user_name.includes(query)).map(doc => {
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

                    </div>
                )}

                {posts.map(doc => {
                    return (
                        <Post
                            key={doc.id}
                            user_id={doc.user_id}
                            user_name={doc.user_name}
                            avatar={doc.avatar ? doc.avatar : null}
                            title={doc.title}
                            category={doc.category}
                            content={doc.content}
                            img_content={doc.img_content}
                            likes={doc.likes}
                            click_type_like={
                                <LikeButton
                                    postId={doc.id}
                                    uid={doc.user_id}
                                    userPhoto={doc.avatar ? doc.avatar : null}
                                    imgContent={doc.img_content}
                                    user_name={doc.user_name}
                                    title={doc.title}
                                    content={doc.content}
                                    category={doc.category}
                                />
                            }
                        />
                    )
                })}

            </main>

        </>
    )
}

export default Folloging