import React from 'react';
import { Posts } from './ExploreData';
import { Post } from '../../components/post/Post';

const Explore = () => {

    return (
        <>
            <h1>Explore Page</h1>
            <ul>

                {Posts.map((item, index) => {
                    return (
                        <li key={index}>
                            <p>{item.name}</p>
                            <p>{item.content}</p>
                            <p>{item.category}</p>
                            <Post />
                        </li>
                    )
                })}

            </ul>
        </>
    )
}

export default Explore