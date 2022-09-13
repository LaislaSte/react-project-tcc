import React, { useState } from 'react';
// import { Posts } from './ExploreData';
// import { Post } from '../../components/post/Post';
import Navbar from '../../components/navbar/Navbar';
import Input from '../../components/input/Input';

import './Explore.css';

import { BsSearch } from 'react-icons/bs';

const Explore = () => {

    // const [resulSearch, setResultSearch] = useState([]);
    // const [term, setTerm] = useState('');

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

    return (
        <>
        <h1>Tela da Home</h1>
        <Navbar />

        </>
    )
}

export default Explore