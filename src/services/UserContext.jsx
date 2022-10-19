import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc, getDoc, setDoc, getDocFromServer, query, where } from "firebase/firestore";
import { db, app } from './Banco';
// import   from './Banco';

//instanciado um objeto com o Hook do react createContext
export const CostumerContext = createContext();
//referenciando a coleção do banco de dados a ser usada
const collectionRef = collection(db, 'users');

const provider = new GoogleAuthProvider();
const auth = getAuth(app);


export const CostumerProvider = ({ children }) => {
    //instanciado um navigate para navegação de rotas
    const navigate = useNavigate();

    //criado estados
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [submiting, setSubmiting] = useState(null);

    const [users, setUsers] = useState(null);

    const [image, setImage] = useState(null);
    const [bios, setBios] = useState('');
    const [studentProfessor, setStudentProfessor] = useState('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);

    //Ao renderizar meu componente, verifica se há algum usuário logado, pegando os item do localstorage e os validando
    useEffect(
        () => {
            //pego devolta o user do localStorage
            const recoveredToken = localStorage.getItem('@google:token');
            const recoveredGoggleUser = localStorage.getItem('@google:user');
            const recoveredUser = localStorage.getItem('user');

            //(com a fun if dessa maneira consigo validar o que esta no seu parametro), se é valido seto o usuario novamente
            if (recoveredGoggleUser && recoveredToken) {
                setUser(JSON.parse(recoveredGoggleUser));
                setToken(JSON.parse(recoveredToken));
                //navegue para a home
                navigate('/');
            }
            if (recoveredUser) {
                setUser(JSON.parse(recoveredUser));
                navigate('/');
            }
            //quando o validar os itens, set o carregamento da info (loading) para false
            setLoading(false);
        },
        []
    );

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
    const addUser = async ({ name, email, password }) => {
        setSubmiting(true);
        const user = await addDoc(collectionRef, {
            name,
            email,
            password
        });
        console.log("usuario cadastrado", user);
        setSubmiting(false)
    }

    //função para atualizar um usuário na coleção user
    const updateUser = async (id) => {
        const userSelected = doc(db, 'users', id);

        if (userSelected) {
            try {
                await updateDoc(userSelected, {
                    avatar: image,
                    biosDB: bios,
                    studentProfessorDB: studentProfessor
                });
                console.log('usuario atualizado');
            } catch (error) {
                console.log(error, error.message);
            }
        }

        return;
    }

    //função para deletar um usuário na coleção user
    const removeUser = async (id) => {
        const userDeleted = doc(db, 'users', id);
        await deleteDoc(userDeleted);
        console.log("usuario deletado");
    }

    //FUNÇÕES DE LOGIN E LOGOUT

    const login = async ({ email, password }) => {
        // Create a reference to the users collection
        const usersRef = collection(db, "users");

        // Create a query against the collection.
        const userQuery = query(usersRef, where("email", "==", email), where("password", "==", password));
        
        const querySnapshot = await getDocs(userQuery);

        if(!querySnapshot){
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
            navigate('/config');
        } else {
            alert("Email ou senha incorretos!!!")
        }
    }

    const loginGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const userG = result.user;
                console.log(userG);
                setUser(userG);
                localStorage.setItem('@google:user ', JSON.stringify(user));
                localStorage.setItem('@google:token ', token);
                navigate('/config');
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log(errorCode, errorMessage, email, credential);
            });
    }

    const logout = () => {
        if (user) {
            setUser(null);
            localStorage.removeItem('user');
            localStorage.removeItem('@google:user ');
            localStorage.removeItem('@google:token ');
            //navegue para página pública inicial
            navigate('/login');
        }
    };


    //INSTANCIA COSTUMER CONTEXT SENDO RETORNADA NO COMPONENTE PASSANDO PARA O SEU PROVEDOR AS FUNÇÕES CRUD, LOGIN E LOGOUT
    return (
        <CostumerContext.Provider value={{ authenticated: !!user, user, token, addUser, updateUser, removeUser, login, loginGoogle, logout, loading, submiting }}>
            {children}
        </CostumerContext.Provider>
    )
}

