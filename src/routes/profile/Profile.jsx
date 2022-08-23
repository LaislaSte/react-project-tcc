import React from 'react';
import './Profile.css';
import { Post } from '../../components/post/Post';
import Explore from '../../assets/Explore.jpg';

const Profile = () => {
    //pegar o id do usuario logado
    //pegar foto de perfil deste usuario e colocar como foto de perfil
    //pegar nome do usuario e colocar no nome de usuario
    //pegar biografia do usuario e colocar em bios (biografia)
    //puxar postagens realizadas pelo usuario
    //mapear id e conteudo das postagens atreladas ao usuario logado na lista não ordenada retornando uma li com o componente post e suas props conteudo referente ao post, foto de perfil e nome do usuario logado

    const imgProfile = <img src={Explore} alt="foto de perfil do usuario" className='avatar'/>

    const fakeUser = {
        id: 1,
        name: 'laisla',
        avatar: 'IP',
        posts: [
            {
                idPost: '1',
                userPostContent: 'blabablabalbalbalbalalskkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk',
                userPostImg: 'imagem da postagem do usuario'
            },
            {
                idPost: '2',
                userPostContent: 'blabablabalbalbalbal',
                userPostImg: 'imagem da postagem do usuario'
            },
            {
                idPost: '3',
                userPostContent: 'blabablabalbalbalbal',
                userPostImg: 'imagem da postagem do usuario'
            }
        ]
    }

    return (
        <div className='Profile'>
            <header className='section-profile'>
                <div className="profile-container">
                    <div className="img-background">
                        {fakeUser.avatar}
                    </div>
                    <p>Professor</p>
                    <h2>Salve Jorge</h2>
                </div>
                <div className="bios">
                    Tenho 24 anos, sou formado na Unicid em pedagogia e na USP em ciencias humanas, sou um homem gay, casado e com 5 filhos
                </div>
            </header>

            <div className="section-profile profile-posts">
                <Post/>
                {fakeUser.posts.map(item => {
                    return (
                        <Post img_profile={fakeUser.avatar} user_name={fakeUser.name} content={item.userPostContent} />

                    )
                })}
                <ul>
                    <li> <h1>Postagens Realizadas</h1> </li>
                    {fakeUser.posts.map(item => {
                        return (
                            <li key={item.idPost}>
                                <Post img_profile={fakeUser.avatar} user_name={fakeUser.name} content={item.userPostContent.toString} />
                            </li>

                        )
                    })}

                </ul>
            </div>
        </div>
    )
}

export default Profile;

