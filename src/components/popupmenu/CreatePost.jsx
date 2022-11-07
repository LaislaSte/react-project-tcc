import React, { useState, useContext } from 'react';
import './CreatePost.css';
import { fakeUser } from '../../utils/ArraysAndFunctions';
import imageDefault from '../../assets/icons/uploadDefault.svg'
import { PostsContext } from '../../services/PostContext';

import { AiOutlineClose } from 'react-icons/ai';
// import { BiArrowBack } from 'react-icons/bi';

import Button from '../button/Button';
import Input from '../input/Input';
import InputImg from '../inputImg/InputImg';
import { Link } from 'react-router-dom';

const CreatePost = ({ funPopUp }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categoryP, setCategory] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [image, setImage] = useState(null);
    const [imgURL, setImgURL] = useState('');
    const [progress, setProgress] = useState(0);

    const addPost = useContext(PostsContext);
    // const { addPost, posts } = useContext(PostsContext);
    // function onChangeCB(id) {
    //     let c = [...categoryP];

    //     const a = c?.find(i => i === id);

    //     if (a !== undefined) {
    //         setCategory(c);
    //         setDisabled(true);
    //     } else if (a === undefined) {
    //         c.push(id);
    //         setCategory(c);
    //         setDisabled(true);
    //     }


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

    const cleanForm = () => {
        setContent('');
        setTitle('');
        setImage(null);
        setImgURL('')
        // showPopUp()
    }

    return (
        <div className='Create'>

            <div className="create-post-container">
                <div className="close-icon-container">
                    <AiOutlineClose className='close-icon' onClick={funPopUp} />
                    {/* <BiArrowBack className='back-icon' /> */}
                </div>

                <form onSubmit={handleSubmit} className="form-create-post">

                    <div className="user-img-container">
                        <img src={fakeUser.avatar} alt="" />

                        <Input
                            text='Título'
                            className='input-outline-secondary text-dark'
                            type='text'
                            value={title}
                            onchange={(e) => { setTitle(e.target.value) }}
                        />
                    </div>


                    <textarea
                        cols="30"
                        rows="5"
                        placeholder='O que deseja revisar?'
                        className='ta-popup-container'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>

                    <p>Adicione uma categoria</p>

                    <div className='checked-boxes-container' >
                        {fakeUser.arrIdsCategorys.map((item, index) => {
                            return (
                                <div className="form-checked-box" key={index}>

                                    <input type="checkbox" value={item} id={item} />

                                    <label htmlFor={item}>{item}</label>

                                </div>
                            )
                        })}
                    </div>

                    <div className="input-img-container">
                        <InputImg
                            setImage={setImage}
                            className='container-img-upload-preview'
                            imgPreview={image?.preview || imageDefault}
                            imgPreviewClassName='upload-preview'
                        />
                        <div className="btns-popup">
                            <Button
                                text='Apenas postar'
                                type='button'
                                bg_color='secondary'
                                fun={cleanForm}
                            />
                            <Button
                                text='Postar e revisar'
                                type='submit'
                                bg_color='secondary'
                            />
                        </div>
                    </div>


                </form>

            </div>

        </div>
    )
}

export default CreatePost