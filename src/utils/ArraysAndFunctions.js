import imageContent from '../assets/Explore.jpg';
import fakeAvatar from '../assets/white-guy-studing.jpg';

export const fakeUser = {
    id: 1,
    name: 'João Victor',
    avatar: fakeAvatar,
    bios: 'Tenho 24 anos, sou formado na Unicid em engenharia e na USP em ciência da computação.',
    arrIdsPost: [
        '01'
    ],
    arrIdsCategorys: [
        'História',
        'Matemática',
        'Biologia'
    ]
}

// criando posts falsos do usuário logado para ser renderizados no profile:
export const userPosts = [
    {
        id: '01',
        category: 'Química',
        title: 'Ligações Covalentes',
        post_archive: imageContent,
        description: 'A Ligação Covalente ou Ligação Molecular, são ligações químicas em que há o compartilhamento de um ou mais pares de elétrons entre os átomos, com a finalidade de formar moléculas estáveis, que segundo a Teoria do Octeto: "um átomo adquire estabilidade quando possui 8 elétrons na camada de valência (camada eletrônica mais externa), ou 2 elétrons quando possui apenas uma camada" '
    },
    {
        id: '02',
        category: 'História',
        title: 'Golpe de 64',
        post_archive: '',
        description: 'A Ditadura é o período em que o país foi governado pelos militares e que teve início a partir do famoso “Golpe de 64”, ou seja, um golpe de estado que tirou o então presidente João Goulart (mais conhecido como Jango) do poder e colocou em seu lugar o General Castello Branco. É comum ouvirmos falar em “Revolução de 64”, mas o nome mais correto para o que aconteceu é “golpe”, porque normalmente a revolução parte da população, o que não foi o caso.'
    },
    {
        id: '03',
        category: 'Sociologia',
        title: 'Fatos Sociais de Émile Durkheim',
        post_archive: '',
        description: 'Os fatos sociais são conjuntos de hábitos praticados pelas pessoas, por meio de suas ações, que permitem a identificação de uma consciência coletiva, a qual age por trás dos indivíduos, influenciando as suas ações de alguma maneira.'
    },
    {
        id: '04',
        category: 'Português',
        post_archive: imageContent,
        description: 'A Microsoft e nossos fornecedores terceirizados usam cookies para armazenar e acessar informações tais como IDs exclusivas para fornecer, manter e melhorar nossos serviços e anúncios. Se você concordar, o MSN e o Microsoft Bing personalizarão o conteúdo e os anúncios que você vê. Você pode selecionar Aceito para consentir com esses usos ou clicar em Gerenciar preferências para revisar suas opções e exercer seu direito de se opor ao Interesse Legítimo quando usado. Você pode alterar sua seleção em Gerenciar Preferências na parte inferior desta página.Declaração de Privacidade'
    }

]

export const post = [
    {
        id: '01',
        user_id: '05',
        user_name: 'João Victor',
        user_vatar: imageContent,
        category: 'Química',
        title: 'Ligações Covalentes',
        post_archive: imageContent,
        description: 'A Ligação Covalente ou Ligação Molecular, são ligações químicas em que há o compartilhamento de um ou mais pares de elétrons entre os átomos, com a finalidade de formar moléculas estáveis, que segundo a Teoria do Octeto: "um átomo adquire estabilidade quando possui 8 elétrons na camada de valência (camada eletrônica mais externa), ou 2 elétrons quando possui apenas uma camada" '
    },
    {
        id: '02',
        user_id: '06',
        user_name: 'Giovanna',
        user_vatar: imageContent,
        category: 'História',
        title: 'Golpe de 64',
        post_archive: '',
        description: 'A Ditadura é o período em que o país foi governado pelos militares e que teve início a partir do famoso “Golpe de 64”, ou seja, um golpe de estado que tirou o então presidente João Goulart (mais conhecido como Jango) do poder e colocou em seu lugar o General Castello Branco. É comum ouvirmos falar em “Revolução de 64”, mas o nome mais correto para o que aconteceu é “golpe”, porque normalmente a revolução parte da população, o que não foi o caso.'
    },
    {
        id: '03',
        user_id: '07',
        user_name: 'Márcia',
        user_vatar: imageContent,
        category: 'Sociologia',
        title: 'Fatos Sociais de Émile Durkheim',
        post_archive: '',
        description: 'Os fatos sociais são conjuntos de hábitos praticados pelas pessoas, por meio de suas ações, que permitem a identificação de uma consciência coletiva, a qual age por trás dos indivíduos, influenciando as suas ações de alguma maneira.'
    },
    {
        id: '04',
        user_id: '08',
        user_name: 'Fernanda',
        user_vatar: imageContent,
        category: 'Português',
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
export const onChangeHeart = (reviews, id) => {
    let index = reviews.findIndex(i => i.postId === id);

    if (index !== -1) {
        return true
    }
    return false
}
//função que verifica nos followings do user se há um id passado 
export const onChangeFollow = (followings, id) => {
    let index = followings.findIndex(i => i.uid === id);

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