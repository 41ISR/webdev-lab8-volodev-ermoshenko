import { Link } from 'react-router-dom'
import { useUserStore } from '../store/UserStore'

const NavBar = () => {
    const { session } = useUserStore()

    return (

        <div className="container">
            <header>
            <nav>
                <a href="/" className="logo">🛒 Маркетплейс</a>
                
                {/* <ul className="nav-links" id="auth-nav">
                    <li><Link to={"/"}>Товары</Link></li>
                    <li><Link to={"/my-bids"}>Мои ставки</Link></li>
                    <li><Link to={"/create-item"} className="btn-primary">Создать товар</Link></li>
                    <li className="user-info">
                        <span className="username">username</span>
                        <button className="btn-logout">Выйти</button>
                    </li>
                </ul> */}

                <ul className="nav-links" id="guest-nav">
                   <li>
                        <Link to={"/"}>Домой</Link>
                    </li>
                    {!session ? (
                        <li>
                            <Link to={"/login"}>Войти</Link>
                        </li>
                    ) : (
                        <>
                        <li>
                            <Link to={"/create-item"}>Создать товар</Link>
                        </li>
                        <li>
                            <Link to={"/logout"}>Выйти</Link>
                        </li>
                        </>
                    )}
                </ul> 
            </nav>
            </header>
        </div>




    )
}

export default NavBar