import { useEffect, useState } from "react"
import { api } from "../api/api"

const Stats = () => {
    const [stats, setStats] = useState(undefined)
    useEffect(() => {
        const fetchData = async () => {
            setStats((await api.getStats()).data)
        }
        fetchData()
    }, [])
    if (!stats) return <></>
    return (
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
                <span className="stat-value">{stats.totalValue}</span>
                <span className="stat-label">Средняя цена</span>
            </div>
        </div>
    )
}

export default Stats