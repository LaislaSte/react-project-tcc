import React, { useState, useContext } from 'react';
import './CreateButton.css';
import imageDefault from '../../assets/img-camera.png'
import { PostsContext } from '../../services/PostContext';

import { BsFillPlusCircleFill } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';

import Button from '../button/Button';
import Input from '../input/Input';
import InputImg from '../inputImg/InputImg';

const CreateButton = () => {

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

    const [popUp, setPopUp] = useState(false);
    const showPopUp = () => setPopUp(!popUp);

    const category = [
        'Matemática',
        'História',
        'Português',
        'Química',
        'Biologia'
    ]

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

    const cleanForm = () => {
        setContent('');
        setTitle('');
        setImage(null);
        setImgURL('')
        showPopUp()
    }

    return (
        <>

            <div className='create-button-container' onClick={showPopUp}>
                <BsFillPlusCircleFill className='create-button-icon' />

                <div className={popUp ? "create-content-container create-active" : 'create-content-container'}>

                </div>
            </div>

            <div className="create-post-container">
                <div className={popUp ? 'popup-menu popup-menu-active' : 'popup-menu'}>
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
                                    className='container-img-upload-preview'
                                    imgPreview={image?.preview || imageDefault}
                                    imgPreviewClassName='upload-preview'

                                />

                                <div className="btns-popup">
                                    <Button
                                        text='Cancelar'
                                        type='button'
                                        bg_color='secondary'
                                        fun={cleanForm}
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
                </div>
            </div>
        </>
    )

}

export default CreateButton
