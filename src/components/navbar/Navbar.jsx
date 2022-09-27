import React, { useState } from 'react';
import './Navbar.css';
import { AiFillHome } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { BsPersonCircle } from 'react-icons/bs';

const Navbar = () => {

    const [navbar, setNavbar] = useState(false);
    const showNavbar = () => setNavbar(!navbar);

    const SidebarData = [
        {
            title: 'Home',
            path: '/review',
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
            <div className="nav-header">
                <div className="nav-toggle" onClick={showNavbar}>
                    <GiHamburgerMenu />
                </div>
                <h1>MemorizeStudio</h1>
            </div>

            <ul className={navbar ? 'nav-menu-items' : 'nav-menu-items nav-menu-items-active'}>

                <div className="nav-header">
                    <div className="nav-toggle" onClick={showNavbar}>
                        <GiHamburgerMenu />
                    </div>
                    <h1>MemorizeStudio</h1>
                </div>

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