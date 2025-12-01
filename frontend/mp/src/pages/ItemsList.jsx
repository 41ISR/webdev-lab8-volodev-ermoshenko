import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useItemsStore from '../store/itemsStore';
import { formatPrice } from '../utils/formatters';
import '../styles/style.css';

const ItemsList = () => {
  const { items, stats, loading, fetchItems, fetchStats } = useItemsStore();

  useEffect(() => {
    fetchItems();
    fetchStats();
  }, []);

  if (loading && items.length === 0) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      <div className="page-header">
        <h1>Все товары</h1>
      </div>

      {stats && (
        <div className="stats">
          <div className="stat-item">
            <span className="stat-value">{stats.totalItems}</span>
            <span className="stat-label">Товаров</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{stats.totalBids}</span>
            <span className="stat-label">Ставок</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{stats.activeItems}</span>
            <span className="stat-label">Активных</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">
              {formatPrice(stats.averageItemPrice)}
            </span>
            <span className="stat-label">Средняя цена</span>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <div className="no-items">
          <div className="no-items-icon">📦</div>
          <h2>Товаров пока нет</h2>
          <p>Станьте первым, кто разместит товар на продажу!</p>
        </div>
      ) : (
        <div className="items-grid">
          {items.map((item) => (
            <Link
              key={item.id}
              to={`/items/${item.id}`}
              className="item-card"
            >
              <img
                src={
                  item.imageUrl ||
                  'https://via.placeholder.com/300x200/ecf0f1/95a5a6?text=No+Image'
                }
                alt={item.title}
                className="item-image"
              />
              <div className="item-content">
                <span
                  className={`status-badge ${
                    item.status === 'active' ? 'status-active' : ''
                  }`}
                >
                  {item.status === 'active' ? 'Активно' : 'Неактивно'}
                </span>
                <h3 className="item-title">{item.title}</h3>
                <p className="item-description">{item.description}</p>
                <div className="item-footer">
                  <div>
                    <div className="item-price">{formatPrice(item.price)}</div>
                    {item.highestBid && (
                      <div className="bid-info">
                        Текущая ставка: {formatPrice(item.highestBid)}
                        {item.bidCount > 0 && (
                          <span className="bid-count">{item.bidCount}</span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="item-meta">
                    <span className="item-seller">
                      Продавец: {item.username}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default ItemsList;

