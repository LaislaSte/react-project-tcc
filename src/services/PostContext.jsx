import React, { createContext, useState, useEffect, useContext } from 'react';

import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import {db} from './Banco';

import {CostumerContext} from '../services/UserContext';

//instanciado um objeto com o Hook do react createContext
export const PostsContext = createContext();
//referenciando a coleção do banco de dados a ser usada
const collectionRef = collection(db, 'posts');

export const PostProvider = ({ children }) => {

    //criado estados
    const [posts, setPosts] = useState(null);
    const [likes, setLikes] = (null);

    const [loading, setLoading] = useState(true);

    const {user, token} = useContext(CostumerContext);


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

    //função para cadastrar um post na coleção posts
    
    const addPost = async ({title, content, category}) => {
        const post = await addDoc(collectionRef, {
            title,
            content,
            user,
            token,
            category
        });
        console.log("post cadastrado", post);
    }

    //função para atualizar um post na coleção posts para quando ele receber um like (A FAZER)
    const updatePost = async (id) => {
        const postSelected = doc(db, 'posts', id);

        if (postSelected) {
            try {
                await updateDoc(postSelected, {
                    likesDB: likes
                });
                console.log('post atualizado');
            } catch (error) {
                console.log(error, error.message);
            }
        }

        return;
    }

    //função para deletar um post na coleção posts
    const removePost = async (id) => {
        const postDeleted = doc(db, 'posts', id);
        await deleteDoc(postDeleted);
        console.log("post deletado");
    }


    //INSTANCIA COSTUMER CONTEXT SENDO RETORNADA NO COMPONENTE PASSANDO PARA O SEU PROVEDOR AS FUNÇÕES CRUD
    return (
        <PostsContext.Provider value={{ posts, addPost, updatePost, removePost, loading }}>
            {children}
        </PostsContext.Provider>
    )
}

