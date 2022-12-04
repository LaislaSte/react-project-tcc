// HOOKS AND LIBS
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// auth:
import { GoogleAuthProvider, signInWithPopup, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, onAuthStateChanged, updateProfile, updatePassword, sendEmailVerification, updateEmail, deleteUser, reauthenticateWithCredential } from "firebase/auth";
// firestore: 
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc, getDoc, query, where, arrayUnion, serverTimestamp, arrayRemove, increment } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';
//moment:
import moment from 'moment/moment';

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
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);

    // usuario externo/especifico 
    const [euser, setEuser] = useState([]);
    const [eposts, setEposts] = useState([]);

    // dados do feed
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [notification, setNotificatio] = useState(false);

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
                if (!name) { setName(doc.data().name); }
                if (!imgUrl) { setImgUrl(doc.data().imgURL); }
                setBios(doc.data().userBio);
                setCategorys(doc.data().userCategorys);

                // const ufollowing = doc.data().following ? doc.data().following : false;
                // const ufollowers = doc.data().followers ? doc.data().followers : false;
                // setFollowing(ufollowing);
                // setFollowers(ufollowers);

                // if (following) {
                //     for (const followingId of following) {
                //         const q = query(collection(db, "users"), where("uid", "==", followingId));
                //         const dataFollowing = [];
                //         getDocs(q).then(result => {
                //             result.forEach((doc) => {
                //                 const following = {
                //                     uid: followingId,
                //                     name: doc.data().name,
                //                     avatar: doc.data().imgURL
                //                 }
                //                 dataFollowing.push(following);
                //                 setFollowing(dataFollowing);
                //             })
                //         })
                //     }
                // }

                // //pega os dados de quem está seguindo este user
                // if (followers) {
                //     for (const followerId of followers) {
                //         const q = query(collection(db, "users"), where("uid", "==", followerId));
                //         const dataFollowers = [];
                //         getDocs(q).then(result => {
                //             result.forEach((doc) => {
                //                 const follower = {
                //                     uid: followerId,
                //                     name: doc.data().name,
                //                     avatar: doc.data().imgURL
                //                 }
                //                 dataFollowers.push(follower);
                //                 setFollowers(dataFollowers);
                //             })
                //         })
                //     }
                // }

                if (name) {
                    break
                }
            }

        } catch (error) {
            console.log(error);
        }

        // //get name e foto de user que o user logado está seguindo
        // const dataFollowing = [];
        // for (const followingId of following) {
        //     const q = query(collection(db, "users"), where("uid", "==", followingId));
        //     const querySnapshot = await getDocs(q);
        //     querySnapshot.forEach((doc) => {
        //         const following = {
        //             uid: followingId,
        //             name: doc.data().name,
        //             avatar: doc.data().imgURL
        //         }
        //         dataFollowing.push(following);
        //     })
        // }
        // setFollowing(dataFollowing);

        // //get name e foto de user que quem está seguindo user logado
        // const dataFollowers = [];
        // for (const followerId of followers) {
        //     const q = query(collection(db, "users"), where("uid", "==", followerId));
        //     const querySnapshot = await getDocs(q);
        //     querySnapshot.forEach((doc) => {
        //         const follower = {
        //             uid: followerId,
        //             name: doc.data().name,
        //             avatar: doc.data().imgURL
        //         }
        //         dataFollowers.push(follower);
        //     })
        // }
        // setFollowing(dataFollowers);

        const userPosts = posts.filter(post => post.user_id === uid);
        console.log(userPosts);
        setUposts(userPosts);
        console.log(userPosts);

        // const secondq = query(collection(db, "post"), where("uid", "==", uid));
        // const secondquerySnapshot = await getDocs(secondq);
        // const d = [];
        // try {
        //     secondquerySnapshot.forEach((doc) => {
        //         const posts = {
        //             eid: doc.id,
        //             euid: doc.data().uid,
        //             etitle: doc.data().title,
        //             econtent: doc.data().content,
        //             econtentImg: doc.data().imgContent,
        //             ecategory: doc.data().category,
        //             elikes: doc.data().likes
        //         }

        //         // console.log('logando pela query para pegar post/ getUserId: ', posts);
        //         d.push(posts);
        //     });

        //     setUposts(d);
        //     // console.log('logando estados posts/ fun getUserId: ', uposts);

        // } catch (error) {
        //     console.log(error);
        // }
    }

    // que pegue todos os users da coleção para rederiza-los no filtro de busca  
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
                d.push(userObj);
            });

            setUsers(d);

        } catch (error) {
            console.log(error);
        }

    }

    //pega as informações de perfil de um user especifico para renderizar informações de perfil (nome, foto e bio) 
    // que pegue posts de um usuario especifico passando seu uid 
    const getExternalUser = (exuid) => {

        const ExternalUser = users.filter(user => user.euid === exuid);
        console.log(ExternalUser);
        setEuser(ExternalUser);
        console.log('state', ExternalUser)

        const userPosts = posts.filter(post => post.user_id === exuid);
        console.log(userPosts);
        setEposts(userPosts);
        console.log('state', eposts);

        // const q = query(collection(db, "users"), where("uid", "==", euid));
        // const querySnapshot = await getDocs(q);

        // querySnapshot.forEach((doc) => {
        //     // const following = doc.data().following
        //     // const followers = doc.data().followers

        //     const user = {
        //         // id: doc.id,
        //         name: doc.data().name,
        //         bio: doc.data().userBio,
        //         avatar: doc.data().imgURL,
        //         // following: following ? following : false,
        //         // followers: followers ? followers : false
        //     }

        //     // // pega os dados de quem este user está seguindo
        //     // if (user.following) {
        //     //     for (const followingId of user.following) {
        //     //         const q = query(collection(db, "users"), where("uid", "==", followingId));
        //     //         const dataFollowing = [];
        //     //         getDocs(q).then(result => {
        //     //             result.forEach((doc) => {
        //     //                 const following = {
        //     //                     uid: followingId,
        //     //                     name: doc.data().name,
        //     //                     avatar: doc.data().imgURL
        //     //                 }
        //     //                 dataFollowing.push(following);
        //     //                 user.following = dataFollowing;
        //     //             })
        //     //         })
        //     //     }
        //     // }

        //     // //pega os dados de quem está seguindo este user
        //     // if (user.followers) {
        //     //     for (const followerId of user.followers) {
        //     //         const q = query(collection(db, "users"), where("uid", "==", followerId));
        //     //         const dataFollowers = [];
        //     //         getDocs(q).then(result => {
        //     //             result.forEach((doc) => {
        //     //                 const follower = {
        //     //                     uid: followerId,
        //     //                     name: doc.data().name,
        //     //                     avatar: doc.data().imgURL
        //     //                 }
        //     //                 dataFollowers.push(follower);
        //     //                 user.followers = dataFollowers;
        //     //             })
        //     //         })
        //     //     }
        //     // }

        //     // dataUser.push(user);
        //     setEuser(user);
        //     console.log(euser);
        // });

    }

    // const addFollowing = async (euid) => {
    //     //atualizando doc do usuário logado adicionando em um array (following) o uid que que ele quer seguir
    //     try {
    //         await updateDoc(doc(db, "users", id), {
    //             following: arrayUnion(euid)
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }

    //     //para adicionar o uid do usuário logado aos dados do user a quem ele está seguindo
    //     const q = query(collection(db, "users"), where("uid", "==", euid));
    //     const querySnapshot = await getDocs(q);
    //     let eid = '';
    //     querySnapshot.forEach((doc) => {
    //         eid = doc.id
    //     });
    //     //atualizando doc do usuário de quem o usuário logado quer seguir, adicionando uid do logged user a um array (followers)
    //     try {
    //         await updateDoc(doc(db, "users", eid), {
    //             followers: arrayUnion(uid)
    //         });
    //     } catch (error) {
    //         console.log(error)
    //     }

    //     getExternalUser(euid);
    // }

    // const removeFollowing = async (euid) => {
    //     // const other = { euid: euid, ename: name, eimg: photoURL }
    //     await updateDoc(doc(db, "users", id), {
    //         following: arrayRemove(euid)
    //     });

    //     //para remover o uid do usuário logado dos dados do user a quem ele está seguindo
    //     const q = query(collection(db, "users"), where("uid", "==", euid));
    //     const querySnapshot = await getDocs(q);
    //     let eid = '';
    //     querySnapshot.forEach((doc) => {
    //         eid = doc.id
    //     });
    //     //atualizando doc do usuário de quem o usuário logado quer seguir, removendo uid do logged user do array (followers)
    //     // const me = { uid: uid, uname: name, uimg: imgUrl }
    //     await updateDoc(doc(db, "users", eid), {
    //         followers: arrayRemove(uid)
    //     });

    //     getExternalUser(euid);
    // }

    // const getExternalPost = async (exuid) => {

    //     const externalUserPosts = posts.filter(post => post.user_id === exuid);
    //     console.log(externalUserPosts);
    //     setUposts(externalUserPosts);


    //     // const q = query(collection(db, "post"), where("uid", "==", exuid));
    //     // const querySnapshot = await getDocs(q);
    //     // const dataPost = []
    //     // querySnapshot.forEach((doc) => {
    //     //     const post = {
    //     //         eid: doc.id,
    //     //         euid: doc.data().uid,
    //     //         etitle: doc.data().title,
    //     //         econtent: doc.data().content,
    //     //         econtentImg: doc.data().imgContent,
    //     //         ecategory: doc.data().category,
    //     //         elikes: doc.data().likes
    //     //     }
    //     //     dataPost.push(post);
    //     //     setEposts(dataPost);
    //     // })
    // }

    //FUNÇÃO PARA CADASTRO COM O AUTHENTICATED E FIRESTORE

    const registerWithEmailAndPassword = async (name, email, password) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);

            // sendEmailVerification(res.user, )
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
    //excluir todas as instancias desse usuarios, como os post
    const revomeUser = () => {

        deleteUser(user).then(() => {
            console.log('usuário deletado: AUTH');
        }).catch((error) => {
            console.log(error, ': AUTH');
        });

        try {
            deleteDoc(doc(db, 'users', id)).then(() => {
                console.log('usuário deletado: DB')
            })
        } catch (err) {
            console.error(err);
            alert(err.message);
        }

        try {
            const secondq = query(collection(db, "post"), where("uid", "==", uid));
            getDocs(secondq).then(res => {
                res.forEach((doc) => {
                    deleteDoc(doc(db, 'post', doc.id));
                })
            }).then(() => {
                console.log('posts do usuário deletado: DB')
            })
        } catch (error) {
            console.log(error);
        }

        getUsers();
    }

    //FUNÇÕES DE LOGIN, LOGIN COM GOOGLE E LOGOUT
    const logInWithEmailAndPassword = async (email, password) => {
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);

            res.user ? navigate('explore') : navigate('/login');
            // navigate('/explore');
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

    const updateUserPassword = async (email) => {
        // const q = query(collection(db, "users"), where("email", "==", email));
        // const querySnapshot = await getDocs(q);
        // let validEmail = '';
        // querySnapshot.forEach((doc) => {
        //     validEmail = doc.data().email
        // });
        // if(validEmail){
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('E-mail de redefinição de senha enviado');
                navigate('/config');
            })
        // }else {
        //     alert('Coloque um e-mail cadastrado')
        // }
    }

    /* ================================
        FUNÇÕES PARA OS POSTS 
    =================================== */

    // FUNÇÃO DE CADASTRO DE POST 
    const registerPost = async (title, content, cat, img_content) => {
        try {
            const createdPost = await addDoc(collection(db, "post"), {
                uid: user?.uid,
                userPhoto: user?.photoURL ? user?.photoURL : null,
                name: name,
                title: title,
                content: content,
                category: cat,
                imgContent: img_content ? img_content : null,
                likes: 0
            });

            registerReview(
                createdPost.id,
                uid,
                user?.photoURL ? user?.photoURL : null,
                img_content ? img_content : null,
                name,
                title,
                content,
                cat
            );


            getPosts();
            getReviews();
            alert('Flashcard e revisão criados!');
        } catch (err) {
            console.log(err)
        }

    }

    // que pegue todos os posts da tabela para renderizar no explore 
    const getPosts = async () => {
        const querySnapshot = await getDocs(collection(db, "post"));
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
                likes: doc.data().likes
            }
            d.push(post);
        });

        if (d) {
            setPosts(d);
        }
    }

    //FUNÇÃO DE DELETAR POST
    const deletePost = async (postId) => {
        await deleteDoc(doc(db, 'post', postId));
        // navigate('/explore');
        getPosts();
        getUserId();
    }

    //FUNÇÃO DE ATUALIZAR POST
    const updatePost = (postId, title, cat, content, img_content) => {
        try {
            updateDoc(doc(db, 'post', postId), {
                title: title,
                category: cat,
                content: content,
                imgContent: img_content,
            })
            getUserId();
            alert('mudança no post feita')
        } catch (error) {
            console.log(error)
        }

        console.log('post atualizado');
        getPosts();
        getUserId();
    }

    //para adicionar adicionar 1 like no post
    const addLikePost = async (postId) => {
        await updateDoc(doc(db, "post", postId), {
            likes: +1
        })
        getReviews();
    }
    //para remover 1 like no post
    const removeLikePost = async (postId) => {
        await updateDoc(doc(db, "post", postId), {
            likes: -1
        });
        getReviews();
    }


    /* ================================
        FUNÇÕES PARA AS REVISÕES 
    =================================== */

    //cadastro de revisão
    const registerReview = async (postId, euid, userPhoto, imgContent, user_name, title, content, category) => {

        // neste caso ele é registrado no banco primeiramente com uma data que conta 5 horas a partir do momento instanciado
        // const futureDate = moment().add(1, 'm').format('YYYY-M-D');
        const futureDate = moment();
        // console.log('before manipulation', futureDate.format('DD-MM-YYYY HH:mm').toString());
        futureDate.add(5, 'h');
        // console.log('after manipulation', futureDate.format('DD-MM-YYYY HH:mm').toString());

        //o moment pode pegar uma data q passar, basta apenas especificar qual seu formato, use o boolean para strict-mode
        // moment("20-10-2010 4:30",       "DD-MM-YYYY HH:mm", true); //OU:
        // moment('24/12/2019 09:15', "DD MM YYYY hh:mm", true);

        // ao enviar dados do firebase para a função que recebe a date como string, transforma em timestamp, altera, e retorna
        try {
            await addDoc(collection(db, "revision"), {
                postId: postId,
                uid: euid,
                userAdded: uid,
                userPhoto: userPhoto ? userPhoto : false,
                imgContent: imgContent ? imgContent : false,
                name: user_name,
                title: title,
                content: content,
                category: category,
                futureDate: futureDate.format('DD-MM-YYYY HH:mm').toString(),
                counter: 0
            });

            getReviews();
            getPosts();
            alert('Post adicionado nas revisões!');
        } catch (err) {
            console.log(err)
        }

    }

    //para deletar revisão
    const removeReview = async (postId) => {
        const q = query(collection(db, "revision"), where('postId', '==', postId));
        const querySnapshot = await getDocs(q);
        let eid = ''
        querySnapshot.forEach((doc) => {
            eid = doc.id
        })
        deleteDoc(doc(db, 'revision', eid));
        alert('revisão deletada');
        getReviews();
        getPosts();
    }

    // que pegue todos as reviews da tabela para renderizar na rota review de acordo com sua data certa
    const getReviews = async () => {
        {/* teste para renderizar reviews de tempos em tempos */ }
        //para isso a query seria 

        // pegue todas as revisoes do usuário logado
        const q = query(collection(db, "revision"), where('userAdded', '==', uid));
        const querySnapshot = await getDocs(q);
        const d = []

        querySnapshot.forEach((doc) => {
            //para cada revisão pegue a data do documento para fazer comparação
            // console.log('getting futureDate/ getReviews: ', doc.data().futureDate);
            const currentMoment = doc.data().futureDate;
            // console.log('data vinda do db: ', currentMoment);
            //transformando numa instancia de tempo
            const a = moment(currentMoment, "DD-MM-YYYY HH:mm", true);
            // console.log('data vinda do db transformada em obj moment: ', a);
            //instanciando um momento atual para fazer comparações:
            const currentDate = moment();
            //se a data desse doc for anterior a atual ou a mesma que a atual, pegue os dados desse doc e coloque em reviews
            // if (a.isBefore(currentDate) || a.isSame(currentDate) ) {
            if (!a.isAfter(currentDate)) {
                const review = {
                    id: doc.id,
                    postId: doc.data().postId,
                    userAdded: doc.data().userAdded,
                    uid: doc.data().uid,
                    userPhoto: doc.data().userPhoto,
                    imgContent: doc.data().imgContent,
                    name: doc.data().name,
                    title: doc.data().title,
                    content: doc.data().content,
                    category: doc.data().category,
                    futureDate: doc.data().futureDate,
                    counter: doc.data().counter
                }

                d.push(review);
            }
        });

        if (d) {
            setReviews(d);
        }
        if (reviews.length >= 5) {
            setNotificatio(true);
        }

        // ai no caso é só apenas renderizar na rota as reviews o que vier
        // se os reviews.lenght for >= 10 bolinha de aviso active

    }

    //TODO -> FUNÇÃO PARA ATUALIZAR DATA DE REVISÃO
    const updateReview = async (reviewId, newDate, counter) => {

        // ao clicar no btn já revisei a revisao é atualizada para uma nova data de revisao e um novo contador
        try {
            await updateDoc(doc(db, 'revision', reviewId), {
                futureDate: newDate,
                counter: counter
            })
            getReviews();
        } catch (error) {
            console.log(error)
        }
    }


    //INSTANCIA COSTUMER CONTEXT SENDO RETORNADA NO COMPONENTE PASSANDO PARA O SEU PROVEDOR AS FUNÇÕES CRUD, LOGIN E LOGOUT
    return (
        <CostumerContext.Provider value={{
            user, uid, id, imgUrl, bios, categorys, uposts, followers, following, euser, users,
            eposts, posts,
            reviews, notification,

            registerWithEmailAndPassword, logInWithEmailAndPassword, signInWithGoogle, logout,

            getExternalUser, getUsers, getUserId, updateUserProfile, revomeUser,
            // addFollowing, removeFollowing,

            getPosts, registerPost, updatePost, deletePost, addLikePost, removeLikePost,
            // getExternalPost, 

            registerReview, getReviews, updateReview, removeReview
        }}>
            {children}
        </CostumerContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(CostumerContext);
};