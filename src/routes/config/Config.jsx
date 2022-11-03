// import React, { useState } from 'react';
import React, { useState, useContext, useEffect } from 'react';
import './Config.css';
import { nameValid, biosValid } from '../../utils/validators';
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
import { clearIndexedDbPersistence } from 'firebase/firestore';


const Config = () => {
    const [image, setImage] = useState(null);
    const [imgURL, setImgURL] = useState('');
    const [progress, setProgress] = useState(0);

    const { updateUser, user } = useContext(CostumerContext);

    const [name_user, setUserName] = useState('');
    const [bios_user, setBios] = useState('');
    const [favCategory_user, setCategorys] = useState([]);
    const [img_user, setImgUser] = useState(null);
    const [userLoged_id, setIdUser] = useState('');

    const [isItLimited, setItIsLimited] = useState(false);

    // const onChangeCB = (item) => {
    //     favCategory_user.push(item);
    //     console.log(favCategory_user)
    // if (favCategory_user > 1) {
    //     setCategorys(...favCategory_user + item);
    //     console.log(favCategory_user)
    // }
    //     let arrSelecteds = { ...favCategory_user };
    //     arrSelecteds.splice(1, 0, item);
    //     console.log(favCategory_user)

    // let couter = 0;
    // let max = 2;

    // let index = favCategory_user.findIndex(equalto);
    // const equalto = (i) => {
    //     return i === couter
    // }
    // // let arrSelecteds = { ...favCategory_user };

    // if (index !== -1) {
    //     arrSelecteds.splice(item, 1);
    // } else {
    //     arrSelecteds.push(id);
    // }

    // setCategorys(arrSelecteds);
    // }



    const handleSubmit = (e) => {
        e.preventDefault();

        const file = e.target[0]?.files[0];

        if (!file) return;

        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
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

        setIdUser(user.token);

        updateUser(userLoged_id, img_user, bios_user, name_user, favCategory_user);
    }

    return (
        <div className='container-form'>
            <form onSubmit={handleSubmit} className="config-form-container">

                <InputImg
                    setImage={setImage}
                    className='container-img-profile-preview'
                    imgPreview={image?.preview || avatarDefault}
                    imgPreviewClassName='avatar'

                />

                <Input
                    type='text'
                    text='Nome de Usuário'
                    className='input-outline-secondary'
                    value={name_user}
                    onchange={(e) => { setUserName(e.target.value) }}
                    message='Este nome não é válido'
                    showMessage={name_user && !nameValid(name_user)}
                />

                <div className="txt-area-container">
                    <TxtArea
                        cols="10"
                        rows="6"
                        text='Adicione uma descrição...'
                        value={bios_user}
                        onChange={(e) => { setBios(e.target.value) }}
                        message='este é o limite de caracter'
                        showMessage={bios_user && !biosValid(bios_user)}
                    />
                </div>

                <div className="selects-container">
                    <p>Escolha a quantidade de caralhos que quiser seu arrombado</p>

                    <div className='form-checked-boxes' >
                        {categorys.map((item, index) => {
                            return (
                                <div className="form-checked-box" key={index}>

                                    <input type="checkbox" value={item.name} id={item.id} />

                                    <label htmlFor={item.id}>{item.name}</label>

                                </div>
                            )
                        })}
                        {/* <CheckBox
                            options={categorys}
                            onChange={(option) => console.log(option)}
                        /> */}
                    </div>
                </div>

                <Button
                    text='Salvar'
                    type='submit'
                    bg_color='secondary'
                />


            </form >
        </div >
    )
}

export default Config;

