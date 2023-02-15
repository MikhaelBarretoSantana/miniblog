import React from 'react'

import styles from "./CreatePost.module.css"

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useINsertDocument } from '../../hooks/useInsertDocument'

const CreatePost = () => {

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");
    const {insertDocument, response} = useINsertDocument("posts")

    const {user} = useAuthValue();

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError("")

        // validate image URL
        try {
            new URL(image) 
        } catch (error) {
            setFormError("A imagem precisa ser uma URL.");
        }

        // Criar o array de tags
        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());
        //Checar todos os valores 

        if(!title || !image || !tags || !body) {
            setFormError("Por favor, preencha todos os campos!")
        }

        if (formError) return;

        insertDocument({
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        })

        // redirect to home page
        navigate("/")
    };

    return (
        <div className={styles.create_post}>
            <h2> Create Post</h2>
            <p> Escreva sobre oque quiser e compartilhe o seu conhecimento!</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span> Titulo </span> 
                    <input 
                        type="text" 
                        name='title' 
                        required 
                        placeholder='pense em um bom título ;D'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </label>
                <label>
                    <span> Image </span> 
                    <input 
                        type="text" 
                        name='image' 
                        required 
                        placeholder='Insira uma imagem que representa o seu post :0'
                        onChange={(e) => setImage(e.target.value)}
                        value={image}
                    />
                </label>
                <label>
                    <span> Conteúdo </span> 
                    <input 
                        type="text" 
                        name='body' 
                        required 
                        placeholder='Insira o conteúdo do post :3 '
                        onChange={(e) => setBody(e.target.value)}
                        value={body}
                    />
                </label>
                <label>
                    <span> Tags </span> 
                    <input 
                        type="text" 
                        name='tags' 
                        required 
                        placeholder='Qual o melhor adjetivo para a sua imagem ? :1'
                        onChange={(e) => setTags(e.target.value)}
                        value={tags}
                    />
                </label>
                {!response.loading && <button className='btn'> Criar Post! </button>}
                {response.loading && (<button className='btn' disabled> Aguarde... </button>)}
                {response.error && <p className="error"> {response.error} </p>} 
                {formError && <p className="error"> {formError} </p>} 

            </form>
        </div>
    )
}

export default CreatePost