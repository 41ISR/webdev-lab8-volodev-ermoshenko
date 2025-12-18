import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/style.css';
import useUserStore from '../store/UserStore';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { register, isAuthenticated, loading } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (password.length === 0) {
      setPasswordStrength(0);
    } else if (password.length < 6) {
      setPasswordStrength(1);
    } else if (password.length < 10) {
      setPasswordStrength(2);
    } else {
      setPasswordStrength(3);
    }
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Заполните обязательные поля');
      return;
    }

    if (username.length < 3) {
      setError('Имя пользователя должно быть не менее 3 символов');
      return;
    }

    if (password.length < 6) {
      setError('Пароль должен быть не менее 6 символов');
      return;
    }

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    const result = await register(username, password, email?.trim() || undefined);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Ошибка регистрации');
    }
  };

  const getPasswordStrengthClass = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength === 1) return 'weak';
    if (passwordStrength === 2) return 'medium';
    return 'strong';
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <div className="auth-icon">👤</div>
        <h1 className="auth-title">Регистрация</h1>
        <p className="auth-subtitle">Создайте новый аккаунт</p>
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
            minLength={3}
            required
            autoComplete="username"
          />
          <div className="form-hint">Минимум 3 символа</div>
        </div>

        <div className="form-group">
          <label className="form-label">
            Email <span className="optional">(необязательно)</span>
          </label>
          <input
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            autoComplete="email"
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
            minLength={6}
            required
            autoComplete="new-password"
          />
          <div className="password-strength">
            <div
              className={`password-strength-bar ${getPasswordStrengthClass()}`}
            ></div>
          </div>
          <div className="form-hint">Минимум 6 символов</div>
        </div>

        <div className="form-group">
          <label className="form-label">Подтверждение пароля</label>
          <input
            type="password"
            className="form-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Повторите пароль"
            required
            autoComplete="new-password"
          />
        </div>

        <button
          type="submit"
          className="btn-submit"
          disabled={loading}
        >
          {loading ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>

      <div className="auth-divider">или</div>

      <div className="auth-link">
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </div>
    </div>
  );
};

export default Register;

