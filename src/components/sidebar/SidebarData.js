import React from 'react';
import './Navtest.css';
import { AiFillHome } from 'react-icons/ai';
import { FaHeart, FaSearch } from 'react-icons/fa';
import { MdCreate } from 'react-icons/md';
import { BsGearFill, BsPersonCircle } from 'react-icons/bs';


export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Explorar',
        path: '/explore',
        icon: <FaSearch />,
        cName: 'nav-text'
    },
    {
        title: 'Criar',
        path: '/create',
        icon: <MdCreate />,
        cName: 'nav-text'
    },
    {
        title: 'Notificações',
        path: '/notification',
        icon: <FaHeart />,
        cName: 'nav-text'
    },
    {
        title: 'Meu Perfil',
        path: '/profile',
        icon: <BsPersonCircle />,
        cName: 'nav-text'
    },
    {
        title: 'Configurações',
        path: '/config',
        icon: <BsGearFill />,
        cName: 'nav-text'
    },
]