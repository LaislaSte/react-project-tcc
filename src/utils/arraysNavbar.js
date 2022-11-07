import React from 'react';
import avatarDefault from '../assets/icons/avatarDefault.svg';

import { BiHomeAlt, BiLogOut } from 'react-icons/bi';
import { RiSearch2Line } from 'react-icons/ri';
import { BsPersonCircle, BsFillPlusCircleFill } from 'react-icons/bs';
import { FaGraduationCap } from 'react-icons/fa';
import { IoMdCreate, IoLogOutOutline } from 'react-icons/io'

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
        title: 'Explorar',
        path: '/explore',
        icon: <RiSearch2Line />,
        cName: 'nav-text'
    },
    {
        title: 'Criar',
        path: '/create',
        icon: <IoMdCreate />,
        cName: 'nav-text'
    },

    {
        title: 'Revisão',
        path: '/review',
        icon: <BiHomeAlt />,
        cName: 'nav-text'
    },
    {
        title: 'Perfil',
        path: '/profile',
        icon: <BsPersonCircle />,
        cName: 'nav-text'
    },
    {
        title: 'Sair',
        path: '/',
        icon: <BiLogOut />,
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