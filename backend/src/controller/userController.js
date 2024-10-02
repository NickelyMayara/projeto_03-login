import Users from "../model/userModel.js"
import jwt from "jsonwebtoken"

export const createUsers = (req, res) => {

    try{
        Users.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        res.status(201).json("Usuário cadastrado com sucesso!")
    } catch(error) {
        res.status(500).json("Não foi possível cadastrar o usuário")
    }
}
export const loginUser = async (req, res) => {
    const {email, password} = req.body

    try{
        const user = Users.findOne({where: {email}}) //vai buscar se existe um dado igual ao que foi requisitado
        if(!user){
            return res.status(404).json("O usuário não foi encontrado!")
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json("A senha está incorreta")
        }

        const token = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_SECRET, {expiresIn: 300})

        res.status(200).json({message: "Login realizado com sucesso!"}, token)

    } catch(error){
        res.status(500).json(error)
    }
}
export const getUserProfile = (req, res) => {
    try{
        res.status(200).json({message: "Perfil do Usuário:", user: req.user})
    }catch(error){
        res.status(400).json("Você não tem acesso!")
    }
}