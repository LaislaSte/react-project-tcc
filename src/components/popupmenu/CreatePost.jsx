// HOOKS AND LIBS 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AiOutlineClose } from 'react-icons/ai';

// ARCHIVES FROM PROJECT
import './CreatePost.css';
import { fakeUser } from '../../utils/ArraysAndFunctions';
import imageDefault from '../../assets/icons/uploadDefault.svg'
import avatarDefault from '../../assets/icons/avatarDefault.svg'
import { postContentValid, titleValid, validCBpost } from '../../utils/validators';
import { UserAuth } from '../../services/UserContext';
import { db, auth, storage } from '../../services/Banco';

/*PAGES AND COMPONENTS */
import Button from '../button/Button';
import Input from '../input/Input';
import InputImg from '../inputImg/InputImg';
import TxtArea from '../txtarea/TxtArea';

const CreatePost = ({ funPopUp }) => {
    // states 
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [imgURL, setImgURL] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [favCategory_user, setFavCategory_user] = useState([]);

    // imports 
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);
    const { name, uid } = UserAuth();

    // functions 
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


    const sendPost = async (e) => {
        e.preventDefault();
        const file = e.target[0]?.files[0];
        if (!file) return;

        try {
            if (file) {
                const imageName = uid + '.' + file?.name?.split('.')?.pop();
                const postRef = ref(storage, `postContent/user:${uid}/${imageName}`);

                const uploadTask = uploadBytesResumable(postRef, file);
                uploadTask.on(
                    'state_changed',
                    snapshot => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        // setProgress(progress);
                    },
                    error => {
                        console.error(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(url => { setImgURL(url) })
                    }
                )

                // todo: delete the previous profile image od the user
            }
        } catch (error) {
            console.log(error);
        }

        try {
            await addDoc(collection(db, "post"), {
                uid: user?.uid,
                userPhoto: user?.photoURL,
                imgContent: imgURL,
                name: name,
                title: title,
                content: content,
                category: favCategory_user,
                likes: 0
            });
            alert('Flashcard criado!');
            cleanForm();
            navigate('/explore');
        } catch (err) {
            console.log(err)
        }
    }

    const cleanForm = () => {
        setContent('');
        setTitle('');
        setImage(null);
        setImgURL('');
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
                        <img src={user?.photoURL || avatarDefault} alt="" />

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
                        <div>
                            <p>Inserir Imagem</p>
                            <InputImg
                                setImage={setImage}
                                className='container-img-upload-preview'
                                imgPreview={image?.preview || imageDefault}
                                imgPreviewClassName='upload-preview'
                            />
                        </div>
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

export default CreatePost