// HOOKS AND LIBS
import React from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { BiLogIn, BiInfoCircle } from 'react-icons/bi';
import { FaGraduationCap } from 'react-icons/fa';

// ARCHIVES FROM PROJECT
import avatarDefault from '../assets/icons/avatarDefault.svg';


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