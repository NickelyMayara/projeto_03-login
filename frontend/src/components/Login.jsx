import React from 'react'
import axios from "axios"

const Login = () => {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [message, setMessage] = React.useState('')
    const navigate = useNavigate()

    const handleLogin = async(event) => {
        event.preventDefault()
        try{
            const response = await axios.post("http://localhost:3000/login", {
                email,
                password
            })
            localStorage.setItem("token", response.data.token)
            setMessage("Logado com sucesso!")
            navigate("/")
        }catch{
            setMessage("Não foi possível fazer login!")
        }
    }

  return (
   <>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
            <label htmlFor=''>Email:</label>
            <input 
            type="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor=''>Password:</label>
            <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit'>Entrar</button>
        </form>
        {message && <p>{message}</p>}
   </>
  )
}

export default Login
