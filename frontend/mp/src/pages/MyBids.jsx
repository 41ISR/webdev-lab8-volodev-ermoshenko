import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useBidsStore from '../store/bidsStore';
import useItemsStore from '../store/itemsStore';
import useAuthStore from '../store/authStore';
import { formatPrice, formatTimeAgo } from '../utils/formatters';
import '../styles/style.css';

const MyBids = () => {
  const { myBids, fetchMyBids, loading } = useBidsStore();
  const { items, fetchItems } = useItemsStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchMyBids();
    fetchItems();
  }, [isAuthenticated]);

  const getItemById = (itemId) => {
    return items.find((item) => item.id === itemId);
  };

  const winningBids = myBids.filter((bid) => bid.isWinning).length;
  const totalAmount = myBids.reduce((sum, bid) => sum + bid.amount, 0);

  if (loading && myBids.length === 0) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      <div className="page-header">
        <h1>Мои ставки</h1>
        <p className="page-subtitle">История ваших ставок на товары</p>
      </div>

      <div className="bids-summary">
        <div className="summary-card">
          <span className="summary-value">{myBids.length}</span>
          <span className="summary-label">Всего ставок</span>
        </div>
        <div className="summary-card winning">
          <span className="summary-value">{winningBids}</span>
          <span className="summary-label">Лидирующих ставок</span>
        </div>
        <div className="summary-card">
          <span className="summary-value">{formatPrice(totalAmount)}</span>
          <span className="summary-label">Общая сумма</span>
        </div>
      </div>

      {myBids.length === 0 ? (
        <div className="no-bids">
          <div className="no-bids-icon">💸</div>
          <h2>Вы еще не делали ставок</h2>
          <p>Просмотрите доступные товары и сделайте первую ставку!</p>
          <Link to="/" className="btn-browse">
            Посмотреть товары
          </Link>
        </div>
      ) : (
        <div className="bids-list">
          {myBids.map((bid) => {
            const item = getItemById(bid.itemId);
            if (!item) return null;

            return (
              <div
                key={bid.id}
                className={`bid-item ${bid.isWinning ? 'winning' : ''}`}
              >
                <img
                  src={
                    item.imageUrl ||
                    'https://via.placeholder.com/80x80/ecf0f1/95a5a6?text=No+Image'
                  }
                  alt={item.title}
                  className="bid-item-image"
                />
                <div className="bid-item-content">
                  <div className="bid-item-header">
                    <Link to={`/items/${item.id}`} className="bid-item-title">
                      {bid.itemTitle || item.title}
                    </Link>
                    {bid.isWinning ? (
                      <span className="winning-badge">🏆 Лидирую</span>
                    ) : (
                      <span className="outbid-badge">Перебита</span>
                    )}
                  </div>
                  <div className="bid-item-meta">
                    <span>⏰ {formatTimeAgo(bid.createdAt)}</span>
                    <span>💰 Начальная: {formatPrice(item.price)}</span>
                  </div>
                </div>
                <div className="bid-item-amount">
                  <span className="bid-amount">{formatPrice(bid.amount)}</span>
                  <span className="bid-status">Моя ставка</span>
                  {!bid.isWinning && item.highestBid && (
                    <div className="current-highest">
                      Текущая: {formatPrice(item.highestBid)}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default MyBids;

