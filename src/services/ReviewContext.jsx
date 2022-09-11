// import React, { createContext, useState, useEffect } from 'react';

// import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
// import db  from './Banco';

// //instanciado um objeto com o Hook do react createContext
// export const ReviewContext = createContext();
// //referenciando a coleção do banco de dados a ser usada
// const collectionRef = collection(db, 'reviews');

// export const PostProvider = ({ children }) => {

//     //criado estados
//     const [reviews, setReviews] = useState(null);
//     const [post, setPosts] = useState(null);
//     const [verifided, setVerifided] = (false);
//     const [reviewed, setReviewed] = (0);
    
//     const [loading, setLoading] = useState(true);

//     //Ao renderizar meu componente, traga junto os meus dados do banco
//     useEffect(() => {
//         getPosts();
//     },
//         []
//     );

//     //função para pegar os posts do banco da coleção posts
//     function getReview() {
//         getDocs(collectionRef)
//             .then(response => {
//                 const reviewsDB = response.docs.map(doc => (
//                     {
//                         data: doc.data(),
//                         userDB: doc.data().user,
//                         contentDB: doc.data().content,
//                         categoryDB: doc.data().category,
//                         likesDB: doc.data().likes,
//                         id: doc.id
//                     }))
//                 setReviews(reviewsDB);
//             })
//             .catch(error => { console.log(error.message) })
//     }

//     //função para cadastrar um post na coleção posts
//     const addPost = async () => {
//         const post = await addDoc(collectionRef, {
//             content,
//             user,
//             category
//         });
//         console.log("post cadastrado", post);
//     }

//     //função para atualizar um post na coleção posts
//     const updatePost = async (id) => {
//         const postSelected = doc(db, 'users', id);

//         if (postSelected) {
//             try {
//                 await updateDoc(postSelected, {
//                     verifidedDB: verifided,
//                     reviewedDB: reviewed,
//                     likesDB: likes 
//                 });
//                 console.log('post atualizado');
//             } catch (error) {
//                 console.log(error, error.message);
//             }
//         }

//         return;
//     }

//     //função para deletar um post na coleção posts
//     const removePost = async (id) => {
//         const userDeleted = doc(db, 'users', id);
//         await deleteDoc(userDeleted);
//         console.log("usuario deletado");
//     }


//     //INSTANCIA COSTUMER CONTEXT SENDO RETORNADA NO COMPONENTE PASSANDO PARA O SEU PROVEDOR AS FUNÇÕES CRUD
//     return (
//         <PostsContext.Provider value={{ posts, addPost, updatePost, removePost, loading }}>
//             {children}
//         </PostsContext.Provider>
//     )
// }

