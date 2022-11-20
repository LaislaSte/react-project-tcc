import React, { createContext, useState, useEffect, useContext } from 'react';

import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc, query, where, setDoc } from "firebase/firestore";
import { auth, db } from './Banco';

import { CostumerContext } from '../services/UserContext';
import { updateCurrentUser } from 'firebase/auth';

//instanciado um objeto com o Hook do react createContext
export const PostsContext = createContext();
//referenciando a coleção do banco de dados a ser usada
const collectionRef = collection(db, 'posts');

export const PostProvider = ({ children }) => {

    //criado estados
    // const [posts, setPosts] = useState(null);
    const [post, setPost] = useState(null);
    // const [likes, setLikes] = (null);

    const [loading, setLoading] = useState(true);

    const { user, name, id } = useContext(CostumerContext);

    //Ao renderizar meu componente, traga junto os meus dados do banco
    // useEffect(() => {
    //     getPosts();
    // },
    //     []
    // );

    //função para pegar os posts do banco da coleção posts
    // function getPosts() {
    //     getDocs(collectionRef)
    //         .then(response => {
    //             const postsDB = response.docs.map(doc => (
    //                 {
    //                     data: doc.data(),
    //                     userDB: doc.data().user,
    //                     contentDB: doc.data().content,
    //                     categoryDB: doc.data().category,
    //                     likesDB: doc.data().likes,
    //                     id: doc.id
    //                 }))
    //             setPosts(postsDB);
    //         })
    //         .catch(error => { console.log(error.message) })
    // }

    // 
    

    //função para cadastrar um post na coleção posts
    // const addPost = async ({ title, content, category }) => {
    //     try {
    //         const post = await addDoc(collectionRef, {
    //             title: title,
    //             description: content,
    //             user: user,
    //             userToken: token,
    //             categorys: category,
    //             likes: 0
    //         });
    //         console.log("post cadastrado", post.id, post);
    //         // updateCurrentUser(auth, user)

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    //função para atualizar um post na coleção posts para quando ele receber um like (A FAZER)
    const updatePost = async (id, update_title, update_description, update_category, update_img) => {
        try {
            const q = query(collection(db, "post"), where("id", "==", id));
            const doc = await getDocs(q);
            const data = doc?.docs[0]?.data();

            if (data) {
                const docData = {
                    title: update_title,
                    description: update_description,
                    category: update_category,
                    imgURL: update_img,
                };

                try {
                    setDoc(doc, docData);
                    console.log('post atualizado');
                } catch (error) {
                    console.log(error, error.message);
                }
            }

        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    }

    //função para deletar um post na coleção posts
    const removePost = async (id) => {
        const postDeleted = doc(db, 'posts', id);
        await deleteDoc(postDeleted);
        console.log("post deletado");
    }


    //INSTANCIA COSTUMER CONTEXT SENDO RETORNADA NO COMPONENTE PASSANDO PARA O SEU PROVEDOR AS FUNÇÕES CRUD
    return (
        <PostsContext.Provider value={{ post, updatePost, removePost, loading }}>
            {children}
        </PostsContext.Provider>
    )
}

