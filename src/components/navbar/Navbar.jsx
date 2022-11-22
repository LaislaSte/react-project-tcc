// HOOKS AND LIBS 
import React, { useState, useContext } from 'react';
import { Link, browserHistory, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsSearch, BsBoxArrowInUpRight } from 'react-icons/bs';
import { BiHomeAlt, BiLogOut } from 'react-icons/bi';
import { RiSearch2Line } from 'react-icons/ri';
import { BsPersonCircle, BsFillPlusCircleFill } from 'react-icons/bs';
import { FaGraduationCap } from 'react-icons/fa';
import { IoMdCreate, IoLogOutOutline } from 'react-icons/io'

// ARCHIVES FROM PROJECT
import './Navbar.css';
import { UserAuth } from '../../services/UserContext';
import { SidebarDataPublic, resultSearch } from '../../utils/arraysNavbar';

/*PAGES AND COMPONENTS */
import Input from '../input/Input'

const Navbar = () => {
    // states 
    const [navbar, setNavbar] = useState(false);
    const [query, setQuery] = useState("");

    //imports
    const { user, logout } = UserAuth();
    const navigate = useNavigate();

    // functions 
    const showNavbar = () => setNavbar(!navbar);
    // console.log()

    const goToUserPage = () => {
        // const id = "01";
        const result = resultSearch.filter(item => item.name.includes(query));
        const id = result[0].id
        navigate(`/user/${id}`);
        setQuery('');
        // browserHistory.push(`/${id}`)
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
                    value={query}
                    onchange={(e) => { setQuery(e.target.value) }}

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
                        value={query}
                        onchange={(e) => { setQuery(e.target.value) }}
                    />
                </li>

                {user
                    // caso o usuario esteja autenticado as informações exibidas no navbar mudam
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
            </ul>

            {query.length > 2 && (
                <div className="result-search-container">

                    <ul className='container-result'>
                        {resultSearch.filter(item => item.name.toLowerCase().includes(query)).map((result, index) => {
                            return (
                                <li key={index} className="result-profile-container">

                                    <div className="result-profile">
                                        <div className="result-profile-content">

                                            <img onClick={goToUserPage} className='result-avatar-container' src={result.avatar} alt="" />
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