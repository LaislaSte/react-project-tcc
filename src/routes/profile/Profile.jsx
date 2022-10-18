import React, {useState } from 'react';
import './Profile.css';
import { Post } from '../../components/post/Post';
import  Button  from '../../components/button/Button';

const Profile = () => {
    //pegar o id do usuario logado
    //pegar foto de perfil deste usuario e colocar como foto de perfil
    //pegar nome do usuario e colocar no nome de usuario
    //pegar biografia do usuario e colocar em bios (biografia)
    //puxar postagens realizadas pelo usuario
    //mapear id e conteudo das postagens atreladas ao usuario logado na lista não ordenada retornando uma li com o componente post e suas props conteudo referente ao post, foto de perfil e nome do usuario logado

    // const imgProfile = <img src={Explore} alt="foto de perfil do usuario" className='avatar'/>
    const [image, setImage] = useState(null);
    console.log(image);

    const fakeUser = {
        id: 1,
        name: 'laisla',
        avatar: 'IP',
        posts: [
            {
                idPost: '1',
                userPostContent: 'blabablabalbalbalbalalskkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkblabablabalbalbalbalalskkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkblabablabalbalbalbalalskkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk',
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
                </div>

                <div className="bios">
                    <h2>Salve Jorge</h2>
                    Tenho 24 anos, sou formado na Unicid em pedagogia e na USP em ciencias humanas, sou um homem gay, casado e com 5 filhos
                </div>

                <div className="header-button-profile">
                    <Button
                        text='Configurações'
                    />
                </div>
            </header>

            <main className="section-posts">
                <ul>
                    <li> <h1>Postagens Realizadas</h1> </li>
                    <li>
                        <Post />
                    </li>

                </ul>
            </main>

        </div>
    )
}

export default Profile;

