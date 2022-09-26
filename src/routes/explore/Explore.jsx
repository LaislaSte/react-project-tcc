import React, { useState, useContext } from 'react';
// import { Posts } from './ExploreData';
import { Post } from '../../components/post/Post';
import Navbar from '../../components/navbar/Navbar';
import Input from '../../components/input/Input';
import InputImg from '../../components/inputImg/InputImg';
import Button from '../../components/button/Button';

import './Explore.css';
import { PostsContext } from '../../services/PostContext';
// imports storage
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import { storage } from '../../services/Banco';
import imageDefault from '../../assets/img-camera.png'

import { BsSearch } from 'react-icons/bs';

const Explore = () => {

    // const [resulSearch, setResultSearch] = useState([]);
    const [term, setTerm] = useState('');

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categoryP, setCategory] = useState('');

    const addPost = useContext(PostsContext);

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

    const category = [
        'matemática',
        'história',
        'português',
        'química'
    ]

    const handleSubmit = (e) => {
        e.preventDefault();

        const file = e.target[0]?.files[0];

        if (!file) return;

        const postRef = ref(storage, `postsContent/${file.name}`);

        // const pickRef = ref(storage, `profilePick/${file.name}`);
        
        const uploadTask = uploadBytesResumable(postRef, file);
        uploadTask.on(

            'state_changed',
            snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
            },

            error => {
                console.error(error);
            },

            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(url => { setImgURL(url) })
            }
        )

        addPost({ title, content, categoryP });
    }

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

            <footer className='create-post-container'>
                <form onSubmit={handleSubmit}>
                    <Input
                        text='E-mail'
                        className='input-outline-secondary text-dark'
                        type='text'
                        value={title}
                        onchange={(e) => { setTitle(e.target.value) }}
                    />

                    <textarea
                        cols="30"
                        rows="10"
                        placeholder='escreva algo...'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>

                    <select name="" id="">
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

                    <Button
                        text='cancelar'
                        type='button'
                    />
                    <Button
                        text='enviar'
                        type='submit'
                    />

                </form>
            </footer>

        </>
    )
}

export default Explore