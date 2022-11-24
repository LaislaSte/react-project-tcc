// HOOKS AND LIBS 
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsGearFill, BsFillArrowDownCircleFill } from 'react-icons/bs';
import { useAuthState } from 'react-firebase-hooks/auth';

// ARCHIVES FROM PROJECT
import './Profile.css';
import { post } from '../../utils/ArraysAndFunctions';
import avatarDefault from '../../assets/img-avatar.png';
import { auth } from '../../services/Banco';
import { UserAuth } from '../../services/UserContext'

/*PAGES AND COMPONENTS */
import LikeButton from '../../components/likebutton/LikeButton';
import { Post } from '../../components/post/Post';
import Navbar from '../../components/navbar/Navbar';
import CreateButton from '../../components/createbutton/CreateButton';

const Profile = () => {
    // states 
    // const [name, setName] = useState("");
    // const [imgURL, setImgURL] = useState("");
    // const [bio, setBio] = useState("");
    // todos: importar posts do usuario logado do firestore e adicionalos nesse estado
    const [userPosts, setUserPosts] = useState([]);

    // imports
    const [user, loading, error] = useAuthState(auth);
    const { bios, imgUrl, name, uid, getExternalUser, euser } = UserAuth();

    // function 
    /*ao clicar para redirecionar para o perfil, é redirecionado para a rota /user e passado o uid como parametro da url (/user/:id), nesta url estara o componente userdetails que ira usar o hook do router-dom para usar os parametros passados, esse parametro será usado para realizar uma filtragem de todos os users que há no banco e renderiar o que corresponder com a query feita.*/
    useEffect(() => {
        const callUser = () => {
            try {
                // setEuser(getExternalUser(id));
                // const res = await getExternalUser(id);
                getExternalUser(uid);
            } catch (error) {
                console.log(error);
            }
        }
        callUser()

    }, [])

    // // useeffect 
    // useEffect(
    //     () => {
    //         fetchUserInfos();
    //     },
    //     [user]
    // )

    // // functions 
    // const fetchUserInfos = async () => {
    //     try {
    //         // setName(user?.displayName);
    //         // setImgURL(user?.photoURL);
    //         setBio(bios);
    //         console.log(bios)
    //         console.log(user?.photoURL)
    //         console.log(name)
    //         console.log(user)

    //     } catch (err) {
    //         console.error(err);
    //         alert("An error occured while fetching user data");
    //     }
    // };

    return (
        <div className='Profile'>
            <Navbar />
            <CreateButton />

            <header className='section-profile'>

                <div className="profile-container">
                    <div className="img-background">
                        <img src={imgUrl ? imgUrl : avatarDefault} alt="" />
                    </div>
                </div>

                <div className="bio">
                    <h2>{name}</h2>
                    {bios}
                </div>

                <div className="header-button-profile">
                    <Link to='/config'>
                        <BsGearFill className='header-profile-icon' />
                    </Link>
                </div>
            </header>

            <main className="section-posts">
                <h1>Postagens Realizadas <BsFillArrowDownCircleFill className='footer-icon' /> </h1>
                <div className="posts-container">
                    {euser.espost.map((item, index) => {
                        return (
                            <Post
                                key={index}
                                postId={item.eid}
                                internalUser={true}
                                user_id={user.uid}
                                user_name={name}
                                avatar={imgUrl}
                                title={item.etitle}
                                category={item.ecategory}
                                content={item.econtent}
                                img_content={item.econtentImg}
                                click_type_like={<LikeButton postId={item.eid} />}
                            />
                        )
                    })}
                </div>
            </main>

        </div>
    )
}

export default Profile;

