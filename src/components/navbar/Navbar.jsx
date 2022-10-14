import React, { useState } from 'react';
import './Navbar.css';
import Input from '../input/Input'
import { Link } from 'react-router-dom';

import { BiHomeAlt } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RiSearch2Line } from 'react-icons/ri';
import { BsPersonCircle, BsSearch } from 'react-icons/bs';

const Navbar = () => {

    const [navbar, setNavbar] = useState(false);
    const showNavbar = () => setNavbar(!navbar);

    const [resultSearch, setRedultSearch] = useState([]);
    const [term, setTerm] = useState([]);
    const onSearch = (e) => {
        setTerm(e.target.value);
        setRedultSearch([]);
        if (term.length < 3) {
            return
        }
        setRedultSearch([
            {
                avatar: '',
                name: 'Sasha',
                email: 'sashabazanea@gmail.com'
            },
            {
                avatar: '',
                name: 'Carol',
                email: 'carol@gmail.com'
            },
            {
                avatar: '',
                name: 'Cosima',
                email: 'Cosima@gmail.com'
            },
            {
                categ: 'mat'
            },
            {
                categ: 'mat'
            }
        ])
    }

    const SidebarData = [
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

                <li className='item-logo'> <h1>MemorizeStudio</h1> </li>

                <li className='item-searchbar'>
                    <Input
                        text='Pesquisar'
                        type='text'
                        icon={<BsSearch />}
                        className='input-outline-secondary'
                        value={term}
                        onchange={(e) => { setTerm(e.target.value) }}
                    />
                </li>

                {SidebarData.map((item, index) => {
                    return (
                        <li key={index} className={item.cName}>
                            <Link to={item.path} className='item-link'>
                                {item.icon}
                                {item.title}
                            </Link>
                        </li>
                    )
                })}

            </ul>

            {resultSearch.length > 0 && (
                <div className="result-search-container">
                    {resultSearch.map(result => {
                        <>
                            <div className="result-category-container">
                                <p> {result.categ} </p>
                                <p> i </p>
                            </div>

                            <div className="result-profile-container">
                                <div className="avatar-container">
                                    photo
                                </div>
                                <div className="content-person">
                                    <p> {result.name} </p>
                                </div>
                            </div>
                        </>
                    })}
                </div>
            )}

            {/* <div className="result-search-container">

                <div className="result-category-container">
                    <p> categoria </p>
                    <p> i </p>
                </div>

                <div className="result-profile-container">
                    <div className="avatar-container">
                        photo
                    </div>
                    <div className="content-person">
                        <p> name </p>
                    </div>
                </div>

            </div> */}

        </nav>
    )
}

export default Navbar