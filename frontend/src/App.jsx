import React from 'react'
import {Link, Routes, Route} from "react-router-dom"
import Register from './components/Register.jsx'

const app = () => {
    return (
        <div>
            <nav>
                <Link to="/register">SingUp</Link>
                <Link to="/login">Login</Link>
            </nav>

            <Routes>
                <Route path='register' element={<Register/>}/>
            </Routes>
        </div>
    )
}

export default app
