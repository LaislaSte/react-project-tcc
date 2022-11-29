// HOOKS AND LIBS 
import React, { useState, useEffect } from 'react';

// ARCHIVES FROM PROJECT
import './Review.css';
import { post, findPostsOfUser, fakeUser, onChangeHeart } from '../../utils/ArraysAndFunctions';
import { testMoment } from '../../utils/fakeFata';
import { UserAuth } from '../../services/UserContext';

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
    const [isReviwed, setIsReviwed] = useState(false);

    const { reviews, getReviews } = UserAuth();

    //useEffect para pegar as revisões
    useEffect(() => {
        const callReviews = () => {
            getReviews();
            // setUserPosts(uposts);
        }
        // return () => {
        //     //useEffect antes de renderizar novamente, execute a função
        callReviews()
        // }

    }, [])

    // functions 
    //ao clicar em já revisei

    const alreadyReviewed = () => {
        // const isReviwed = true;
        setIsReviwed(true);

        // pegar a data atual no banco e colocar em current date
        const currentDate = moment();
        const counter = 0
        const result = dateChangeReview(currentDate, isReviwed, counter);
        const newDate = result.date;
        const newCounter = result.count;

        //atualiza o documento com os novos valores dos parametros data de review e contador
        // updateReview(newDate, newCounter);

        setIsReviwed(false);
        // isReviwed = false;
        alert('revisão atualizada');
        // Navigate('/review');
    }

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
                {/* teste para mapear as reviews */}
                {reviews.map(doc => {
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