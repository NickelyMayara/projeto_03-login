import React from 'react'
import axios from "axios"

const Home = () => {

    const [userData, setUserData] = React.useState(null)
    const [error, setError] = React.useState(null)

    React.useEffect(() => { //espera os dados virem, monta e exibe na tela
        const token = localStorage.getItem("token")

        if(!token){
            setError("O token não foi encontrado!")
            return
        }

        const getUserData = async () => {
            try{
                const response = await axios.get("http://localhost:3000/auth/perfil", {
                    headers: {
                        Authorization: `Bearer: ${token}`
                    }
                })
                setUserData(response.data.user)
            } catch{
                setError("Não foi possível carregar dados do usuário", err)
            }
        }
        getUserData()
    }, [])

    return (
        <>
            <h1>Bem vindo(a) ao sistema!</h1>
            {error && <p>{error}</p>}
            {userData ? (
                <div>
                    <h2>Dados do usuário</h2>
                    <p><strong>ID:</strong> {userData.id} </p>
                    <p><strong>Username:</strong> {userData.username} </p>
                    <p><strong>Email:</strong> {userData.email} </p>
                </div>
            ): <p>Carregando dados...</p>}
        </>
    )
}

export default Home
