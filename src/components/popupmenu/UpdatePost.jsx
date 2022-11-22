// HOOKS AND LIBS 
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
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
import uploadFile from '../../services/uploadFile';
import { ref } from 'firebase/storage';

const UpdatePost = ({
    funPopUp,
    postId,
}) => {
    // states 
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [imgURL, setImgURL] = useState('');
    const [favCategory_user, setFavCategory_user] = useState([]);
    const [isChecked, setIsChecked] = useState(false);

    // imports 
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);
    const { name } = UserAuth;

    // useeffect 
    useEffect(
        () => {
            const fetchPost = async () => {
                const q = query(collection(db, "post"), where("uid", "==", user?.uid));
                const querySnapshot = await getDocs(q);

                try {
                    // for (var i in querySnapshot.docs) {
                    //     const doc = querySnapshot.docs[i]
                    //     setId(doc.id);
                    //     if (name) {
                    //         break
                    //     }
                    // }
                    querySnapshot.forEach((doc) => {
                        // setId(doc.id);
                        if (doc.id === postId) {
                            setTitle(doc.data().title);
                            setContent(doc.data().content);
                            setImgURL(doc.data().imgURL);
                            setFavCategory_user(doc.data().category);
                        }

                    });
                } catch (error) {
                    console.log(error);
                }
            };

            return () => {
                fetchPost();
            };

        },
        []
    )

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

    const formValidUpdatePost = () => {
        return postContentValid(content) && titleValid(title) && validCBpost(favCategory_user);
    }


    const updatePost = async (e) => {
        const file = e.target[0]?.files[0];
        if (!file) return;

        const url = uploadFile(file, `postsContent/${user?.uid}/${file?.name?.split('.')?.pop()}`)
        setImgURL(url);

        try {
            await updateDoc(doc(db, "post", postId), {
                imgContent: imgURL,
                title: title,
                content: content,
                category: favCategory_user
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
        setImgURL('')
        // showPopUp()
    }

    return (
        <div className='Create'>

            <div className="create-post-container">
                <div className="close-icon-container">
                    <AiOutlineClose className='close-icon' onClick={funPopUp} />
                </div>

                <form onSubmit={updatePost} className="form-create-post">

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
                        <InputImg
                            setImage={setImage}
                            className='container-img-upload-preview'
                            imgPreview={image?.preview || imageDefault}
                            imgPreviewClassName='upload-preview'
                        />
                        <div className="btns-popup">
                            <Button
                                text='Salvar'
                                type='submit'
                                bg_color='secondary'
                                disable={!formValidUpdatePost()}
                            />
                        </div>
                    </div>


                </form>

            </div>

        </div>
    )
}

export default UpdatePost