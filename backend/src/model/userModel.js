import conn from "../config/conn.js"
import { DataTypes } from "sequelize"
import bcrypt from "bcrypt"

const Users = conn.define("users", {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false, //permissão para não aceitar campos vazios
        unique: true //para usar o mesmo dado igual
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isEmail: true  //valida o básico de email,mas ainda precisa ser feito outras validações
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

Users.beforeCreate( async (user) => {
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
})

const syncDatabase = async () => {
    try{
        conn.authenticate()
        console.log("Conexão estabelecida com sucesso!")

        await Users.sync()
        console.log("Tabela criada com sucesso!")
    }catch(error){
        console.log("Erro ao se conectar com a tabela!", error)
    }
}

syncDatabase()
export default Users