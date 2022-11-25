// HOOKS AND LIBS 
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

// ARCHIVES FROM PROJECT
import { auth } from "../../services/Banco";
import { post } from '../../utils/ArraysAndFunctions';
import './Explore.css';

/*PAGES AND COMPONENTS */
import LikeButton from '../../components/likebutton/LikeButton';
import { Post } from '../../components/post/Post';
import Navbar from '../../components/navbar/Navbar';
// import Categorys from '../../components/categorys/Categorys';
import CreateButton from "../../components/createbutton/CreateButton";
import { UserAuth } from "../../services/UserContext";
import Input from "../../components/input/Input";

const Explore = () => {
    //states for search
    const [query, setQuery] = useState("");
    //     define os parâmetros de pesquisa
    //     queremos apenas buscar os países por capital e name
    //     essa lista pode ser mais longa, se você quiser
    //     você pode buscar os países até por sua população
    //     basta adicionar isso ao array
    const [searchParam] = useState(["category"]);
    const [filterParam, setFilterParam] = useState(["All"]);

    // imports 
    const { getPosts, posts, categorys } = UserAuth();
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    // useeffect 
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        getPosts();
    }, [user, loading]);

    // functions for search
    // const search = (items) => {
    //     // console.log(items);
    //     return items.filter((item) => {
    //         if (item.category == filterParam) {
    //             return searchParam.some((newItem) => {
    //                 // console.log(newItem);
    //                 return (
    //                     item[newItem]
    //                         .indexOf(q.toLowerCase()) > -1
    //                 );
    //             });
    //         } else if (filterParam == "All") {
    //             return searchParam.some((newItem) => {
    //                 return (
    //                     item[newItem]
    //                         .indexOf(q.toLowerCase()) > -1
    //                 );
    //             });
    //         }
    //     });

    // }


    return (
        <>
            <header className="header-content-explore">
                <Navbar />
                {/* <Categorys /> */}

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
                        {categorys.map(i => {
                            return (
                                <>
                                    <option value="All">Tudo</option>
                                    <option value={i}>{i}</option>
                                </>
                            )
                        })}
                        {/* <option value="Sociologia">Sociologia</option>
                        <option value="História">História</option>
                        <option value="Biologia">Biologia</option> */}
                    </select>

                </div>

                <CreateButton />
            </header>

            <div className="aa">
                <h1>
                    google ads
                </h1>
            </div>

            <main className="posts-container">
                <h1>Bem Vindo! Usuário Logado: </h1>
                <p>{user?.displayName}</p>

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
                            avatar={doc.avatar}
                            title={doc.title}
                            category={doc.category}
                            content={doc.content}
                            img_content={doc.img_content}
                            click_type_like={< LikeButton postId={doc.id} />}
                        />
                    )
                })}

                {/* {search(posts).map(doc => {
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
                })} */}

            </main>

        </>
    )
}

export default Explore