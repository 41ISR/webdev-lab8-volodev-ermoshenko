import "../styles/Login.css"
import { useState } from "react"
import Button from "../components/Button"
import Input from "../components/Input"
import { api } from "../api/api"
import { Link, useNavigate } from "react-router-dom"
import { useUserStore } from "../store/useUserStore"

const SignIn = () => {
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

    return (
        <>
            <div className="auth-container">
                <div className="auth-header">
                    <div className="auth-icon">🔐</div>
                    <h1 className="auth-title">Вход</h1>
                    <p className="auth-subtitle">Войдите в свой аккаунт</p>
                </div>

                <div className="alert alert-error" id="error-alert">
                    Неверное имя пользователя или пароль
                </div>

                <form onSubmit={handleSubmit} id="login-form">
                    <div className="form-group">
                        <label className="form-label">Имя пользователя</label>
                        <Input
                            id="username"
                            name="username"
                            type="text"
                            label="Имя пользователя"
                            required
                            placeholder="Введите имя пользователя"
                            className="form-input"
                        />
                        <div className="form-error">Введите имя пользователя</div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Пароль</label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            label="Пароль"
                            required
                            placeholder="Введите пароль"
                            className="form-input"
                        />
                        <div className="form-error">Введите пароль</div>
                    </div>

                    <Button className="btn-submit">Войти</Button>
                </form>

                <div className="auth-divider">или</div>

                <div className="auth-link">
                    Нет аккаунта? <div className="auth-footer">
                    <p>
                        <Link to={"/register"}>Регистрация</Link>
                    </p>
                </div>
                </div>
            </div>
        </>
    )
}

export default SignIn