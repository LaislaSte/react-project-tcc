import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { GoogleAuthProvider, signInWithPopup, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, onAuthStateChanged, updateProfile, updatePassword, sendEmailVerification, updateEmail, deleteUser, reauthenticateWithCredential } from "firebase/auth";

import { db, auth, provider } from './Banco';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc, getDoc, query, where } from "firebase/firestore";

//instanciado um objeto com o Hook do react createContext
export const CostumerContext = createContext();
//referenciando a coleção do banco de dados a ser usada
const collectionRef = collection(db, 'users');

// const provider = new GoogleAuthProvider();
// const auth = getAuth(app);


export const CostumerProvider = ({ children }) => {
    //instanciado um navigate para navegação de rotas
    const navigate = useNavigate();

    //criado estados
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);

    // const [users, setUsers] = useState(null);
    const [token, setToken] = useState(null);
    const [id, setId] = useState('');
    const [submiting, setSubmiting] = useState(null);
    const [loading, setLoading] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);


    const [image, setImage] = useState(null);
    const [bios, setBios] = useState('');
    const [name, setName] = useState('');


    //Ao renderizar meu componente, verifica se há algum usuário logado, pegando os item do localstorage e os validando
    // useEffect(
    //     () => {
    //         //pego devolta o user do localStorage
    //         const recoveredToken = localStorage.getItem('@google:token');
    //         const recoveredGoggleUser = localStorage.getItem('@google:user');
    //         const recoveredUser = localStorage.getItem('user:');

    //         //(com a fun if dessa maneira consigo validar o que esta no seu parametro), se é valido seto o usuario novamente
    //         if (recoveredGoggleUser && recoveredToken) {
    //             setUser(JSON.parse(recoveredGoggleUser));
    //             setToken(JSON.parse(recoveredToken));
    //             setAuthenticated(true);
    //             //navegue para a home
    //             navigate('/');
    //         }
    //         if (recoveredUser) {
    //             setUser(JSON.parse(recoveredUser));
    //             setAuthenticated(true);
    //             navigate('/');
    //         }
    //         //quando o validar os itens, set o carregamento da info (loading) para false
    //         setLoading(false);
    //     },
    //     []
    // );

    // function getUserData(uid) {
    //     db.ref('users/' + uid).once("value", snap => {
    //         console.log(snap.val())
    //     })
    // }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser);
            setUser(currentUser);
            setToken(user?.getIdToken());
            console.log(currentUser);
            // getUserData(user?.uid);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const registerWithEmailAndPassword = async (name, email, password) => {
        setLoading(true);
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const user = res.user;
            await addDoc(collection(db, "users"), {
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

        setLoading(false);
    };

    const fetchUserName = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            console.log(data);
            setName(data.name);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };

    const revomeUser = () => {
        deleteUser(user).then(() => {
            // User deleted.
            console.log('usuário deletado');
        }).catch((error) => {
            // An error ocurred
            console.log(error);
        });
    }

    //FUNÇÕES DE LOGIN E LOGOUT

    const logInWithEmailAndPassword = async (email, password) => {
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            localStorage.setItem('@userLogedWithEmailAndPassword', JSON.stringify(res.user));
            localStorage.setItem('@userLogedWithEmailAndPasswordId', JSON.stringify(res.providerId));

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

                const q = query(collection(db, "users"), where("uid", "==", userGoogle.uid));
                const docs = getDocs(q);
                if (docs.docs.length === 0) {
                    addDoc(collection(db, "users"), {
                        uid: user.uid,
                        name: user.displayName,
                        authProvider: "google",
                        email: user.email,
                    });
                }

                console.log(userGoogle);
                setUser(userGoogle);
                localStorage.setItem('@google:user', JSON.stringify(user));
                localStorage.setItem('@google:token', token);
                navigate('/explore');
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log(errorCode, errorMessage, email, credential);
            });
    }

    const sendPasswordReset = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
            alert("Password reset link sent!");
            navigate('/login');
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    const logout = () => {
        signOut(auth);
        setUser(null);
        setAuthenticated(false);
        localStorage.removeItem('user');
        localStorage.removeItem('@google:user');
        localStorage.removeItem('@google:token');
        //navegue para página pública inicial/public
        navigate('/');
    };

    //função para atualizar um usuário na coleção user
    const updateUserProfile = async (imgURL, name_user, bios_user, categorys) => {
        console.log(imgURL);
        console.log(name_user);
        console.log(bios_user);
        console.log(categorys);

        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {

                console.log(doc.id);
                setId(doc.id);
                console.log(id);
            });

            const docRef = doc(db, "users", id);
            const data = {
                userBio: bios_user,
                userCategorys: categorys
            }
            updateDoc(docRef, data)
                .then(docRef => {
                    console.log(docRef, 'atualização com query');
                }).catch((error) => {
                    console.log('updateDoc error: ', error)
                });

        } catch (error) {
            console.log(error)
        }

    }

    const getUserId = async () => {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setId(doc.id);
                setName(doc.name);

            });
    }

    const sendPost = async (title, content, cat) => {

        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name: name,
            userID: id,
            authProvider: "local",
            title: title,
            content: content,
            category: cat
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

    const verifiedUserEmail = () => {
        sendEmailVerification(user)
            .then((result) => {
                // Email verification sent!
                console.log('e-mail de verificação enviado', result);
                return 'success';
            }).catch((error) => {
                console.log(error);
                return 'failed';
            })
    }


    const reathenticateUserCredentials = () => {
        // TODO(you): prompt the user to re-provide their sign-in credentials
        // const credential = promptForCredentials();

        // reauthenticateWithCredential(user, credential).then(() => {
        //     // User re-authenticated.
        //     console.log('feita reautenticação');
        // }).catch((error) => {
        //     // An error ocurred
        //     console.log(error);
        // });
    }


    //INSTANCIA COSTUMER CONTEXT SENDO RETORNADA NO COMPONENTE PASSANDO PARA O SEU PROVEDOR AS FUNÇÕES CRUD, LOGIN E LOGOUT
    return (
        <CostumerContext.Provider value={{ authenticated, user, token, registerWithEmailAndPassword, updateUserProfile, updateUserEmail, revomeUser, logInWithEmailAndPassword, signInWithGoogle, logout, sendPasswordReset, verifiedUserEmail, reathenticateUserCredentials, name }}>
            {children}
        </CostumerContext.Provider>
    )
}

