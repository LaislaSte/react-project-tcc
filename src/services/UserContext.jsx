// HOOKS AND LIBS
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// auth:
import { GoogleAuthProvider, signInWithPopup, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, onAuthStateChanged, updateProfile, updatePassword, sendEmailVerification, updateEmail, deleteUser, reauthenticateWithCredential } from "firebase/auth";
// firestore: 
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc, getDoc, query, where, arrayUnion, serverTimestamp } from "firebase/firestore";

// ARCHIVES FROM PROJECT
import { db, auth, provider } from './Banco';

//instanciado um objeto com o Hook do react createContext
export const CostumerContext = createContext();
//referenciando a coleção do banco de dados a ser usada
const collectionRef = collection(db, 'users');

export const CostumerProvider = ({ children }) => {
    //states
    // usuario externo/especifico 
    const [euser, setEuser] = useState(null);

    // dados do usuários:
    const [user, setUser] = useState(null);
    const [id, setId] = useState('');
    const [uid, setUid] = useState(null);
    const [imgUrl, setImgUrl] = useState(null);
    const [bios, setBios] = useState('');
    const [name, setName] = useState('');
    const [categorys, setCategorys] = useState('');

    // para os posts 
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [eposts, setEposts] = useState([]);

    // para outras funcionalidades
    const [submiting, setSubmiting] = useState(null);
    const [loading, setLoading] = useState(false);
    // const [authenticated, setAuthenticated] = useState(false);
    const [loader, setLoader] = useState(false);

    //instanciado um navigate para navegação de rotas
    const navigate = useNavigate();



    // useEffect 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setUid(currentUser.uid);
            setName(currentUser.displayName);
            setImgUrl(currentUser.photoURL);
            getUserId();
        });
        return () => {
            unsubscribe();
        };
    }, []);

    /* ================================
        FUNÇÕES PARA OS USERS 
    =================================== */

    //pega as informações do user logado
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
                if (name) {
                    break
                }
            }
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
        getExternalPosts(euid);
        const q = query(collection(db, "users"), where("uid", "==", euid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setEuser({ name: doc.data().name, bio: doc.data().bios, avatar: doc.data().imgURL, espost: eposts });
        });
    }

    const getExternalPosts = async (euid) => {
        const secondq = query(collection(db, "post"), where("uid", "==", euid));
        const secondquerySnapshot = await getDocs(secondq);
        const d = [];
        try {
            secondquerySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                const posts = {
                    eid: doc.id,
                    euid: doc.data().uid,
                    etitle: doc.data().title,
                    econtent: doc.data().content,
                    econtentImg: doc.data().contentImg,
                    ecategory: doc.data().category
                }
                d.push(posts);
            });

            setEposts(d);

            // const users = [
            //     {
            //         name: 'laknsdlka',
            //         bio: 'allsblabsl',
            //         avatar: 'fonte meu cu'
            //     },
            //     [
            //         {
            //             euid: 'doc.data().uid',
            //             etitle: 'doc.data().title',
            //             econtent: 'doc.data().content',
            //             econtentImg: 'doc.data().contentImg',
            //             ecategory: 'doc.data().category'
            //         },
            //         {
            //             euid: 'doc.data().uid2',
            //             etitle: 'doc.data().title2',
            //             econtent: 'doc.data().content2',
            //             econtentImg: 'doc.data().contentImg2',
            //             ecategory: 'doc.data().category2'
            //         },
            //     ]
            // ]

        } catch (error) {
            console.log(error);
        }

    }


    //FUNÇÃO PARA CADASTRO COM O AUTHENTICATED E FIRESTORE
    const registerWithEmailAndPassword = async (name, email, password) => {
        setLoader(true);
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const user = res.user;
            await addDoc(collectionRef, {
                uid: user.uid,
                name: name,
                password,
                authProvider: "local",
                email,
            });
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
        setLoader(false);
    };

    //FUNÇÃO PARA EXCLUIR USER COM O AUTHENTICATED E FIRESTORE
    const revomeUser = () => {
        setLoader(true)
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

        setLoader(false)
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

    const updateUserEmail = (user_email) => {
        updateEmail(user, user_email).then(() => {
            // Email updated!
            console.log('e-mail de usuário atualizado');
        }).catch((error) => {
            // An error occurred
            console.log(error);
        });
    }

    //FUNÇÃO DE VERIFICAÇÃO DE E-MAIL
    const verifiedUserEmail = () => {
        sendEmailVerification(user)
            .then((result) => {
                // Email verification sent!
                console.log('e-mail de verificação enviado', result);
                return true;
            }).catch((error) => {
                console.log(error);
                return false;
            })
    }


    /* ================================
        FUNÇÕES PARA OS POSTS 
    =================================== */

    // FUNÇÃO DE CADASTRO DE POST 
    const sendPost = async (title, content, cat, img_content) => {
        try {
            const newDoc = await addDoc(collection(db, "post"), {
                uid: user?.uid,
                name: name,
                userAvatar: user?.photoURL,
                title: title,
                content: content,
                contentImg: img_content,
                category: cat,
                date: serverTimestamp()
            });

        } catch (error) {
            console.log(error)
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
    const deletePost = (postId) => {
        console.log('post deletado', postId);
    }

    //FUNÇÃO DE ATUALIZAR POST
    const updatePost = () => {
        console.log('post atualizado')
    }


    /* ================================
        FUNÇÕES PARA AS REVISÕES 
    =================================== */

    //TODO -> FUNÇÃO PARA CADASTRO DE REVISÃO

    //TODO -> FUNÇÃO PARA ATUALIZAR DATA DE REVISÃO

    // que pegue todos as reviews da tabela para renderizar na rota review de acordo com sua data certa
    const getReviews = async () => {
        const q = query(collection(db, "review"));
        const querySnapshot = await getDocs(q);
        const d = []

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const review = {
                id: doc.id,
                // user_name: doc.data().name,
                // user_id: doc.data().uid,
                // avatar: doc.data().userPhoto,
                // title: doc.data().title,
                // category: doc.data().category,
                // content: doc.data().content,
                // img_content: doc.data().imgContent,
            }
            d.push(review);
        });

        if (d) {
            setPosts(d);
        }
    }


    //INSTANCIA COSTUMER CONTEXT SENDO RETORNADA NO COMPONENTE PASSANDO PARA O SEU PROVEDOR AS FUNÇÕES CRUD, LOGIN E LOGOUT
    return (
        <CostumerContext.Provider value={{ user, uid, name, imgUrl, bios, categorys, euser, posts, users, registerWithEmailAndPassword, updateUserProfile, updateUserEmail, revomeUser, logInWithEmailAndPassword, signInWithGoogle, logout, verifiedUserEmail, getExternalUser, getUsers, getPosts, sendPost, updatePost, deletePost }}>
            {children}
        </CostumerContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(CostumerContext);
};