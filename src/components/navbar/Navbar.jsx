import React from 'react';
import './Navbar.css';
import { AiFillHome } from 'react-icons/ai';
import { FaHeart, FaSearch } from 'react-icons/fa';
import { MdCreate } from 'react-icons/md';
import { BsGearFill, BsPersonCircle } from 'react-icons/bs';

import { Link } from 'react-router-dom';

const Navbar = () => {

    const SidebarData = [
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
            title: 'Meu Perfil',
            path: '/profile',
            icon: <BsPersonCircle />,
            cName: 'nav-text'
        },
    ]

    return (
        <nav className="navbar">
            <h1>MemorizeStudio</h1>

            <ul className="nav-menu-items">

                {SidebarData.map((item, index) => {
                    return (
                        <li key={index} className={item.cName}>
                            <Link to={item.path}>
                                <div className="link-icon">
                                    {item.icon}
                                </div>
                                <div className="link-title">
                                    {item.title}
                                </div>
                            </Link>
                        </li>
                    )
                })}

            </ul>
        </nav>
    )
}

export default Navbar