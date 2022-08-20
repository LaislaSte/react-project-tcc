import React from 'react';
import { NavLink } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import { ReviewData } from './ReviewData';

const Review = () => {
    return (
        <div>
            <div className="col">
                <div className="post-container">
                    <div className="cat">
                        <p>{ }</p>
                    </div>
                    <div className="post">
                        <p>{ }</p>
                        <img src="" alt="" />
                    </div>
                    <div className="memorize-container">
                        <div className="icon">
                            <FaHeart />
                        </div>
                    </div>
                </div>
                {ReviewData.map((item, index) => {
                    return (
                        <div className="post-container" key={index}>
                            <div className="cat">
                                <p>{ item.category }</p>
                            </div>
                            <div className="name-container">
                                <h3>{item.user}</h3>
                            </div>
                            <div className="post">
                                <p>{ item.content }</p>
                                <img src={item.image} alt="" />
                            </div>
                            <div className="memorize-container">
                                <div className="icon">
                                    <FaHeart />
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default Review