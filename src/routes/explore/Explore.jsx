import React, { useState } from 'react';
// import { Posts } from './ExploreData';
import { Post } from '../../components/post/Post';
import Navbar from '../../components/navbar/Navbar';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import './Explore.css';

import { BsSearch } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';

const Explore = () => {

    // const [resulSearch, setResultSearch] = useState([]);
    const [term, setTerm] = useState('');
    const [content, setContent] = useState('');

    const [popUp, setPopUp] = useState(false);
    const showPopUp = () => setPopUp(!popUp);

    const registerPost = () => {
        console.log('user e conteudo registrado em posts, setado o contador e primeira data de revisao');
        showPopUp()
    }

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
        'Matemática',
        'História',
        'Português',
        'Química'
    ]

    return (
        <>
            <Navbar />
            <header className="header-main-filter">
                <div className="filter-input-text">
                    <Input
                        text='Pesquisar'
                        type='text'
                        icon={<BsSearch />}
                        className='input-outline-secondary'
                        value={term}
                        onchange={(e) => { setTerm(e.target.value) }}
                    />

                </div>
                <div className="filter-input-select">
                    <select>
                        <option value="Selecione uma Categoria">Selecione uma categoria</option>
                        {category.map((item, index) => {
                            return (
                                <option value={item} key={index}> {item} </option>
                            )
                        })}
                    </select>
                </div>
                <Button
                    text='Criar'
                    bg_color='secondary btn-create'
                    fun={showPopUp}
                />

                <div className="create-post-container">
                    <section className={popUp ? 'popup-menu popup-menu-active' : 'popup-menu'}>
                        <div className="popup-container">
                            <div className='icon-container close-popup'>
                                <AiOutlineClose onClick={showPopUp} />
                            </div>
                            <div className="popup-content">
                                <form action="" className="form-create-post">
                                    <Input
                                        text='Insira um título'
                                        type='text'
                                        className='input-outline-secondary'
                                        value={content}
                                        onchange={(e) => { setContent(e.target.value) }}
                                    />
                                    <textarea cols="30" rows="10" className='ta-popup-container' placeholder='Faça alguma descrição...'></textarea>
                                    <div className="filter-input-select">
                                        <select>
                                            <option value="Selecione uma Categoria">Selecione uma categoria</option>
                                            {category.map((item, index) => {
                                                return (
                                                    <option value={item} key={index}> {item} </option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className="btns-popup">
                                        <Button type='button' bg_color='secondary' fun={registerPost} text='Postar' />
                                        <Button type='button' bg_color='secondary' fun={showPopUp} text='Cancelar' />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
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