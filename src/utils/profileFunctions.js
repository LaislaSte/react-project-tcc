import imageContent from '../assets/Explore.jpg';
import fakeAvatar from '../assets/white-guy-studing.jpg';

export const fakeUser = {
    id: 1,
    name: 'laisla',
    avatar: fakeAvatar,
    arrIdsPost: [
        '01'
    ]
}

export const post = [
    {
        id: '01',
        user_id: '05',
        user_name: 'Laisla',
        user_vatar: imageContent,
        category: 'matematica',
        post_archive: imageContent,
        description: 'A Microsoft e nossos fornecedores terceirizados usam cookies para armazenar e acessar informações tais como IDs exclusivas para fornecer, manter e melhorar nossos serviços e anúncios. Se você'
    },
    {
        id: '02',
        user_id: '06',
        user_name: 'Giovanna',
        user_vatar: imageContent,
        category: 'historia',
        post_archive: '',
        description: 'A Microsoft e nossos fornecedores terceirizados usam cookies para armazenar e acessar informações tais como IDs exclusivas para fornecer, manter e melhorar nossos serviços e anúncios. Se você concordar, o MSN e o Microsoft Bing personalizarão o conteúdo e os anúncios que você vê. Você pode selecionar Aceito para consentir com esses usos ou clicar em Gerenciar preferências para revisar suas opções e exercer seu direito de se opor ao Interesse Legítimo quando usado. Você pode alterar sua seleção em Gerenciar Preferências na parte inferior desta página.Declaração de Privacidade'
    },
    {
        id: '03',
        user_id: '08',
        user_name: 'Fernanda',
        user_vatar: imageContent,
        category: 'portugues',
        post_archive: imageContent,
        description: 'A Microsoft e nossos fornecedores terceirizados usam cookies para armazenar e acessar informações tais como IDs exclusivas para fornecer, manter e melhorar nossos serviços e anúncios. Se você concordar, o MSN e o Microsoft Bing personalizarão o conteúdo e os anúncios que você vê. Você pode selecionar Aceito para consentir com esses usos ou clicar em Gerenciar preferências para revisar suas opções e exercer seu direito de se opor ao Interesse Legítimo quando usado. Você pode alterar sua seleção em Gerenciar Preferências na parte inferior desta página.Declaração de Privacidade'
    }
]

export const fakeReviews = [
    {
        id: '10',
        post_id: '02',
        user_id: '05',
        actual_date: '01/11/2022',
        final_date: '09/02/2023',
        verified: false
    },
    {
        id: '11',
        post_id: '06',
        user_id: 'post',
        actual_date: '01/11/2022',
        final_date: '09/02/2023',
        verified: false
    },
    {
        id: '12',
        post_id: '01',
        user_id: '08',
        actual_date: '01/11/2022',
        final_date: '09/02/2023',
        verified: false
    }
]

//função que verifica nas revisões se há um post atribuido à ela
export const onChangeHeart = (id) => {
    let index = fakeReviews.findIndex(i => i.post_id === id);

    if (index !== -1) {
        return true
    }
    return false
}

//Função que verifique se o post é do user ou não
//Função que busque no banco os post cadastrados atraves dos ids passados pelos dados do user
export const findPostsOfUser = (arrIds) => {
    arrIds.forEach(element => {
        //o array post será o que vem do banco, ou seja, todos os posts
        let index = post.findIndex(obj => obj.id === element);
        if (index !== -1) {
            return true;
        } else {
            return false
        }
    });
}
// findPostsOfUser(fakeUser.arrIdsPost);