import React, { useState } from 'react';
// import { Posts } from './ExploreData';
import { Post } from '../../components/post/Post';
import Navbar from '../../components/navbar/Navbar';
import Input from '../../components/input/Input';

import './Explore.css';

import { BsSearch } from 'react-icons/bs';

const Explore = () => {

    // const [resulSearch, setResultSearch] = useState([]);
    const [term, setTerm] = useState('');

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
    const category = [
        'matemática',
        'história',
        'português',
        'química'
    ]

    return (
        <>
            <h1>Tela da Home</h1>
            <Navbar />
            <header className="header-main-filter">
                <div className="filter-input-text">
                    <Input
                        text='Pesquisar'
                        type='text'
                        className='input-outline-secondary'
                        value={term}
                        onchange={(e) => {setTerm(e.target.value)}}
                    />

                </div>
                <div className="filter-input-select">
                    <select name="" id="">
                        <option value="Selecione uma Categoria">Selecione uma categoria</option>
                        {category.map((item, index) => {
                            return (
                                <option value={item} key={index}> {item} </option>
                            )
                        })}
                    </select>
                </div>
            </header>

            <main className="posts-container">
                <Post
                    content='dfdfdssssssssfs'
                />
                <Post
                    content='dfdfdssssssssfs'
                />
                <Post
                    content='dfdfdssssssssfs'
                />
            </main>

        </>
    )
}

export default Explore