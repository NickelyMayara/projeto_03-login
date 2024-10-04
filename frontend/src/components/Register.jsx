import React from 'react'

const Register = () => {

    const [username, setUsername] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [message, setMessage] = React.useState('')
    
    const handleRegister = async(event) => {
        event.preventDefault()
        try{
            await axios.post("http://localhost:3000/register", {
                username,
                email,
                password
            })
            setMessage("O usuário foi cadastrado com sucesso!")

        }catch(error){
            setMessage("NÃO foi possivel cadastrar o usuário!")
        }
    }

    return (
        <>
            <h1>Página de Cadastro</h1>
            <form onSubmit={handleRegister}>
                <label>Nome:</label>
                <input 
                type="text" 
                value={username} 
                onChange={(event) => setUsername(event.target.value)} />

                <label>Email:</label>
                <input 
                type="email" v
                alue={email}
                onChange={(event) => setEmail(event.target.value)}/>

                <label>Senha:</label>
                <input 
                type="password" 
                value={password}
                onChange={(event) => setPassword(event.target.value)}/>
                <button type='submit'>Cadastrar</button>
            </form>
            {message && <p>{message}</p>}
        </>
    )
}

export default Register
