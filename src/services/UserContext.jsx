// HOOKS AND LIBS
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// auth:
import { GoogleAuthProvider, signInWithPopup, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, onAuthStateChanged, updateProfile, updatePassword, sendEmailVerification, updateEmail, deleteUser, reauthenticateWithCredential } from "firebase/auth";
// firestore: 
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc, getDoc, query, where } from "firebase/firestore";

// ARCHIVES FROM PROJECT
import { db, auth, provider } from './Banco';

//instanciado um objeto com o Hook do react createContext
export const CostumerContext = createContext();
//referenciando a coleção do banco de dados a ser usada
const collectionRef = collection(db, 'users');

export const CostumerProvider = ({ children }) => {
    //states
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [id, setId] = useState('');
    const [bios, setBios] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const [loader, setLoader] = useState(false);

    //instanciado um navigate para navegação de rotas
    const navigate = useNavigate();

    // //BUSCAR ATUAL USUÁRIO AUTENTICADO QUANDO RENDERIZADO A PÁGINA
    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //         setUser(currentUser);
    //         setToken(user?.getIdToken());
    //         fetchId();
    //     });
    //     // return () => {
    //     unsubscribe();
    //     // };
    // }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setUid(currentUser.uid);
            // setToken(user?.getIdToken());
            // getUserData(user?.uid);
            getUserId();
        });
        return () => {
            unsubscribe();
        }
    }, [user]);

    // functions 
    const getUserId = async () => {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));

        const querySnapshot = await getDocs(q);

        for (var i in querySnapshot.docs) {
            const doc = querySnapshot.docs[i]
            setId(doc.id);
            setName(doc.data().name);
            if (name) {
                break
            }
        }
        // querySnapshot.forEach((doc) => {
        //     setId(doc.id);
        //     setName(doc.data().name);

        // });
    }
    
    const fetchId = async () => {
        const q = query(collectionRef, where("uid", "==", user?.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setId(doc.id);
            console.log(id);
        });
    }

    // auth functions 
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

    const revomeUser = () => {
        setLoader(true)
        deleteUser(user).then(() => {
            // User deleted.
            console.log('usuário deletado');
        }).catch((error) => {
            // An error ocurred
            console.log(error);
        });
        setLoader(false)
    }

    //FUNÇÕES DE LOGIN E LOGOUT
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

    const logout = () => {
        signOut(auth);
        setUser(null);
        setAuthenticated(false);
        navigate('/');
    };

    //FUNÇÕES DE ATUALIZAÇÃO
    const updateUserProfile = (imgURL, name_user, bios_user, categorys) => {

        updateDoc(doc(db, "users", id), {
            userBio: bios_user,
            userCategorys: categorys
        })
            .then(docRef => {
                console.log(docRef, 'atualização com query');
                setBios(bios_user);
            }).catch((error) => {
                console.log('updateDoc error: ', error)
            });

        try {
            updateProfile(user, {
                displayName: name_user,
                photoURL: imgURL
            })
        } catch (error) {
            console.log(error)
        }
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
                return true;
            }).catch((error) => {
                console.log(error);
                return false;
            })
    }


    //INSTANCIA COSTUMER CONTEXT SENDO RETORNADA NO COMPONENTE PASSANDO PARA O SEU PROVEDOR AS FUNÇÕES CRUD, LOGIN E LOGOUT
    return (
        <CostumerContext.Provider value={{ authenticated, user, token, bios, registerWithEmailAndPassword, updateUserProfile, updateUserEmail, revomeUser, logInWithEmailAndPassword, signInWithGoogle, logout, verifiedUserEmail }}>
            {children}
        </CostumerContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(CostumerContext);
};