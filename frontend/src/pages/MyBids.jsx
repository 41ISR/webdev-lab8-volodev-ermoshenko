import { useEffect, useState } from "react"
import useItemsStore from "../store/useItemsStore"
import "../styles/MyBids.css"
import MyStats from "../components/MyStats"
import { api } from "../api/api"


const MyBids = () => {

    const [bids, setBids] = useState([])
    
    useEffect(() => {
        const render = async () => {
            // setBids(await api.getBids().data)
            setBids((await api.getBids()).data)
        }
        render()
    }, [])

    return (
        <div className="my-bids-page">

            <div className="page-header">
                <h1>Мои ставки</h1>
                <p className="page-subtitle">История ваших ставок на товары</p>
            </div>

            <MyStats bids={bids} />
        

            <div className="bids-list">
                <div className="bid-item winning">
                    <img
                        src="https://via.placeholder.com/80x80/3498db/ffffff?text=Laptop"
                        alt="Ноутбук"
                        className="bid-item-image"
                    />

                    <div className="bid-item-content">
                        <div className="bid-item-header">
                            <a href="/items/1" className="bid-item-title">
                                Ноутбук Dell XPS 15
                            </a>
                            <span className="winning-badge">🏆 Лидирую</span>
                        </div>

                        <div className="bid-item-meta">
                            <span>⏰ 2 часа назад</span>
                            <span>💰 Начальная: 65 000 ₽</span>
                        </div>
                    </div>

                    <div className="bid-item-amount">
                        <span className="bid-amount">70 000 ₽</span>
                        <span className="bid-status">Моя ставка</span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MyBids