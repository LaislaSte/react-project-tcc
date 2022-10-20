import React from 'react';

import './Explore.css';
import imageContent from '../../assets/Explore.jpg';

import LikeButton from '../../components/likebutton/LikeButton';
import { Post } from '../../components/post/Post';
import Navbar from '../../components/navbar/Navbar';
import Categorys from '../../components/categorys/Categorys';
import CreateButton from '../../components/createbutton/CreateButton';

const Explore = () => {

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
        <>
            <header className="header-content-explore">
                <Navbar
                />

                <Categorys />
                <CreateButton />

            </header>

            <main className="posts-container">
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
            </main>

        </>
    )
}

export default Explore