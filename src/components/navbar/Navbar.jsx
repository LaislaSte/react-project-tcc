// HOOKS AND LIBS 
import React, { useState, useEffect } from 'react';
import { Link, browserHistory, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
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
import avatarDefault from '../../assets/icons/avatarDefault.svg'
import { auth } from '../../services/Banco';

/*PAGES AND COMPONENTS */
import Input from '../input/Input'

const Navbar = () => {
    // states 
    const [navbar, setNavbar] = useState(false);
    const [query, setQuery] = useState("");

    //imports
    const { logout, getUsers, users, getExternalUser, getPosts, notification } = UserAuth();
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);

    // useeffect 
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        getUsers();
    }, [user, loading]);

    // functions 
    const showNavbar = () => setNavbar(!navbar);
    // console.log()s

    /*ao clicar para redirecionar para o perfil, é redirecionado para a rota /user e passado o uid como parametro da url (/user/:id), nesta url estara o componente userdetails que ira usar o hook do router-dom para usar os parametros passados, esse parametro será usado para realizar uma filtragem de todos os users que há no banco e renderiar o que corresponder com a query feita.*/
    const goToUserPage = () => {
        const result = users.filter(item => item.ename.toLowerCase().includes(query));
        const id = result[0].euid;
        // getExternalUser(id);
        // console.log('chamado getExternalUser do navbar');
        navigate(`/user/${id}`);
        setQuery('');
        // browserHistory.push(`/${id}`)
    }

    //testar funções:
    const goToProfilePage = () => {
        getExternalUser(user.uid);
    }
    const goToExplorePage = () => {
        getPosts();
    }
    const goToReviewPage = () => {
        // getReviews();
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

                {user
                    // caso o usuario esteja autenticado as informações exibidas no navbar mudam
                    ? (
                        <>
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

                            <li className='nav-text'>
                                <Link to='/explore' className='item-link' onClick={goToProfilePage}>
                                    <RiSearch2Line />
                                    Explorar
                                </Link>
                            </li>
                            <li className='nav-text'>
                                <Link to='/review' className='item-link' onClick={goToExplorePage}>
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
                                <div className={notification ? 'input-message item-link' : 'item-link'} onClick={() => { logout() }}>
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
                        {users.filter(item => item.ename.toLowerCase().includes(query)).map((result, index) => {
                            return (
                                <li key={index} className="result-profile-container">

                                    <div className="result-profile">
                                        <div className="result-profile-content" onClick={goToUserPage}>

                                            <img className='result-avatar-container' src={result?.eavatar || avatarDefault} alt="" />
                                            <p> {result?.ename} </p>

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