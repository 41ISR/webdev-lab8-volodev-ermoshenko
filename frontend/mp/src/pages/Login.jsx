import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import '../styles/style.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated, loading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Заполните все поля');
      return;
    }

    const result = await login(username, password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Неверное имя пользователя или пароль');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <div className="auth-icon">🔐</div>
        <h1 className="auth-title">Вход</h1>
        <p className="auth-subtitle">Войдите в свой аккаунт</p>
      </div>

      {error && (
        <div className="alert alert-error active">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Имя пользователя</label>
          <input
            type="text"
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Введите имя пользователя"
            required
            autoComplete="username"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Пароль</label>
          <input
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
            required
            autoComplete="current-password"
          />
        </div>

        <button
          type="submit"
          className="btn-submit"
          disabled={loading}
        >
          {loading ? 'Вход...' : 'Войти'}
        </button>
      </form>

      <div className="auth-divider">или</div>

      <div className="auth-link">
        Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
      </div>
    </div>
  );
};

export default Login;

