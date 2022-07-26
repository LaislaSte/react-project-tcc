import React, { useState } from 'react';
import { SidebarData } from './SidebarData';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './Navtest.css';
import {IconContext} from 'react-icons';


const Navtest = () => {

    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
	<IconContext.Provider value={{color: '#fff'}}>

            <div className='navbar'>
                <Link to="#" className='menu-bars'>
                    <FaBars onClick={showSidebar} />
                </Link>
            </div>

            <nav className= {sidebar ? 'nav-menu-active' : 'nav-menu'}>
                <ul className="nav-menu-items">
                    <li className="navbar-toggle">
                        <Link to='#' className='menu-bars'>
                            <AiOutlineClose onClick={showSidebar} />
                        </Link>
                    </li>

                    {SidebarData.map( (item, index) => {
                        return(
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span> {item.title} </span>
                                </Link>
                            </li>
                        )
                    } )}
                </ul>

            </nav>
	</IconContext.Provider>
        </>
    )
}

export default Navtest;