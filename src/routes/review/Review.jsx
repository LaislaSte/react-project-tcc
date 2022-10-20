import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import ReviewButton from '../../components/reviewbutton/ReviewButton';
import { Post } from '../../components/post/Post';
import CreateButton from '../../components/createbutton/CreateButton';
import imageContent from '../../assets/Explore.jpg';
import './Review.css'

const Review = () => {
    // const texto = 

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
            <Navbar />
            <header className="header-main-filter">
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
                            click_type={<ReviewButton />}
                        />
                    )
                })}
            </main>

            <footer>

            </footer>

        </>
    )
}

export default Review