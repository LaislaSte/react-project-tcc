import React, { useState } from 'react';
import './Profile.css';
import imageContent from '../../assets/Explore.jpg';
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

    const user = [
        {
            name: 'laisla',
            icon: imageContent,
            texto: 'A Microsoft e nossos fornecedores terceirizados usam cookies para armazenar e acessar informações tais como IDs exclusivas para fornecer, manter e melhorar nossos serviços e anúncios. Se você'
        },
        {
            name: 'laisla',
            icon: imageContent,
            imageContent,
            texto: 'A Microsoft e nossos fornecedores terceirizados usam cookies para armazenar e acessar informações tais como IDs exclusivas para fornecer, manter e melhorar nossos serviços e anúncios. Se você concordar, o MSN e o Microsoft Bing personalizarão o conteúdo e os anúncios que você vê. Você pode selecionar Aceito para consentir com esses usos ou clicar em Gerenciar preferências para revisar suas opções e exercer seu direito de se opor ao Interesse Legítimo quando usado. Você pode alterar sua seleção em Gerenciar Preferências na parte inferior desta página.Declaração de Privacidade'
        },
        {
            name: 'laisla',
            icon: imageContent,
            imageContent,
            texto: 'A Microsoft e nossos fornecedores terceirizados usam cookies para armazenar e acessar informações tais como IDs exclusivas para fornecer, manter e melhorar nossos serviços e anúncios. Se você concordar, o MSN e o Microsoft Bing personalizarão o conteúdo e os anúncios que você vê. Você pode selecionar Aceito para consentir com esses usos ou clicar em Gerenciar preferências para revisar suas opções e exercer seu direito de se opor ao Interesse Legítimo quando usado. Você pode alterar sua seleção em Gerenciar Preferências na parte inferior desta página.Declaração de Privacidade'
        }
    ]



    return (
        <div className='Profile'>
            <Navbar />
            <CreateButton />
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
                    <BsGearFill className='header-profile-icon' />
                </div>
            </header>

            <main className="section-posts">
                <h1>Postagens Realizadas <BsFillArrowDownCircleFill className='footer-icon' /> </h1>
                <div className="posts-container">
                    {user.map((item, index) => {
                        return (
                            <Post
                                key={index}
                                content={item.texto}
                                user_name={item.name}
                                img_content={item.imageContent}
                                avatar={item.icon}
                                click_type={<LikeButton />}
                            />
                        )
                    })}
                </div>
            </main>

        </div>
    )
}

export default Profile;

