import React, { useState } from 'react';
import './Config.css';
import '../../../src/index.css'

const Config = () => {
    
    const [prefer, setPrefer] = useState([]);

    //const { configPrefer } = useContext(CostumerContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('dados do form', { email, senha })

        configPrefer({ nome, email, senha })
    }

    const selectedCat = (idC) =>{
        const cats = 0;
        cats = cats + idC;

    }

    return (
        <div className='container Config'>
            <div className="section-form">
                <h1>Configure suas preferêcias por conteúdos </h1>

                <form action="" onSubmit={handleSubmit}>
                    <div className='form-checked-boxes'>
                        <div className="form-checked-box">
                            <input type="checkbox" id='historia' onSelect={selectedCat(id)}/>
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

                    <input type="submit" className='btn' />
                </form>
            </div>

        </div>
    )
}

export default Config;

