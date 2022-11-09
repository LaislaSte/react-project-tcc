import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { GoogleAuthProvider, signInWithPopup, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";

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
    const [token, setToken] = useState(null);
    const [submiting, setSubmiting] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);

    // const [currentUser, setCurrentUser] = useState(null);
    const [modal, setModal] = useState({ isOpen: false, title: '', content: '' });

    // const [users, setUsers] = useState(null);

    const [image, setImage] = useState(null);
    const [bios, setBios] = useState('');
    const [name, setName] = useState('');

    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser);
            setUser(currentUser);
            console.log('user status changed: ', currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    //Ao renderizar meu componente, traga junto os meus dados do banco
    // useEffect(() => {
    //     getUsers();
    // },
    //     []
    // );

    //função para pegar os usuários do banco da coleção user
    // function getUsers() {
    //     getDocs(collectionRef)
    //         .then(response => {
    //             const usersDB = response.docs.map(doc => (
    //                 {
    //                     data: doc.data(),
    //                     nameDB: doc.data().nome,
    //                     emailDB: doc.data().email,
    //                     passwordDB: doc.data().password,
    //                     id: doc.id
    //                 }))
    //             setUsers(usersDB);
    //         })
    //         .catch(error => { console.log(error.message) })
    // }

    //função para cadastrar um usuário na coleção user

    // const addUser = async ({ name, email, password }) => {
    //     setSubmiting(true);
    //     const user = await addDoc(collectionRef, {
    //         name,
    //         email,
    //         password
    //     });
    //     console.log("usuario cadastrado", user);
    //     setSubmiting(false)
    // }

    const registerWithEmailAndPassword = async (name, email, password) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const user = res.user;
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name,
                password,
                authProvider: "local",
                email,
            });
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
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

    //função para deletar um usuário na coleção user
    const removeUser = async (id) => {
        const userDeleted = doc(db, 'users', id);
        await deleteDoc(userDeleted);
        console.log("usuario deletado");
    }

    //FUNÇÕES DE LOGIN E LOGOUT

    const logInWithEmailAndPassword = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    // const signInWithGoogle = async () => {
    //     try {
    //         const res = await signInWithPopup(auth, provider);
    //         const user = res.user;
    //         const q = query(collection(db, "users"), where("uid", "==", user.uid));
    //         const docs = await getDocs(q);
    //         if (docs.docs.length === 0) {
    //             await addDoc(collection(db, "users"), {
    //                 uid: user.uid,
    //                 name: user.displayName,
    //                 authProvider: "google",
    //                 email: user.email,
    //             });
    //         }
    //         setAuthenticated(true);
    //         localStorage.setItem('@google:user', JSON.stringify(user));
    //         localStorage.setItem('@google:token', token);
    //         navigate('/explore');
    //     } catch (err) {
    //         console.error(err);
    //         alert(err.message);
    //     }
    // };

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
                setAuthenticated(true);
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
        localStorage.removeItem('@google:user ');
        localStorage.removeItem('@google:token ');
        //navegue para página pública inicial
        navigate('/login');
    };

    // Você pode atualizar as informações básicas do perfil de um usuário — o nome de exibição do usuário e o URL da foto do perfil — com o método updateProfile . Por exemplo:
    //função para atualizar um usuário na coleção user
    const updateUser = (img_user, bios_user, name_user, favCategory_user) => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user.uid));
            const docs = getDocs(q);
            if (docs.docs.length === 0) {
                updateDoc(collection(db, "users"), {
                    uid: user.uid,
                    name: user.displayName,
                    authProvider: "google",
                    email: user.email,
                    bios: bios_user,
                    userName: name_user,
                    avatar: img_user
                });
                console.log('user updated');
            }

        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    }


    //INSTANCIA COSTUMER CONTEXT SENDO RETORNADA NO COMPONENTE PASSANDO PARA O SEU PROVEDOR AS FUNÇÕES CRUD, LOGIN E LOGOUT
    return (
        <CostumerContext.Provider value={{ authenticated, user, token, registerWithEmailAndPassword, updateUser, removeUser, logInWithEmailAndPassword, signInWithGoogle, logout, sendPasswordReset, submiting, name, modal, setModal }}>
            {children}
        </CostumerContext.Provider>
    )
}

