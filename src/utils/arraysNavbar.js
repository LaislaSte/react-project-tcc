import React from 'react';
import { BiHomeAlt } from 'react-icons/bi';
import { RiSearch2Line } from 'react-icons/ri';
import { BsPersonCircle, BsSearch, BsBoxArrowInUpRight } from 'react-icons/bs';


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
        email: 'sashabazanea@gmail.com'
    },
    {
        id: '2',
        name: 'cosima',
        email: 'cosima@gmail.com'
    },
    {
        id: '3',
        name: 'lumity blait',
        email: 'lumityblait@gmail.com'
    },
    {
        id: '4',
        categ: 'mat'
    },
    {
        id: '5',
        categ: 'mat'
    }
]