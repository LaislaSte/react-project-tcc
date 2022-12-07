import React from 'react';
import { useNavigate } from 'react-router-dom';
import avatarDefault from '../../assets/img-avatar.png';

const GoToPageModal = ({
    uid,
    name,
    avatar
}) => {
    const navigate = useNavigate();

    const goToUserPage = () => {
        navigate(`/user/${uid}`);
    }

    return (
        <>
        <div className="modal-container-follow">
            <div key={uid} onClick={goToUserPage} className="external-user-container">
                <div className="external-user-modal-img-container">
                    <img src={avatar ? avatar : avatarDefault} alt="" />
                </div>
                <h2> {name} </h2>
            </div>
        </div>
        </>
    )
}

export default GoToPageModal