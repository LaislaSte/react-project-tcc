// HOOKS AND LIBS 
import React, { useState } from 'react';
import { BsFillPlusCircleFill } from 'react-icons/bs';

// ARCHIVES FROM PROJECT
import './CreateButton.css';
/*PAGES AND COMPONENTS */
import CreatePost from '../popupmenu/CreatePost';

const CreateButton = () => {

    const [popUp, setPopUp] = useState(false);
    const showPopUp = () => setPopUp(!popUp);

    return (
        <>

            <div className='create-button-container' onClick={showPopUp}>
                <BsFillPlusCircleFill className='create-button-icon' />
            </div>

            {
                popUp
                    ? (
                        <CreatePost funPopUp={showPopUp} />
                    )
                    : null
            }

        </>
    )

}

export default CreateButton
