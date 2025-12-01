import { useEffect, useState } from "react"
import { api } from "../api/api"

const MyStats = ({bids}) => {
    if (!bids) return <></>
    return (
        <div className="stats">
            <div className="stat-item">
                <span className="stat-value">{bids.length}</span>
                <span className="stat-label">Всего ставок</span>
            </div>
            <div className="stat-item">
                <span className="stat-value">{bids.totalBids}</span>
                <span className="stat-label">Лидирующих ставок</span>
            </div>
            <div className="stat-item">
                <span className="stat-value">{bids.activeItems}</span>
                <span className="stat-label">Общая сумма</span>
            </div>
        </div>
    )
}

export default MyStats