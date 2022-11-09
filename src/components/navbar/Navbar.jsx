import React, { useState, useContext } from 'react';
import './Navbar.css';
import { CostumerContext } from '../../services/UserContext';
import { SidebarDataPublic, resultSearch } from '../../utils/arraysNavbar';
import Input from '../input/Input'
import { Link } from 'react-router-dom';

import { GiHamburgerMenu } from 'react-icons/gi';
import { BsSearch, BsBoxArrowInUpRight } from 'react-icons/bs';
import { BiHomeAlt, BiLogOut } from 'react-icons/bi';
import { RiSearch2Line } from 'react-icons/ri';
import { BsPersonCircle, BsFillPlusCircleFill } from 'react-icons/bs';
import { FaGraduationCap } from 'react-icons/fa';
import { IoMdCreate, IoLogOutOutline } from 'react-icons/io'

const Navbar = () => {

    const [navbar, setNavbar] = useState(false);
    const showNavbar = () => setNavbar(!navbar);

    //caso o usuario esteja autenticado as informações exibidas no navbar mudam
    const { user, logout } = useContext(CostumerContext)

    const [term, setTerm] = useState([]);


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
        console.log(id)
    }


    return (
        <nav className="navbar">
            <div className="nav-header">
                <div className="nav-toggle" onClick={showNavbar}>
                    <GiHamburgerMenu />
                </div>
                <h1 className='nav-header-logo' >
                    <BsSearch />
                </h1>
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

                {user
                    ? (
                        <>
                            <li className='nav-text'>
                                <Link to='/explore' className='item-link'>
                                    <RiSearch2Line />
                                    Explorar
                                </Link>
                            </li>
                            <li className='nav-text'>
                                <Link to='/review' className='item-link'>
                                    <BiHomeAlt />
                                    Revisão
                                </Link>
                            </li>
                            <li className='nav-text'>
                                <Link to='/profile' className='item-link'>
                                    <BsPersonCircle />
                                    Perfil
                                </Link>
                            </li>
                            <li className='nav-text'>
                                <div className='item-link' onClick={() => { logout() }}>
                                    <BiLogOut />
                                    Logout
                                </div>
                            </li>
                        </>
                    )

                    : (SidebarDataPublic.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path} className='item-link'>
                                    {item.icon}
                                    {item.title}
                                </Link>
                            </li>
                        )
                    }))
                }
                {/* {user
                    ? (SidebarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName} onClick={item.functionLogout}>
                                <Link to={item.path} className='item-link'>
                                    {item.icon}
                                    {item.title}
                                </Link>
                            </li>
                        )
                    }))

                    : (SidebarDataPublic.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path} className='item-link'>
                                    {item.icon}
                                    {item.title}
                                </Link>
                            </li>
                        )
                    }))
                } */}

                {/* {user === false && (
                    )} */}

            </ul>

            {term.length > 2 && (
                <div className="result-search-container">

                    <ul className='container-result'>
                        {resultSearch.map((result, index) => {
                            return (
                                <li key={index} className="result-profile-container">

                                    <div className="result-profile">
                                        <div className="result-profile-content">

                                            <img className='result-avatar-container' src={result.avatar} alt="" />
                                            <p> {result.name} </p>

                                            <div className="result-categ-content">

                                                <div className="result-categ-container">
                                                    {result.imgDefault}
                                                </div>

                                                <p>{result.categ}</p>
                                            </div>

                                        </div>

                                        <BsBoxArrowInUpRight />

                                    </div>

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