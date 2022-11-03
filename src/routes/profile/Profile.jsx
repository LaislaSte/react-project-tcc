import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import { morePostI } from '../../utils/arraysHeader';
import { fakeReviews } from '../../utils/profileFunctions';
import { post, fakeUser } from '../../utils/profileFunctions';

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
            <CreateButton />
            <header className='section-profile'>

                <div className="profile-container">
                    <div className="img-background">
                        <img src={fakeUser.avatar} alt="" />
                    </div>
                </div>

                <div className="bios">
                    <h2>Salve Jorge</h2>
                    Tenho 24 anos, sou formado na Unicid em pedagogia e na USP em ciencias humanas, sou um homem gay, casado e com 5 filhos
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

