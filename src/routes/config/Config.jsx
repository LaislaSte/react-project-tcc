// HOOKS AND LIBS 
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';

// ARCHIVES FROM PROJECT
import './Config.css';
import { nameValid, biosValid, validCBcategorys } from '../../utils/validators';
import { categorys } from '../../utils/arraysHeader';
import { UserAuth } from '../../services/UserContext';
import avatarDefault from '../../assets/img-avatar.png';
import uploadFile from '../../services/uploadFile';

/*PAGES AND COMPONENTS */
import InputImg from '../../components/inputImg/InputImg';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import TxtArea from '../../components/txtarea/TxtArea';


const Config = () => {
    // states 
    const [image, setImage] = useState(null);
    const [imgURL, setImgURL] = useState('');
    const [name_user, setUserName] = useState('');
    const [bios_user, setBios] = useState('');
    const [category, setCategory] = useState([]);
    const [img_user, setImgUser] = useState(null);

    // imports 
    const { user, updateUserProfile } = UserAuth();

    // useeffect 
    useEffect(
        () => {
            setImgURL(user?.photoURL);
            setUserName(user?.displayName);
        },
        []
    )

    // functions 
    const handleCheckboxChange = (event) => {
        let newArray = [...category, event.target.value];
        if (category.includes(event.target.value)) {
            newArray = newArray.filter(day => day !== event.target.value);
        }
        if(newArray.length > 5){
            showMessage(true);
            //da para criar uma função para por no form valid
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const file = e.target[0]?.files[0];
        if (!file) return;

        try {
            if (file) {
                const imageName = user.uid + '.' + file?.name?.split('.')?.pop();
                const url = uploadFile(file, `profile/${imageName}`)
                setImgURL(url);

                // todo: delete the previous profile image od the user
            }
        } catch (error) {
            console.log(error);
        }

        try {
            updateUserProfile(imgURL, name_user, bios_user, category);
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className='Config'>

            <div className="config-container">

                {/* <div className="close-icon-container"> */}
                <Link to='/profile'> <AiOutlineClose className='close-icon-container config-link' /> </Link>
                {/* </div> */}

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
                        <Link to='/chsangepassword1'>
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

