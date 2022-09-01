// import React, { useState } from 'react';
import React, { useEffect, useState } from 'react';
import './Config.css';
import InputImg from '../../components/inputImg/InputImg';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';

import avatarDefault from '../../assets/img-avatar.png'

const Config = () => {
    const [image, setImage] = useState(null);
    const [rb1, setRb1] = useState(false);
    const changeRB1 = () => setRb1(!rb1);

    const [rb2, setRb2] = useState(false);
    const changeRB2 = () => setRb2(!rb2);


    //const { configPrefer } = useContext(CostumerContext);

    const handleSubmit = (e) => {
        e.preventDefault();

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

                <div className='radios-button'>
                    <div className="form-rb">
                        <label htmlFor="prof">Professor(a)</label>
                        <div className={rb1 ? 'rb' : 'rb-false'} onClick={changeRB1}> </div>
                    </div>
                    <div className="form-rb">
                        <label htmlFor="prof">Aluno(a)</label>
                        <div className={rb2 ? 'rb' : 'rb-false'} onClick={changeRB2}> </div>
                    </div>
                </div>

                <Input
                    type='text'
                    text='Nome de Usuário'
                    className='input-outline-secondary'
                />

                <textarea name="" id="" cols="10" rows="6" placeholder='Adicione uma descrição...'></textarea>

                <div className="selects-container">
                    <p>Selecione quais assuntos de interesse (até 5)</p>

                    <div className='form-checked-boxes'>
                        <div className="form-checked-box">
                            <input type="checkbox" id='historia' />
                            <label htmlFor="historia">Historia</label>
                        </div>
                        <div className="form-checked-box">
                            <input type="checkbox" id='matematica' />
                            <label htmlFor="matematica">Matemática</label>
                        </div>
                        <div className="form-checked-box">
                            <input type="checkbox" id='portugues' />
                            <label htmlFor="portugues">Português</label>
                        </div>
                        <div className="form-checked-box">
                            <input type="checkbox" id='sociologia' />
                            <label htmlFor="sociologia">Sociologia</label>
                        </div>
                        <div className="form-checked-box">
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
                        </div>
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

