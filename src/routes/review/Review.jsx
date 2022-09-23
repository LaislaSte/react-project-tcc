import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { Post } from '../../components/post/Post';
import Navbar from '../../components/navbar/Navbar';
import Input from '../../components/input/Input';
import { useState } from 'react';


const Review = () => {
    const [popUp, setPopUp] = useState(false);
    const showPopUp = () => setPopUp(!popUp);

    const registerReview = () => {
        console.log('user e conteudo registrado em revisoes, setado o contador e primeira data de revisao');
        showPopUp();
    }

    const [cat, setCat] = useState([]);

    const category = [
        'matemática',
        'história',
        'português',
        'química'
    ]
    return (
        <>
            <header className="header-main-filter">
                <div className="filter-input-text">
                    <Input
                        text='Pesquisar'
                        type='text'
                        className='input-outline-secondary'
                        value={term}
                        onchange={(e) => { setTerm(e.target.value) }}
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

            <Navbar />
            <div className="footer-container-create">
                <div className="footer-post">
                    <Link to='#' className='icon-container'>
                        <FaHeart className="icon" onClick={showPopUp} />
                    </Link>
                </div>

                <div >
                    <section className={popUp ? 'popup-menu popup-menu-active' : 'popup-menu'}>
                        <div className="popup-container">
                            <Link to='#' className='icon-container close-popup'>
                                <AiOutlineClose onClick={showPopUp} />
                            </Link>
                            <div className="popup-content">
                                <h1>O que deseja memorizar?</h1>
                                <form action="" className="form-create-post">
                                    <textarea name="" id="" cols="10" rows="6" placeholder='Adicione uma descrição...'></textarea>

                                    <Input
                                        text='Adicione uma categoria. Ex: Matemática'
                                        className='input-outline-primary'
                                        value={cat}
                                        onchange={(e) => {setCat(e.target.value) }}

                                    />
                                </form>
                                <div className="btns-popup">
                                    <Button type='button' bg_color='secondary' fun={registerReview} text='sim' />
                                    <Button type='button' bg_color='secondary' fun={showPopUp} text='não' />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Review