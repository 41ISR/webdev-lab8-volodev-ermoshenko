import { Link, useNavigate } from "react-router-dom"
import Button from "../components/Button"
import Input from "../components/Input"

import { useState } from "react"
import { useUserStore } from "../store/useUserStore"

const Login = () => {
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const { setSession } = useUserStore()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        const user = {
            username: e.target.username.value,
            password: e.target.password.value
        }

        try {
            const data = await api.loginUser(user)
            console.log(data);
            
            setSession(data.data)
            navigate("/")
        } catch (error) {
            setError(error.response.data.error)
            console.error(error)
        }
    }
    return(
        <div className="auth-container">
        <div className="auth-header">
            <div className="auth-icon">🔐</div>
            <h1 className="auth-title">Вход</h1>
            <p className="auth-subtitle">Войдите в свой аккаунт</p>
        </div>

        <div className="alert alert-error" id="error-alert">
            Неверное имя пользователя или пароль
        </div>

        <form id="login-form">
            <div className="form-group">
                <label className="form-label">Имя пользователя</label>
                <Input 
                    type="text" 
                    className="form-input" 
                    name="username"
                    placeholder="Введите имя пользователя"
                    required
                    autocomplete="username"
                />
                <div className="form-error">Введите имя пользователя</div>
            </div>

            <div className="form-group">
                <label className="form-label">Пароль</label>
                <Input 
                    type="password" 
                    className="form-input" 
                    name="password"
                    placeholder="Введите пароль"
                    required
                    autocomplete="current-password"
                />
                <div className="form-error">Введите пароль</div>
            </div>

            <Button type="submit" className="btn-submit">Войти</Button>
        </form>

        <div className="auth-divider">или</div>

        <div className="auth-link">
            Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </div>
    </div>
    )
}
export default Login