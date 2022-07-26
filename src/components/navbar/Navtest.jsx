import React from 'react';
import { SidebarData } from './SidebarData';
import { Link } from 'react-router-dom';
import './Navtest.css';
import {IconContext} from 'react-icons';


const Navtest = () => {

    return (
        <>
	<IconContext.Provider value={{color: '#fff'}}>

            <nav className='nav-menu' >
                <ul className="nav-menu-items">

                    {SidebarData.map( (item, index) => {
                        return(
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
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