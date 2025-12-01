import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useUserStore } from "../store/useUserStore"
import "../styles/Register.css"
import Input from "../components/Input"
import Button from "../components/Button"
import { api } from "../api/api"

const Register = () => {
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const { setSession } = useUserStore()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (e.target.password.value !== e.target.password2.value) {
            setError("Пароли не совпадают")
            return
        }

        const user = {
            username: e.target.username.value,
            email: e.target.email.value || null,
            password: e.target.password.value
        }

        try {
            const data = await api.registerUser(user)
            setSession(data.data)
            navigate("/")
        } catch (error) {
            setError(error.response?.data?.error || "Ошибка регистрации")
            console.error(error)
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-header">
                <h1 className="auth-title">Регистрация</h1>
                <p className="auth-subtitle">Создайте новый аккаунт</p>
            </div>

            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Имя пользователя</label>
                    <Input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Введите имя пользователя"
                        className="form-input" 
                        required
                    />
                    <div className="form-hint">Минимум 3 символа</div>
                </div>

                <div className="form-group">
                    <label className="form-label">
                        Email <span className="optional">(необязательно)</span>
                    </label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Введите почту"
                        className="form-input" 
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Пароль</label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Введите пароль"
                        className="form-input" 
                        required
                    />
                    <div className="password-strength">
                        <div className="password-strength-bar" id="password-strength-bar"></div>
                    </div>
                    <div className="form-hint">Минимум 6 символов</div>
                </div>

                <div className="form-group">
                    <label className="form-label">Подтверждение пароля</label>
                    <Input
                        id="password2"
                        name="password2"
                        type="password"
                        placeholder="Подтвердите пароль"
                        className="form-input" 
                        required
                    />
                </div>

                <Button className="btn-submit">Зарегистрироваться</Button>
            </form>

            <div className="auth-divider">или</div>

            <div className="auth-link">
                Уже есть аккаунт? <Link to={"/login"}>Войти</Link>
            </div>
        </div>
    )
}

export default Register