import React, { useState } from 'react';
import './Navbar.css';
import { SidebarData, SidebarDataPublic, resultSearch } from '../../utils/arraysNavbar';
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

    //caso o usuario esteja autenticado as informações exibidas no navbar mudam
    const autenticated = false

    // const onSearch = (e) => {
    //     setTerm(e.target.value);
    //     setResultSearch([]);

    //     if (term.length < 3) {
    //         return
    //     }

    //     setResultSearch([
    //         {
    //             avatar: '',
    //             name: 'fasd',
    //             email: 'klfasj',
    //             id: 'kjcs'
    //         },
    //         {
    //             avatar: '',
    //             name: 'fasdsd',
    //             email: 'klfssssasj',
    //             id: 'kasjcs'
    //         },
    //         {
    //             avatar: '',
    //             name: 'fasffdd',
    //             email: 'klfasfdsj',
    //             id: 'kjcasas'
    //         }
    //     ]);

    // }

    // const onClickResultSearch = (id) => {
    //     console.log('ao clicar no btn resultado da pesquisa', { id });
    // }

    const onSearch = (id) => {
        // setRedultSearch([]);
        console.log(id)
        // setTerm('');
    }


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

                {autenticated && (
                    SidebarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path} className='item-link'>
                                    {item.icon}
                                    {item.title}
                                </Link>
                            </li>
                        )
                    })
                )}

                {autenticated == false && (
                    SidebarDataPublic.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path} className='item-link'>
                                    {item.icon}
                                    {item.title}
                                </Link>
                            </li>
                        )
                    }))}

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

                    </ul>
                </div>
            )}

        </nav>
    )
}

export default Navbar