import React, { useState, useContext } from 'react';
// imports storage
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import { storage } from '../../services/Banco';
import imageDefault from '../../assets/img-camera.png'

import { Post } from '../../components/post/Post';
import Navbar from '../../components/navbar/Navbar';
import Categorys from '../../components/categorys/Categorys';
import CreateButton from '../../components/createbutton/CreateButton';

// import SearchBar from '../../components/searchbar/SearchBar';

import './Explore.css';
import { PostsContext } from '../../services/PostContext';


import { AiOutlineClose } from 'react-icons/ai';
import { IoIosAddCircle } from 'react-icons/io';
import { BsSearch } from 'react-icons/bs';


const Explore = () => {

    const [popUp, setPopUp] = useState(false);
    const showPopUp = () => setPopUp(!popUp);

    const registerPost = () => {
        console.log('user e conteudo registrado em posts, setado o contador e primeira data de revisao');
        showPopUp()
    }

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categoryP, setCategory] = useState('');

    const addPost = useContext(PostsContext);
    // const {addPost, posts} = useContext(PostsContext);

    // const [resulSearch, setResultSearch] = useState([]);
    const [term, setTerm] = useState('');

    const [imgURL, setImgURL] = useState('');
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState(null);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(categoryP)
        addPost({ title, content, categoryP });

        // const file = e.target[0]?.files[0];

        // if (!file) return;

        // const postRef = ref(storage, `postsContent/${file.name}`);

        // // const pickRef = ref(storage, `profilePick/${file.name}`);

        // const uploadTask = uploadBytesResumable(postRef, file);
        // uploadTask.on(

        //     'state_changed',
        //     snapshot => {
        //         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //         setProgress(progress);
        //     },

        //     error => {
        //         console.error(error);
        //     },

        //     () => {
        //         getDownloadURL(uploadTask.snapshot.ref).then(url => { setImgURL(url) })
        //     }
        //


    }

    return (
        <>
            <header className="header-content">
                <Navbar
                />

                <Categorys/>  
                <CreateButton/>  

            </header>

            {/* <main className="posts-container">
                <Post
                    user_name='Laisla'
                    content='dfdfdsssssskkkkkkkkkkkkkkkkkkkkkkkkkkkkk'
                />
                <Post
                    content='dfdfdssssssssfs'
                />
                <Post
                    content='dfdfdssssssssfs'
                />
            </main> */}

            {/*
            <footer className='create-post-container'>

                <IoIosAddCircle onClick={showPopUp} />
                <Button
                    text={<IoIosAddCircle />}
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
                                <form onSubmit={handleSubmit} className="form-create-post">

                                    <Input
                                        text='Título'
                                        className='input-outline-secondary text-dark'
                                        type='text'
                                        value={title}
                                        onchange={(e) => { setTitle(e.target.value) }}
                                    />

                                    <textarea
                                        cols="30"
                                        rows="5"
                                        placeholder='escreva algo...'
                                        className='ta-popup-container'
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    ></textarea>

                                    <select value={categoryP} onChange={e => setCategory(e.target.value)}>
                                        <option value="Selecione uma Categoria">Selecione uma categoria</option>
                                        {category.map((item, index) => {
                                            return (
                                                <option value={item} key={index}> {item} </option>
                                            )
                                        })}
                                    </select>

                                    <InputImg
                                        setImage={setImage}
                                        className='container-img-profile-preview'
                                        imgPreview={image?.preview || imageDefault}
                                        imgPreviewClassName='avatar'

                                    />

                                    <div className="btns-popup">
                                        <Button
                                            text='Cancelar'
                                            type='button'
                                            bg_color='secondary'
                                            fun={showPopUp}
                                        />
                                        <Button
                                            text='Postar'
                                            type='submit'
                                            bg_color='secondary'
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
            </footer> */}

        </>
    )
}

export default Explore