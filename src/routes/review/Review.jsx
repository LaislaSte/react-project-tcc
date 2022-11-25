// HOOKS AND LIBS 
import React, { useState } from 'react';

// ARCHIVES FROM PROJECT
import './Review.css';
import { post, findPostsOfUser, fakeUser, onChangeHeart } from '../../utils/ArraysAndFunctions';

/*PAGES AND COMPONENTS */
import Navbar from '../../components/navbar/Navbar';
import ReviewButton from '../../components/reviewbutton/ReviewButton';
import { Post } from '../../components/post/Post';
import Categorys from '../../components/categorys/Categorys';
import CreateButton from '../../components/createbutton/CreateButton';
import LikeButton from '../../components/likebutton/LikeButton';

const Review = () => {
    //states
    const [query, setQuery] = useState('');

    // functions 
    function verifiedLoginAndReview(id_post, arrPost) {
        //há um post atribuido a revisao? se sim return true 
        const a = onChangeHeart(id_post);

        //o post é do user logado? se sim return true 
        const b = findPostsOfUser(arrPost);
    }

    return (
        <>
            <header className="header-main-filter">
                <Navbar />
                {/* <Categorys /> */}
                <div className="search-filter">

                    <select onChange={(e) => { setQuery(e.target.value); }} className="custom-select input-outline-primary" aria-label="Filter Countries By Region">
                        <option value="All">Tudo</option>
                        <option value="Matemática">Matemática</option>
                        <option value="Sociologia">Sociologia</option>
                        <option value="História">História</option>
                        <option value="Biologia">Biologia</option>
                    </select>
                    <span className="focus"></span>
                </div>
                <CreateButton />
            </header>

            <div className="aa">
                <h1>
                    google ads
                </h1>
            </div>

            <main className="posts-container">
                {query.length > 2 && (
                    <div className="result-search-container-posts">

                        {post.filter(item => item.category.includes(query)).map(doc => {
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
                                    click_type_review={< ReviewButton postId={doc.id} />}
                                />
                            )
                        })}

                    </div>
                )}

                {post.map(doc => {
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
            </main>

        </>
    )
}

export default Review