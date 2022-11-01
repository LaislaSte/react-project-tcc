import React from 'react';
import { BiHomeAlt } from 'react-icons/bi';
import { RiSearch2Line } from 'react-icons/ri';
import { BsPersonCircle } from 'react-icons/bs';
import avatarDefault from '../assets/icons/avatarDefault.svg'
import { FaGraduationCap } from 'react-icons/fa';

export const SidebarDataPublic = [
    {
        title: 'Login',
        path: '/login',
        icon: <BiHomeAlt />,
        cName: 'nav-text'
    },
    {
        title: 'Cadastrar',
        path: '/register',
        icon: <RiSearch2Line />,
        cName: 'nav-text'
    },
    {
        title: 'Sobre',
        path: '/about-us',
        icon: <BsPersonCircle />,
        cName: 'nav-text'
    },
]

export const SidebarData = [
    {
        title: 'Revisão',
        path: '/review',
        icon: <BiHomeAlt />,
        cName: 'nav-text'
    },
    {
        title: 'Explorar',
        path: '/explore',
        icon: <RiSearch2Line />,
        cName: 'nav-text'
    },
    {
        title: 'Meu Perfil',
        path: '/profile',
        icon: <BsPersonCircle />,
        cName: 'nav-text'
    },
    {
        title: 'Log out',
        path: '/',
        icon: <BsPersonCircle />,
        cName: 'nav-text'
    }
]

export const resultSearch = [
    {
        id: '1',
        name: 'sasha bazanea',
        avatar: avatarDefault
    },
    {
        id: '2',
        name: 'cosima',
        avatar: avatarDefault
    },
    {
        id: '3',
        name: 'lumity blait',
        avatar: avatarDefault
    },
    {
        id: '4',
        name: 'sofia manfano',
        avatar: avatarDefault
    },
    {
        id: '5',
        name: 'evelyn hugo',
        avatar: avatarDefault
    },
    {
        id: '1',
        categ: 'Matemática',
        imgDefault: <FaGraduationCap />
    },
    {
        id: '2',
        categ: 'Portugues',
        imgDefault: <FaGraduationCap />
    },
    {
        id: '3',
        categ: 'Ingles',
        imgDefault: <FaGraduationCap />
    }
]