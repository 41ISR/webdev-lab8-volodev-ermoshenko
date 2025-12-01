import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useItemsStore from '../store/itemsStore';
import useBidsStore from '../store/bidsStore';
import useAuthStore from '../store/authStore';
import { formatPrice, formatDate, formatTimeAgo } from '../utils/formatters';
import '../styles/style.css';

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentItem, fetchItem, deleteItem } = useItemsStore();
  const { bids, fetchBids, createBid, loading: bidsLoading } = useBidsStore();
  const { isAuthenticated, user } = useAuthStore();
  const [bidAmount, setBidAmount] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchItem(id);
    fetchBids(id);
  }, [id]);

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const amount = parseInt(bidAmount);
    const minBid = currentItem.highestBid
      ? currentItem.highestBid + 1
      : currentItem.price + 1;

    if (!amount || amount < minBid) {
      setError(`Минимальная ставка: ${formatPrice(minBid)}`);
      return;
    }

    if (currentItem.userId === user?.id) {
      setError('Нельзя делать ставку на свой товар');
      return;
    }

    const result = await createBid(id, amount);
    if (result.success) {
      setBidAmount('');
      fetchItem(id);
      fetchBids(id);
    } else {
      setError(result.error || 'Ошибка создания ставки');
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm('Вы уверены, что хотите удалить этот товар?')
    ) {
      const result = await deleteItem(id);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error || 'Ошибка удаления товара');
      }
    }
  };

  if (!currentItem) {
    return <div>Загрузка...</div>;
  }

  const isOwner = currentItem.userId === user?.id;
  const minBid = currentItem.highestBid
    ? currentItem.highestBid + 1
    : currentItem.price + 1;
  const highestBid = bids.length > 0 ? bids[0] : null;

  return (
    <>
      <Link to="/" className="back-link">
        ← Вернуться к списку товаров
      </Link>

      <div className="item-detail">
        <div className="item-header">
          <div>
            <img
              src={
                currentItem.imageUrl ||
                'https://via.placeholder.com/600x400/ecf0f1/95a5a6?text=No+Image'
              }
              alt={currentItem.title}
              className="item-image-large"
            />
          </div>

          <div className="item-info">
            <span
              className={`item-status ${
                currentItem.status === 'active' ? 'status-active' : ''
              }`}
            >
              {currentItem.status === 'active' ? 'Активно' : 'Неактивно'}
            </span>

            <h1 className="item-title-large">{currentItem.title}</h1>

            <div className="item-seller-info">
              <div className="seller-avatar">
                {currentItem.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="seller-details">
                <div className="seller-name">{currentItem.username}</div>
                <div className="seller-date">
                  Опубликовано: {formatDate(currentItem.createdAt)}
                </div>
              </div>
            </div>

            <div className="item-description-full">
              {currentItem.description}
            </div>

            <div className="price-section">
              <div className="starting-price">Начальная цена:</div>
              <div className="current-price">{formatPrice(currentItem.price)}</div>
              {currentItem.highestBid && (
                <div className="highest-bid">
                  Текущая ставка: {formatPrice(currentItem.highestBid)}
                </div>
              )}

              {!isOwner && isAuthenticated && currentItem.status === 'active' && (
                <form className="bid-form" onSubmit={handleBidSubmit}>
                  {error && (
                    <div className="alert alert-error active">{error}</div>
                  )}
                  <input
                    type="number"
                    className="bid-input"
                    placeholder={`Введите вашу ставку (мин. ${formatPrice(minBid)})`}
                    min={minBid}
                    step="1"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="btn-bid"
                    disabled={bidsLoading}
                  >
                    {bidsLoading ? 'Отправка...' : 'Сделать ставку'}
                  </button>
                </form>
              )}

              {isOwner && currentItem.bidCount === 0 && (
                <button className="btn-delete" onClick={handleDelete}>
                  Удалить товар
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="bids-section">
          <div className="bids-header">
            <h2 className="bids-title">История ставок</h2>
            <span className="bids-count">{bids.length}</span>
          </div>

          {bids.length === 0 ? (
            <div className="no-bids">
              <p>Ставок пока нет. Станьте первым!</p>
            </div>
          ) : (
            <div className="bids-list">
              {bids.map((bid, index) => (
                <div
                  key={bid.id}
                  className={`bid-item ${
                    index === 0 && bid.amount === currentItem.highestBid
                      ? 'highest-bid-item'
                      : ''
                  }`}
                >
                  <div className="bid-user">
                    <div className="bid-avatar">
                      {bid.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="bid-details">
                      <span className="bid-username">{bid.username}</span>
                      <span className="bid-time">
                        {formatTimeAgo(bid.createdAt)}
                      </span>
                    </div>
                    {index === 0 && bid.amount === currentItem.highestBid && (
                      <span className="highest-badge">🏆 Лидирует</span>
                    )}
                  </div>
                  <div className="bid-amount">{formatPrice(bid.amount)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ItemDetail;

