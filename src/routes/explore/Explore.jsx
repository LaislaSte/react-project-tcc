import React, { useEffect, useState } from 'react';
//import React from 'react'


const Explore = () => {
    const Post = [
        {
            id: string,
            name: string,
            content: string,
            category: string
        }
    ]

    const [search, setSearch] = useState[''];
    const [post, setPost] = useState[[]]

    useEffect(
        () => {
            //função para trazer do banco todos os documentos da coleção post
            //const getPost = async () =>{
            //const posts = await getDocs(collectionRef)
            //}
            //getPost()

        },
        [])


    function getUsers() {
        getDocs(collectionRef)
            .then(response => {
                //como fazer consulta de uma coleção que tenha documento com arquivos/mídia e como renderiza-los
                const usersDB = response.docs.map(doc => (
                    {
                        data: doc.data(),
                        nome: doc.data().nome,
                        email: doc.data().email,
                        senha: doc.data().senha,
                        id: doc.id
                    }))
                setPost(usersDB);
            })
            .catch(error => { console.log(error.message) })
    }

    const filteredPosts = search.lenght > 0
        ? Post.filter(post => post.name.includes(search) || post.content.includes(search) || post.category.includes(search))
        : []

    return (
        <div className='Explore'>
            <h1>Explore Page</h1>
            <input
                type="text"
                placeholder='buscar'
                onChange={(e) => setSearch(e.target.value)} />
            <ul>
                {myList.map(item => {
                    return (
                        <li key={item.id}>
                            <h2>{item.name}</h2>
                            <p> {item.content} </p>
                        </li>
                    )
                })}
            </ul>

        </div >
    )
}

export default Explore;

