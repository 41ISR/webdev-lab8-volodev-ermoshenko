// src/components/Navbar.jsx
import { Link } from 'react-router-dom'
import { useUserStore } from '../store/useUserStore'

const NavBar = () => {
    const { session } = useUserStore() 

    return (
        <header>
            <nav>
                <Link to="/" className="logo">
                    Маркетплейс
                </Link>

                {session ? (
                    <ul className="nav-links" id="auth-nav">
                        <li>
                            <Link to="/" className="active">
                                Товары
                            </Link>
                        </li>
                        <li>
                            <Link to="/my-bids">Мои ставки</Link>
                        </li>
                        <li>
                            <Link to="/create-item" className="btn-primary">
                                + Создать товар
                            </Link>
                        </li>
                        <li className="user-info">
                            {/* <span className="username">
                                {user?.username || 'username'}
                            </span> */}
                            <Link to="/logout" className="btn-logout">
                                Выйти
                            </Link>
                        </li>
                    </ul>
                ) : (
                    <ul className="nav-links" id="guest-nav">
                        <li>
                            <Link to="/">Товары</Link>
                        </li>
                        <li>
                            <Link to="/login">Войти</Link>
                        </li>
                        <li>
                            <Link to="/register" className="btn-primary">
                                Регистрация
                            </Link>
                        </li>
                    </ul>
                )}
            </nav>
        </header>
    )
}

export default NavBar