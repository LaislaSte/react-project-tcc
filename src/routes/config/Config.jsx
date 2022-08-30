// import React, { useState } from 'react';
import React, { useEffect, useState } from 'react';
import './Config.css';
import InputImg from '../../components/inputImg/InputImg';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';

import avatarDefault from '../../assets/img-avatar.png'

const Config = () => {
    const [image, setImage] = useState(null)

    // const [prefer, setPrefer] = useState([]);

    //const { configPrefer } = useContext(CostumerContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('dados do form', { email, senha })

        // configPrefer({ nome, email, senha })
    }

    // const selectedCat = (idC) =>{
    //     var cats = 0;
    //     cats = cats + idC;

    // }


    return (
        <div className='container Config'>
            <form onSubmit={handleSubmit} className="config-form-container">

                <div className="img-upload-container">
                    <div className="img-preview-container">

                        <InputImg
                            setImage={setImage}
                            imgPreview={image?.preview}
                            imgPreviewClassName='img-preview-profile'
                        />
                    </div>
                    <Button
                        text='Salvar'
                        type='submit'
                        bg_color='secondary'
                    />
                </div>

                <div className="form-content">

                    <div className="header-container">

                        <div className="btns-rb-container">
                            <div className="input-form-rb">
                                <Input
                                    type='radio'
                                />
                                Professor(a)

                            </div>
                            <div className="input-form-rb">
                                <Input
                                    type='radio'
                                />
                                Aluno(a)
                            </div>
                        </div>

                        <Input
                            text='Nome de Usuário'
                            className='input-outline-secondary'
                        />
                    </div>

                    <textarea name="" id="" cols="30" rows="8" placeholder='Adicione alguma descrição...' className='outline-secondary'></textarea>

                    <p>
                        Selecione quais assuntos de interesse (até 5)
                    </p>

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


            </form>
        </div>
    )
}

export default Config;

