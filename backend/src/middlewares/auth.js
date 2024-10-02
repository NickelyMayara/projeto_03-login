import jwt from "jsonwebtoken"

export const verifyToken = (req, res) => {

    const token = req.headers.authorization.split('/')

    if(!token){
        return res.status(403).json({error: "Token não foi encontrado"})
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if(error){
            res.status(401).json({error: "Token inválido"})
        }

        req.user = decoded
    })
}