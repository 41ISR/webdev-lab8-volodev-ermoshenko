import { api } from "../api/api"
import useItemsStore from "../store/useItemsStore"
import { useUserStore } from "../store/useUserStore"

const ItemCard = ({title, description, price, bidInfo, username, status }) =>{
    return (
<div className="item-card">
                    <img src="https://via.placeholder.com/300x200/3498db/ffffff?text=Laptop" alt="Ноутбук Dell XPS 15" className="item-image"/>
                        <div className="item-content">
                            <span className="status-badge status-active">{status}</span>
                            <h3 className="item-title">{title}</h3>
                            <p className="item-description">{description}</p>
                            <div className="item-footer">
                                <div>
                                    <div className="item-price">{price}</div>
                                    {bidInfo && <div className="bid-info">
                                        Текущая ставка: 70 000 ₽
                                        <span className="bid-count">5</span>
                                    </div>}
                                </div>
                                <div className="item-meta">
                                    <span className="item-seller">{username}</span>
                                </div>
                            </div>
                        </div>
                </div>
    )
}

export default ItemCard