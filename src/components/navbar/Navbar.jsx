import React from 'react';
import './Navbar.css';
import { AiFillHome } from 'react-icons/ai';
import { FaHeart, FaSearch } from 'react-icons/fa';
import { MdCreate } from 'react-icons/md';
import { BsGearFill, BsPersonCircle } from 'react-icons/bs';

const Navbar = () => {
    return (
        <nav className="navbar">
            
            <ul>
                <li>
                    <AiFillHome />
                    <p>
                        <a href="#Home">Página Inicial</a>
                    </p>
                </li>
                <li>
                    <FaSearch />
                    <a href="#Explore">Explorar</a>
                </li>
                <li>
                    <MdCreate />
                    <a href="#Create">Criar</a>
                </li>
                <li>
                    <FaHeart />
                    <a href="#Notification">Notificações</a>
                </li>
                <li>
                    <BsPersonCircle />
                    <a href="#Profile">Meu Perfil</a>
                </li>
                <li>
                    <BsGearFill />
                    <a href="#Config">Conficurações</a>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar