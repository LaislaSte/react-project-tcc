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
import { Link, useNavigate, Navigate } from 'react-router-dom';
import TxtArea from '../txtarea/TxtArea';
import { postContentValid, titleValid, validCBpost } from '../../utils/validators';
import { PostProvider } from '../../services/PostContext';
import { CostumerContext } from '../../services/UserContext';
import { auth } from '../../services/Banco';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db } from '../../services/Banco';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../services/UserContext';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../services/Banco';


const CreatePost = ({ funPopUp }) => {
    // states 
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categoryP, setCategory] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [image, setImage] = useState(null);
    const [imgURL, setImgURL] = useState('');
    const [progress, setProgress] = useState(0);

    // imports 
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);
    const [favCategory_user, setFavCategory_user] = useState([]);
    const [user, loading, error] = useAuthState(auth);
    const { name, id } = UserAuth;


    const handleOnChangeCB = (event) => {
        setIsChecked(!isChecked);
        let newArray = [...favCategory_user, event.target.value];
        if (favCategory_user.includes(event.target.value)) {
            newArray = newArray.filter(day => day !== event.target.value);
        }
        setFavCategory_user(newArray);
    };

    const showMessage = (fav) => {
        if (fav) {
            return !validCBpost(fav)
        }
    }

    const formValidCreatePost = () => {
        return postContentValid(content) && titleValid(title) && validCBpost(favCategory_user);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(favCategory_user);
        // // console.log(content);
        // console.log(title);

        // const file = e.target[0]?.files[0];

        // if (!file) return;

        // const postRef = ref(storage, `postsContent/user.uid/${file.name}`);

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

    const sendPost = async (title, content, cat, img_url) => {
        try {
            await addDoc(collection(db, "post"), {
                uid: user?.uid,
                userPhoto: user?.photoURL,
                imgContent: img_url,
                name: name,
                userID: id,
                authProvider: "local",
                title: title,
                content: content,
                category: cat,
                likes: 0
            });
            alert('Flashcard criado!');
            navigate('/explore');
        } catch (err) {
            console.log(err)
        }
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
                </div>

                <form onSubmit={sendPost} className="form-create-post">

                    <div className="user-img-container">
                        <img src={fakeUser.avatar} alt="" />

                        <Input
                            text='Título'
                            className='input-outline-secondary text-dark'
                            type='text'
                            value={title}
                            onchange={(e) => { setTitle(e.target.value) }}
                            message='Ultrapassa o limite de caracteres'
                            showMessage={title && !titleValid(title)}
                        />
                    </div>


                    <TxtArea
                        text='Adicione uma descrição'
                        cols='30'
                        rows='5'
                        value={content}
                        onchange={(e) => setContent(e.target.value)}
                        message='Ultrapassa o limite de caracteres'
                        showMessage={content && !postContentValid(content)}
                    />

                    <p>Adicione uma categoria</p>

                    <div className='checked-boxes-container' >
                        {fakeUser.arrIdsCategorys.map((item, index) => {
                            return (
                                <div className="form-checked-box" key={index}>

                                    <input
                                        type="checkbox"
                                        value={item}
                                        id={item}
                                        onChange={handleOnChangeCB}
                                    />

                                    <label htmlFor={item}>{item}</label>

                                </div>
                            )
                        })}

                        {/* Tirar a opção de selecionar mais de um. */}
                        {showMessage(favCategory_user) && <p className='input-error-message'> Selecione apenas 1 categoria </p>}

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
                                type='submit'
                                bg_color='secondary'
                                disable={!formValidCreatePost()}
                            />
                            <Button
                                text='Postar e revisar'
                                type='submit'
                                bg_color='secondary'
                                disable={!formValidCreatePost()}
                            />
                        </div>
                    </div>


                </form>

            </div>

        </div>
    )
}

<PostProvider>
    <CreatePost />
</PostProvider>

export default CreatePost