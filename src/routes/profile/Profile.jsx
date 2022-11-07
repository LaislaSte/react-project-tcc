import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import { morePostI } from '../../utils/arraysHeader';
import { fakeReviews } from '../../utils/ArraysAndFunctions';
import { post, fakeUser } from '../../utils/ArraysAndFunctions';

import LikeButton from '../../components/likebutton/LikeButton';
import { Post } from '../../components/post/Post';
import Navbar from '../../components/navbar/Navbar';
import CreateButton from '../../components/createbutton/CreateButton';

import { BsGearFill, BsFillArrowDownCircleFill } from 'react-icons/bs';

const Profile = () => {
    //pegar o id do usuario logado
    //pegar foto de perfil deste usuario e colocar como foto de perfil
    //pegar nome do usuario e colocar no nome de usuario
    //pegar biografia do usuario e colocar em bios (biografia)
    //puxar postagens realizadas pelo usuario
    //mapear id e conteudo das postagens atreladas ao usuario logado na lista não ordenada retornando uma li com o componente post e suas props conteudo referente ao post, foto de perfil e nome do usuario logado

    // const imgProfile = <img src={Explore} alt="foto de perfil do usuario" className='avatar'/>
    // console.log(image);

    return (
        <div className='Profile'>
            <Navbar />

            <header className='section-profile'>

                <div className="profile-container">
                    <div className="img-background">
                        <img src={fakeUser.avatar} alt="" />
                    </div>
                </div>

                <div className="bios">
                    <h2>{fakeUser.name}</h2>
                    {fakeUser.bios}
                </div>

                <div className="header-button-profile">
                    <Link to='/config'>
                        <BsGearFill className='header-profile-icon' />
                    </Link>
                </div>
            </header>

            <main className="section-posts">
                <h1>Postagens Realizadas <BsFillArrowDownCircleFill className='footer-icon' /> </h1>
                <div className="posts-container">
                    {post.map((item, index) => {
                        return (
                            <Post
                                key={index}
                                content={item.description}
                                user_name={item.user_name}
                                img_content={item.post_archive}
                                user_id={item.user_id}
                                avatar={item.user_vatar}
                                category={item.category}
                                title={item.title}
                                click_type={<LikeButton postId={item.id} />}
                                moreContent={morePostI}
                            />
                        )
                    })}
                </div>
            </main>

        </div>
    )
}

export default Profile;

