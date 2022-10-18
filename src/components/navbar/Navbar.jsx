import React, { useState } from 'react';
import './Navbar.css';
import Input from '../input/Input'
import { Link } from 'react-router-dom';

import { BiHomeAlt } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RiSearch2Line } from 'react-icons/ri';
import { BsPersonCircle, BsSearch, BsBoxArrowInUpRight } from 'react-icons/bs';

const Navbar = () => {

    const [navbar, setNavbar] = useState(false);
    const showNavbar = () => setNavbar(!navbar);

    // const [resultSearch, setRedultSearch] = useState([]);

    const [term, setTerm] = useState([]);

    const resultSearch = [
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

    const onSearch = (id) => {
        // setRedultSearch([]);
        console.log(id)
        // setTerm('');
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
                <h1 className='nav-header-logo' >MemorizeStudio</h1>
                <Input
                    className='input-outline-secondary nav-header-input'
                    text='Pesquisar'
                    type='text'
                    icon={<BsSearch />}
                    value={term}
                    onchange={(e) => { setTerm(e.target.value) }}

                />
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

            {term.length > 2 && (
                <div className="result-search-container">
                    <ul className='container-result'>
                        {resultSearch.map((result, index) => {
                            return (
                                <li key={index} className="result-profile-container">

                                    <div className="result-profile-container-p" onClick={onSearch(index)}>

                                        <p className='result-name'> {result.name}</p>

                                        <p className='result-email'> {result.email} </p>

                                        <p className='result-categ'> {result.categ} </p>

                                    </div>

                                    <BsBoxArrowInUpRight />

                                    {index > 10 && (
                                        <Link to='/searchPageResults'>mostrar mais</Link>
                                    )}

                                </li>
                            )
                        })}

                        {/* <div className="result-category-container"
                                onClick={onClickSearch(index)}>
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
                            </div> */}

                    </ul>
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