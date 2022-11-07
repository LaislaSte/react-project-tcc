import React from 'react';

import './Explore.css';

import LikeButton from '../../components/likebutton/LikeButton';
import { Post } from '../../components/post/Post';
import Navbar from '../../components/navbar/Navbar';
import Categorys from '../../components/categorys/Categorys';
import { post } from '../../utils/ArraysAndFunctions';

const Explore = () => {

    return (
        <>
            <header className="header-content-explore">
                <Navbar />
                <Categorys />
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