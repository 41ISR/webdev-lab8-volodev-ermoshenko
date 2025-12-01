import { useEffect } from "react"
import ItemCard from "../components/ItemCard"
import useItemsStore from "../store/useItemsStore"
import "../styles/ItemsList.css"
import Stats from "../components/Stats"

const ItemsList = () => {
    const { items, getItems } = useItemsStore()

    useEffect(() => {
        getItems()
    }, [])
    return (
        <>
            <div className="page-header">
                <h1>Все товары</h1>
            </div>

            <Stats/>

            <div className="items-grid">
                {items.map((item, i) => (
                    <ItemCard key={i} {...item} />
                ))}
            </div>
        </>
    )
}

export default ItemsList