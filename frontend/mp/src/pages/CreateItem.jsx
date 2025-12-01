import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useItemsStore from '../store/itemsStore';
import useAuthStore from '../store/authStore';
import '../styles/style.css';

const CreateItem = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const { createItem, loading } = useItemsStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title || !description || !price) {
      setError('Заполните все обязательные поля');
      return;
    }

    if (title.length > 100) {
      setError('Название не должно превышать 100 символов');
      return;
    }

    if (description.length > 1000) {
      setError('Описание не должно превышать 1000 символов');
      return;
    }

    const priceNum = parseInt(price);
    if (!priceNum || priceNum <= 0) {
      setError('Цена должна быть больше 0');
      return;
    }

    const result = await createItem(
      title,
      description,
      priceNum,
      imageUrl || undefined
    );

    if (result.success) {
      navigate(`/items/${result.item.id}`);
    } else {
      setError(result.error || 'Ошибка создания товара');
    }
  };

  return (
    <>
      <div className="page-header">
        <h1>Создать новый товар</h1>
      </div>

      <div className="form-container">
        {error && <div className="alert alert-error active">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">
              Название товара <span className="required">*</span>
            </label>
            <input
              type="text"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Например: iPhone 14 Pro 256GB"
              maxLength={100}
              required
            />
            <div className="char-counter">
              <span className="current">{title.length}</span> / 100
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Описание <span className="required">*</span>
            </label>
            <textarea
              className="form-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Подробно опишите товар, его состояние, характеристики..."
              maxLength={1000}
              required
            ></textarea>
            <div className="char-counter">
              <span className="current">{description.length}</span> / 1000
            </div>
            <div className="form-hint">
              Чем подробнее описание, тем больше шансов продать товар
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Начальная цена <span className="required">*</span>
            </label>
            <div className="input-group">
              <input
                type="number"
                className="form-input with-prefix"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="5000"
                min="1"
                step="1"
                required
              />
              <span className="input-prefix">₽</span>
            </div>
            <div className="form-hint">
              Укажите минимальную цену, с которой начнутся торги
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">URL изображения</label>
            <input
              type="url"
              className="form-input"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
            <div className="form-hint">
              Вставьте ссылку на изображение товара (опционально)
            </div>
            {imageUrl && (
              <div className="image-preview active">
                <img src={imageUrl} alt="Предпросмотр" />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate('/')}
            >
              Отмена
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Создание...' : 'Создать товар'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateItem;

