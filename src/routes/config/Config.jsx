// import React, { useState } from 'react';
import React, { useState, useContext, useEffect } from 'react';
import './Config.css';
import { nameValid, biosValid, validCBcategorys } from '../../utils/validators';
import { categorys } from '../../utils/arraysHeader';
import { CostumerContext } from '../../services/UserContext';
import avatarDefault from '../../assets/img-avatar.png';

import InputImg from '../../components/inputImg/InputImg';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import TxtArea from '../../components/txtarea/TxtArea';
import CheckBox from '../../components/checkbox/CheckBox';

// imports storage
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import { storage } from '../../services/Banco';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { updateProfile } from 'firebase/auth';
import uploadFile from '../../services/uploadFile';
import { async } from '@firebase/util';

const Config = () => {
    const [image, setImage] = useState(null);
    const [imgURL, setImgURL] = useState('');
    const [progress, setProgress] = useState(0);

    const { user, updateUserProfile } = useContext(CostumerContext);

    const [name_user, setUserName] = useState('');
    const [bios_user, setBios] = useState('');
    const [favCategory_user, setCategorys] = useState([]);
    const [img_user, setImgUser] = useState(null);
    const [userLoged_id, setIdUser] = useState('');

    const [isItLimited, setItIsLimited] = useState(false);

    const [category, setCategory] = useState([]);

    const handleCheckboxChange = (event) => {
        let newArray = [...category, event.target.value];
        if (category.includes(event.target.value)) {
            newArray = newArray.filter(day => day !== event.target.value);
        }
        setCategory(newArray)
    };
    const showMessage = (fav) => {
        if (fav) {
            return !validCBcategorys(fav)
        }
    }

    const formValidUserUpdate = () => {
        return nameValid(name_user) && biosValid(bios_user) && validCBcategorys(category);
    }

    useEffect(
        () => {
            setImgURL(user?.photoURL);
            setUserName(user?.displayName);
        },
        [user]
    )


    const handleSubmit = async (e) => {
        e.preventDefault();

        // const file = e.target[0]?.files[0];

        // if (!file) return;

        // let userObj = { displayName: name_user }
        // let imagesObj = { uName: name_user }
        // try {
        //     if (file) {
        //         const imageName = user.uid + '.' + file?.name?.split('.')?.pop();
        //         const url = await uploadFile(file, `profile/${user?.uid}/${imageName}`);
        //         //todo: delete the previous profile image od the user

        //         userObj = { ...userObj, photoURL: url }
        //         imagesObj = { ...imagesObj, uURL: url }
        //     }

        //     await updateProfile(user, userObj);
        //     console.log('user updated');
        // } catch (error) {
        //     console.log(error);

        // }

        // const imageName = user.uid + '.' + file?.name?.split('.')?.pop();
        // // const storageRef = ref(storage, `profile/${file.name}`);
        // const storageRef = ref(storage, `profile/${imageName}`);
        // const uploadTask = uploadBytesResumable(storageRef, file);
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
        // )

        // const storageUrl = getDownloadURL(storage, storageRef);

        // setImgURL(storageUrl);


        // updateUserProfile(imgURL, name_user, bios_user, category);

        updateUserProfile(imgURL, name_user, bios_user, category);

    }

    return (
        <div className='Config'>

            <div className="config-container">

                <div className="close-icon-container">
                    <Link to='/profile'> <AiOutlineClose className='config-link' /> </Link>
                </div>

                <form onSubmit={handleSubmit} className="config-form-container">

                    <div className="user-img-container">

                        <div className="config-user-avatar-container">

                            <InputImg
                                setImage={setImage}
                                className='container-img-profile-preview'
                                imgPreview={image?.preview || imgURL || avatarDefault}
                                imgPreviewClassName='avatar'
                            />
                            <p>Adicionar imagem</p>
                        </div>

                        <Input
                            type='text'
                            text='Nome de Usuário'
                            className='input-outline-secondary'
                            value={name_user}
                            onchange={(e) => { setUserName(e.target.value) }}
                            message='Este nome não é válido'
                            showMessage={name_user && !nameValid(name_user)}
                        />
                    </div>


                    <div className="txt-area-container">
                        <TxtArea
                            text='Adicione uma descrição'
                            cols='30'
                            rows='5'
                            value={bios_user}
                            onchange={(e) => setBios(e.target.value)}
                            message='Ultrapassa o limite de caracteres'
                            showMessage={bios_user && !biosValid(bios_user)}
                        />
                    </div>

                    <div className="selects-container">
                        <p>Escolha suas preferências de estudo (até 5) </p>

                        <div className='checked-boxes-container' >
                            {categorys.map((item, index) => {
                                return (
                                    <div className="form-checked-box" key={index}>
                                        <input
                                            type="checkbox"
                                            id={item.id}
                                            value={item.name}
                                            onChange={handleCheckboxChange}
                                        />

                                        <label htmlFor={item.id}>{item.name}</label>

                                    </div>
                                )
                            })}
                        </div>

                        {showMessage(category) && <p className='input-error-message'> Selecione até 5 categoria </p>}

                    </div>

                    <Button
                        text='Salvar'
                        type='submit'
                        bg_color='secondary save-button'
                        disable={!formValidUserUpdate()}
                    />

                    <div className="config-btns-container">
                        <Link to='/changepassword1'>
                            <Button text='Editar Senha' type='button' bg_color='primary' />
                        </Link>

                        <Link to='/changeemail1'>
                            <Button text='Editar E-mail' type='button' bg_color='primary' />
                        </Link>

                        <Link to='/deleteaccount'>
                            <Button text='Excluir Contar' type='button' bg_color='primary' />
                        </Link>

                    </div>


                </form >

            </div>
        </div >
    )
}

export default Config;

