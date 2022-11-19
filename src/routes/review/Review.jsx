// HOOKS AND LIBS 
import React from 'react';

// ARCHIVES FROM PROJECT
import './Review.css';
import { post, findPostsOfUser, fakeUser, onChangeHeart } from '../../utils/ArraysAndFunctions';

/*PAGES AND COMPONENTS */
import Navbar from '../../components/navbar/Navbar';
import ReviewButton from '../../components/reviewbutton/ReviewButton';
import { Post } from '../../components/post/Post';
import Categorys from '../../components/categorys/Categorys';
import CreateButton from '../../components/createbutton/CreateButton';

const Review = () => {

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
                            click_type={< ReviewButton />}
                            userLoged={verifiedLoginAndReview(item.id, fakeUser.arrIdsPost)}
                        />
                    )
                })}
            </main>

        </>
    )
}

export default Review