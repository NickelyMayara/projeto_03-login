import express from 'express'
import cors from 'cors'
import conn from './config/conn.js'
import userRouter from './routers/userRouter.js'
import authRouter from "./routers/authRouter.js"
import dotenv from "dotenv"

const port = 3000
const app = express()

dotenv.config()

app.use(cors())
app.use(express.urlencoded({ extended:true }))
app.use(express.json())

// Não precisa está autenticado para navegar nessa rota
app.use("/", userRouter)

// Precisa está autenticado para navegar nessa rota
app.use("/auth", authRouter)

conn
    .sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`Disponível em https://localhost:${port}`)
        })
    })
    .catch((error) => console.log(error))

