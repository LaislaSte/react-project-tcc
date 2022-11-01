// import React, { useState } from 'react';
import React, { useState } from 'react';
import './Config.css';
import { nameValid, biosValid } from '../../utils/validators';

import InputImg from '../../components/inputImg/InputImg';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';

import avatarDefault from '../../assets/img-avatar.png'

// imports storage
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import { storage } from '../../services/Banco';

const Config = () => {
    const [image, setImage] = useState(null);
    const [imgURL, setImgURL] = useState('');
    const [progress, setProgress] = useState(0);

    const [userName, setUserName] = useState('');
    const [bios, setBios] = useState('');

    const [message, setMessage] = useState(null);
    const [checked, setChecked] = useState([]);



    // const onChange = (objValue) => {
    //     setChecked(
    //         () => { return { checked: objValue } }
    //     )
    // }
    // const isDisabled = (id) => {
    //     return (
    //         checked.length > 2 && checked.indexOf(id) === -1
    //     );
    // }
    const onChange = (objValue) => {
        var max = 2;
        // counter = 0;
        if (checked.length < max) {
            setMessage(true);
            checked.push(objValue);
            // counter++
        }
        if (checked.length > 3) {
            setMessage(false)
        }
        // setChecked(
        //     () => { return { checked: objValue } }
        // )
    }
    // const isDisabled = (id) => {
    //     return (
    //         checked.length > 2 && checked.indexOf(id) === -1
    //     );
    // }

    //const { configPrefer } = useContext(CostumerContext);

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
                    value={userName}
                    onchange={(e) => { setUserName(e.target.value) }}
                    message='Este nome não é válido'
                    showMessage={userName && !nameValid(userName)}
                />

                <textarea
                    cols="10"
                    rows="6"
                    text='Adicione uma descrição...'
                    value={bios}
                    onChange={(e) => setBios(e.target.value)}
                    message='este é o limite de caracter'
                    showMessage={bios && !biosValid(bios)}></textarea>

                <div className="selects-container">
                    <p>Selecione quais assuntos de interesse (até 5)</p>
                    <p> {checked} </p>

                    <div className='form-checked-boxes' onChange={onChange} >
                        <div className="form-checked-box">
                            <input
                                type="checkbox"
                                id='historia'
                                value={'historia'}
                                disabled={message}
                                onChange={(e) => { onChange(e.target.value) }}
                            />
                            <label htmlFor="historia">Historia</label>
                        </div>
                        <div className="form-checked-box">
                            <input
                                type="checkbox"
                                id='matematica'
                                value={'matematica'}
                                disabled={message}
                                onChange={(e) => { onChange(e.target.value) }} />
                            <label htmlFor="matematica">Matemática</label>
                        </div>
                        <div className="form-checked-box">
                            <input
                                type="checkbox"
                                id='portugues'
                                value={'portugues'}
                                disabled={message}
                                onChange={(e) => { onChange(e.target.value) }} />
                            <label htmlFor="portugues">Português</label>
                        </div>
                        <div className="form-checked-box">
                            <input
                                type="checkbox"
                                id='sociologia'
                                value={'sociologia'}
                                disabled={message}
                                onChange={(e) => { onChange(e.target.value) }} />
                            <label htmlFor="sociologia">Sociologia</label>
                        </div>
                        <p> {message} </p>
                        {/* <div className="form-checked-box">
                            <input type="checkbox" id='quimica' />
                            <label htmlFor="quimica">Química</label>
                        </div>
                        <div className="form-checked-box">
                            <input type="checkbox" id='biologia' />
                            <label htmlFor="biologia">Biologia</label>
                        </div>
                        <div className="form-checked-box">
                            <input type="checkbox" id='filosofia' />
                            <label htmlFor="filosofia">Filosofia</label>
                        </div>
                        <div className="form-checked-box">
                            <input type="checkbox" id='ingles' />
                            <label htmlFor="ingles">Inglês</label>
                        </div>
                        <div className="form-checked-box">
                            <input type="checkbox" id='livre' />
                            <label htmlFor="livre">Outros</label>
                        </div> */}
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

