// HOOKS AND LIBS
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// auth:
import { GoogleAuthProvider, signInWithPopup, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, onAuthStateChanged, updateProfile, updatePassword, sendEmailVerification, updateEmail, deleteUser, reauthenticateWithCredential } from "firebase/auth";
// firestore: 
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc, getDoc, query, where, arrayUnion, serverTimestamp, arrayRemove } from "firebase/firestore";

// ARCHIVES FROM PROJECT
import { db, auth, provider } from './Banco';

//instanciado um objeto com o Hook do react createContext
export const CostumerContext = createContext();
//referenciando a coleção do banco de dados a ser usada
const collectionRef = collection(db, 'users');

export const CostumerProvider = ({ children }) => {
    //states
    // dados do usuários:
    const [user, setUser] = useState(null);
    const [uid, setUid] = useState(null);
    const [id, setId] = useState('');
    const [imgUrl, setImgUrl] = useState(null);
    const [bios, setBios] = useState('');
    const [name, setName] = useState('');
    const [categorys, setCategorys] = useState('');
    const [uposts, setUposts] = useState([]);
    const [reviews, setReviews] = useState([]);

    // usuario externo/especifico 
    const [euser, setEuser] = useState(null);
    const [eposts, setEposts] = useState([]);

    // dados do feed
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);

    //instanciado um navigate para navegação de rotas
    const navigate = useNavigate();


    // useEffect 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setUid(currentUser.uid);
            // console.log('user setado pelos dados do currentUser/ useEffecct Context', user);
            setName(currentUser.displayName);
            setImgUrl(currentUser.photoURL);
            getUserId();
            getUsers();
            getPosts();
            getReviews();
        });
        return () => {
            unsubscribe();
        };
    }, []);

    /* ================================
        FUNÇÕES PARA OS USERS 
    =================================== */

    //pega as informações do user logado e seus posts
    const getUserId = async () => {
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);

        try {
            for (var i in querySnapshot.docs) {
                const doc = querySnapshot.docs[i]
                setId(doc.id);
                setName(doc.data().name);
                setBios(doc.data().userBio);
                setCategorys(doc.data().userCategorys);
                // setUposts(doc.data().userPosts);

                if (name) {
                    break
                }
            }

        } catch (error) {
            console.log(error);
        }

        const secondq = query(collection(db, "post"), where("uid", "==", uid));
        const secondquerySnapshot = await getDocs(secondq);
        const d = [];
        try {
            secondquerySnapshot.forEach((doc) => {
                const posts = {
                    eid: doc.id,
                    euid: doc.data().uid,
                    etitle: doc.data().title,
                    econtent: doc.data().content,
                    econtentImg: doc.data().imgContent,
                    ecategory: doc.data().category
                }

                // console.log('logando pela query para pegar post/ getUserId: ', posts);
                d.push(posts);
            });

            setUposts(d);
            // console.log('logando estados posts/ fun getUserId: ', uposts);

        } catch (error) {
            console.log(error);
        }
    }


    // que pegue todos os users da tabela para rederiza-los no filtro de busca  
    const getUsers = async () => {
        const q = query(collection(db, "users"));
        const querySnapshot = await getDocs(q);
        const d = []

        try {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                const userObj = {
                    euid: doc.data().uid,
                    ename: doc.data().name,
                    eavatar: doc.data().imgURL,
                    ebios: doc.data().bios
                }
                // console.log(userObj);
                d.push(userObj);
            });

            setUsers(d);

        } catch (error) {
            console.log(error);
        }

    }

    //pega as informações de perfil de um user especifico para renderizar informações de perfil (nome, foto e bio) 
    // que pegue posts de um usuario especifico passando seu uid 
    const getExternalUser = async (euid) => {
        const q = query(collection(db, "users"), where("uid", "==", euid));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            setEuser({
                name: doc.data().name,
                bio: doc.data().userBio,
                avatar: doc.data().imgURL
            })
        })
    }

    const getExternalPost = async (euid) => {
        const q = query(collection(db, "post"), where("uid", "==", euid));
        const querySnapshot = await getDocs(q);
        const dataPost = []
        querySnapshot.forEach((doc) => {
            const post = {
                eid: doc.id,
                euid: doc.data().uid,
                etitle: doc.data().title,
                econtent: doc.data().content,
                econtentImg: doc.data().imgContent,
                ecategory: doc.data().category
            }
            dataPost.push(post);
            console.log(dataPost);
            setEposts(dataPost);
            console.log(eposts);
        })
    }

    //FUNÇÃO PARA CADASTRO COM O AUTHENTICATED E FIRESTORE
    const registerWithEmailAndPassword = async (name, email, password) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const user = res.user;
            await addDoc(collectionRef, {
                uid: user.uid,
                name: name,
                imgURL: user.photoURL,
                password,
                authProvider: "local",
                email,
            });

            alert('usuario criado');
            getUsers();
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    //FUNÇÃO PARA EXCLUIR USER COM O AUTHENTICATED E FIRESTORE
    const revomeUser = () => {

        deleteUser(user).then(() => {
            console.log('usuário deletado: AUTH');
        }).catch((error) => {
            console.log(error, ': AUTH');
        });

        try {
            deleteDoc(doc(db, 'users', id));
        } catch (err) {
            console.error(err);
            alert(err.message);
        }

        getUsers();
    }

    //FUNÇÕES DE LOGIN, LOGIN COM GOOGLE E LOGOUT
    const logInWithEmailAndPassword = async (email, password) => {
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            navigate('/explore');
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const userGoogle = result.user;

                const q = query(collectionRef, where("uid", "==", userGoogle.uid));
                const docs = getDocs(q);
                if (docs.docs.length === 0) {
                    addDoc(collectionRef, {
                        uid: user.uid,
                        name: user.displayName,
                        authProvider: "google",
                        email: user.email,
                    });
                }

                console.log(userGoogle);
                setUser(userGoogle);
                navigate('/explore');
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log(errorCode, errorMessage, email, credential);
            });
    }

    const logout = () => {
        signOut(auth);
        setUser(null);
        // setAuthenticated(false);
        navigate('/');
    };

    //FUNÇÕES DE ATUALIZAÇÃO
    const updateUserProfile = (imgURL, name_user, bios_user, categorys) => {

        try {
            updateProfile(user, {
                displayName: name_user,
                photoURL: imgURL
            })
        } catch (error) {
            console.log(error)
        }

        updateDoc(doc(db, "users", id), {
            userBio: bios_user,
            userCategorys: categorys,
            name: name_user,
            imgURL: imgURL
        })
            .then(docRef => {
                console.log(docRef, 'atualização com query');
                setBios(bios_user);
                setName(name_user);
                setImgUrl(imgURL);
                setCategorys(categorys);
            }).catch((error) => {
                console.log('updateDoc error: ', error)
            });
    }

    // sendPasswordResetEmail(auth, email)

    /* ================================
        FUNÇÕES PARA OS POSTS 
    =================================== */

    // FUNÇÃO DE CADASTRO DE POST 
    const sendPost = async (title, content, cat, img_content) => {
        try {
            const postDoc = await addDoc(collection(db, "post"), {
                uid: user?.uid,
                userPhoto: user?.photoURL,
                imgContent: img_content,
                name: name,
                title: title,
                content: content,
                category: cat,
                likes: 0
            });
            alert('Flashcard criado!');

            await updateDoc(doc(db, "users", id), {
                userPosts: arrayUnion(postDoc)
            });

        } catch (err) {
            console.log(err)
        }

        try {

        } catch (error) {

        }
    }

    // que pegue todos os posts da tabela para renderizar no explore 
    const getPosts = async () => {
        const q = query(collection(db, "post"));
        const querySnapshot = await getDocs(q);
        const d = []

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const post = {
                id: doc.id,
                user_name: doc.data().name,
                user_id: doc.data().uid,
                avatar: doc.data().userPhoto,
                title: doc.data().title,
                category: doc.data().category,
                content: doc.data().content,
                img_content: doc.data().imgContent,
            }
            d.push(post);
        });

        if (d) {
            setPosts(d);
        }
    }

    //FUNÇÃO DE DELETAR POST
    const deletePost = async (postId) => {
        console.log('post deletado', postId);

        // await updateDoc(doc(db, "users", id), {
        //     userPosts: arrayRemove(postDoc);
        // });
        // getPosts();
    }

    //FUNÇÃO DE ATUALIZAR POST
    const updatePost = (postId, title, content, cat, img_content) => {

        console.log('post atualizado');
        // getPosts();
    }


    /* ================================
        FUNÇÕES PARA AS REVISÕES 
    =================================== */

    //TODO -> FUNÇÃO PARA CADASTRO DE REVISÃO
    const registerReview = async (postId, uid, userPhoto, imgContent, user_name, title, content, category) => {
        try {
            await addDoc(collection(db, "revision"), {
                postId: postId,
                uid: uid,
                userPhoto: userPhoto,
                imgContent: imgContent,
                name: user_name,
                title: title,
                content: content,
                category: category,
                dateAdd: serverTimestamp()
            });
            alert('Post adicionado nas revisões!');
        } catch (err) {
            console.log(err)
        }
    }

    // que pegue todos as reviews da tabela para renderizar na rota review de acordo com sua data certa
    const getReviews = async () => {
        const q = query(collection(db, "review"), where('uid', '==', uid));
        const querySnapshot = await getDocs(q);
        const d = []

        querySnapshot.forEach((doc) => {
            const review = {
                id: doc.id,
                postId: doc.data().postId,
                uid: doc.data().uid,
                userPhoto: doc.data().userPhoto,
                imgContent: doc.data().imgContent,
                name: doc.data().name,
                title: doc.data().title,
                content: doc.data().content,
                category: doc.data().category,
                dateAdd: doc.data().dateAdd
            }
            d.push(review);
        });

        if (d) {
            setReviews(d);
        }


    }

    //TODO -> FUNÇÃO PARA ATUALIZAR DATA DE REVISÃO



    //INSTANCIA COSTUMER CONTEXT SENDO RETORNADA NO COMPONENTE PASSANDO PARA O SEU PROVEDOR AS FUNÇÕES CRUD, LOGIN E LOGOUT
    return (
        <CostumerContext.Provider value={{ user, uid, id, imgUrl, bios, categorys, uposts, euser, eposts, posts, users, reviews, registerWithEmailAndPassword, updateUserProfile, revomeUser, logInWithEmailAndPassword, signInWithGoogle, logout, getExternalUser, getExternalPost, getUsers, getPosts, sendPost, updatePost, deletePost, registerReview, getReviews, getUserId }}>
            {children}
        </CostumerContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(CostumerContext);
};