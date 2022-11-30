import React from 'react';
import { useNavigate } from 'react-router-dom';

const GoToPageModal = ({ uid, name, avatar }) => {
    const navigate = useNavigate();

    const goToUserPage = () => {
        navigate(`/user/${uid}`);
    }

    return (

        <div key={uid} onClick={goToUserPage} className="external-user-container">
            <img src={avatar} alt="" />
            <h2> {name} </h2>
        </div>

    )
}

export default GoToPageModal