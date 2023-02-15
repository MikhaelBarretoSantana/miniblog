
// CSS
import styles from "./Login.module.css"

import { useState, useEffect } from "react"

import { useAuthentication } from '../../hooks/useAuthentication';


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const {login, error: authError, loading} = useAuthentication();


    const handleSubmit = async (e) => {
        e.preventDefault()

        setError("")

        const user = {
            email,
            password
        };

        const res = await login(user); 
    };
    useEffect(() => {

        if (authError) {
            setError(authError);
        }

    }, [authError])

    return (
        <div className={styles.login}>
            <h1> Login </h1>
            <p> Faça o login para desfrutar do sistema </p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span> E-mail: </span>
                    <input
                    type="email" 
                    name='email' 
                    required 
                    placeholder='E-mail do usuário' 
                    onChange={(e) => {setEmail(e.target.value)}} 
                    value={email}
                    />
                    <span> Senha: </span>
                    <input 
                    type="password" 
                    name='password' 
                    required 
                    placeholder='Insira sua senha' 
                    onChange={(e) => {setPassword(e.target.value)}} 
                    value={password}
                    />                    
                </label>
                {!loading && <button className='btn'> Login </button>}
                {loading && <button className='btn' disabled> Aguarde... </button>}
                {error && <p className="error"> {error} </p>}
            </form>
        </div>
    )
}

export default Login;