// HOOKS AND LIBS
import React from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { BiLogIn, BiInfoCircle } from 'react-icons/bi';
import { FaGraduationCap } from 'react-icons/fa';

// ARCHIVES FROM PROJECT
import avatarDefault from '../assets/icons/avatarDefault.svg';
import sashaAvatar from '../assets/woman-with-yellow-shirt.jpg';
import cosimaAvatar from '../assets/woman-with-yellow-shirt.jpg';
import lumityAvatar from '../assets/woman-with-yellow-shirt.jpg';
import sofiaAvatar from '../assets/woman-with-curly-hair-and-yellow-shirt.jpg';
import evelynAvatar from '../assets/woman-with-yellow-shirt.jpg';


export const SidebarDataPublic = [
    {
        title: 'Login',
        path: '/login',
        icon: <BiLogIn />,
        cName: 'nav-text'
    },
    {
        title: 'Cadastrar',
        path: '/register',
        icon: <BsPersonCircle />,
        cName: 'nav-text'
    },
    {
        title: 'Sobre',
        path: '/about-us',
        icon: <BiInfoCircle />,
        cName: 'nav-text'
    },
]

const sashaPosts = [
    {
        postId: '01',
        uid: '01',
        name: 'sasha',
        userPhoto: sashaAvatar,
        imgContent: 'https://gastronomixsprod.blob.core.windows.net/production/Blog%20omslagen/22.%20Schol.jpg',
        title: 'post da sasha 01',
        content: 'Free stock photos & videos you can use everywhere. Browse millions of high-quality royalty free stock images & copyright free pictures. No attribution required.',
        category: 'Matemática',
        likes: 10
    },
    {
        uid: '01',
        postId: '02',
        userPhoto: sashaAvatar,
        imgContent: 'https://gastronomixsprod.blob.core.windows.net/production/Blog%20omslagen/22.%20Schol.jpg',
        name: 'sasha',
        title: 'post da sasha 02',
        content: 'Free stock photos & videos you can use everywhere. Browse millions of high-quality royalty free stock images & copyright free pictures. No attribution required.',
        category: 'História',
        likes: 5
    },
    {
        uid: '01',
        postId: '03',
        userPhoto: sashaAvatar,
        imgContent: 'https://gastronomixsprod.blob.core.windows.net/production/Blog%20omslagen/22.%20Schol.jpg',
        name: 'sasha',
        title: 'post da sasha 03',
        content: 'Free stock photos & videos you can use everywhere. Browse millions of high-quality royalty free stock images & copyright free pictures. No attribution required.',
        category: 'Sociologia',
        likes: 15
    },
]

const lumityPosts = [

];
const cosimaPosts = [

];
const sofiaPosts = [

];
const evelynPosts = [

];

export const resultSearch = [
    {
        'id': '01',
        'name': 'sasha bazanea',
        'avatar': sashaAvatar,
        'bios': 'i hate men and love woman',
        'posts': sashaPosts
    },
    {
        'id': '02',
        'name': 'cosima',
        'avatar': cosimaAvatar,
        'bios': 'i hate men and love woman',
        'posts': cosimaPosts
    },
    {
        'id': '03',
        'name': 'lumity blait',
        'avatar': lumityAvatar,
        'bios': 'i hate men and love woman',
        'posts': lumityPosts
    },
    {
        'id': '04',
        'name': 'sofia manfano',
        'avatar': sofiaAvatar,
        'bios': 'i hate men and love woman',
        'posts': sofiaPosts
    },
    {
        'id': '05',
        'name': 'evelyn hugo',
        'avatar': evelynAvatar,
        'bios': 'i hate men and love woman',
        'posts': evelynPosts
    },
    // {
    //     'id': '1',
    //     categ: 'Matemática',
    //     imgDefault: <FaGraduationCap />
    // },
    // {
    //     id: '2',
    //     categ: 'Portugues',
    //     imgDefault: <FaGraduationCap />
    // },
    // {
    //     id: '3',
    //     categ: 'Ingles',
    //     imgDefault: <FaGraduationCap />
    // }
]
