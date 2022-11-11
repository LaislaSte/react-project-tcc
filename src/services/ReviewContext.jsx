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
//     const addPost = async (content, user, category, newData) => {
//         const post = await addDoc(collectionRef, {
//             content,
//             user,
//             category
//         });
//         console.log("post cadastrado", post);
//     }

// Carimbo de data e hora do servidor
// Você pode definir um campo em seu documento para um carimbo de data/hora do servidor que rastreia quando o servidor recebe a atualização:
// import { updateDoc, serverTimestamp } from "firebase/firestore";

// const docRef = doc(db, 'objects', 'some-id');

// // Update the timestamp field with the value from the server
// const updateTimestamp = await updateDoc(docRef, {
//     timestamp: serverTimestamp()
// });


// Incrementar um valor numérico
// Você pode aumentar ou diminuir um valor de campo numérico conforme mostrado no exemplo a seguir. Uma operação de incremento aumenta ou diminui o valor atual de um campo pelo valor fornecido.

// Observação: se o campo não existir ou se o valor do campo atual não for um valor numérico, a operação definirá o campo para o valor fornecido.

// import { doc, updateDoc, increment } from "firebase/firestore";

// const washingtonRef = doc(db, "cities", "DC");

// // Atomically increment the population of the city by 50.
// await updateDoc(washingtonRef, {
//     population: increment(50)
// });

// https://firebase.google.com/docs/firestore/solutions/counters





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

