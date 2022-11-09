import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";

import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db, auth, provider } from './Banco';

const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, provider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });

            //         setUser(user);
            //         localStorage.setItem('@google:user', JSON.stringify(user));
            //         localStorage.setItem('@google:token', token);
            //         navigate('/explore');
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

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

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const logout = () => {
    signOut(auth);
};

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

//Ao renderizar meu componente, traga junto os meus dados do banco
// useEffect(() => {
//     getUsers();
// },
//     []
// );


export {
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
};