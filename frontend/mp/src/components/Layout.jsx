import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import '../styles/style.css';

const Layout = ({ children }) => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="app-container">
      <header>
        <nav>
          <Link to="/" className="logo">
            🛒 Маркетплейс
          </Link>

          {isAuthenticated ? (
            <ul className="nav-links">
              <li>
                <Link
                  to="/"
                  className={isActive('/') ? 'active' : ''}
                >
                  Товары
                </Link>
              </li>
              <li>
                <Link
                  to="/my-bids"
                  className={isActive('/my-bids') ? 'active' : ''}
                >
                  Мои ставки
                </Link>
              </li>
              <li>
                <Link to="/create-item" className="btn-primary">
                  + Создать товар
                </Link>
              </li>
              <li className="user-info">
                <span className="username">{user?.username}</span>
                <button className="btn-logout" onClick={handleLogout}>
                  Выйти
                </button>
              </li>
            </ul>
          ) : (
            <ul className="nav-links">
              <li>
                <Link
                  to="/"
                  className={isActive('/') ? 'active' : ''}
                >
                  Товары
                </Link>
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

      <main>{children}</main>

      <footer>
        <p>&copy; 2025 Маркетплейс. Все права защищены.</p>
      </footer>
    </div>
  );
};

export default Layout;

