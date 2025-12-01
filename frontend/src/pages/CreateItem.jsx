import Button from "../components/Button"
import Input from "../components/Input"
import "../styles/CreateItem.css"
import { useState } from "react"
import { api } from "../api/api"
import useItemsStore from "../store/useItemsStore"

const CreateItem = () => {
    const { getItems } = useItemsStore()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const items = {
             title: e.target.title.value,
             description: e.target.description.value,
             price: e.target.price.value,
             imageUrl: e.target.imageUrl.value
             }

        try {
            await api.sendItems(items)
            await getItems()
            e.target.reset()
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <>
        <div className="page-header">
        <h1>Создать новый товар</h1>
    </div>

    <div className="form-container">
        <form onSubmit={handleSubmit} id="create-item-form">
            <div className="form-group">
                <label className="form-label">
                    Название товара <span className="required">*</span>
                </label>
                <input 
                    type="text" 
                    className="form-input" 
                    name="title"
                    placeholder="Например: iPhone 14 Pro 256GB"
                    maxLength="100"
                    required
                />
                <div className="char-counter">
                    <span className="current">0</span> / 100
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">
                    Описание <span className="required">*</span>
                </label>
                <textarea 
                    className="form-textarea" 
                    name="description"
                    placeholder="Подробно опишите товар, его состояние, характеристики..."
                    maxLength="1000"
                    required
                ></textarea>
                <div className="char-counter">
                    <span className="current">0</span> / 1000
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
                        name="price"
                        placeholder="5000"
                        min="1"
                        required
                    />
                    <span className="input-prefix">₽</span>
                </div>
                <div className="form-hint">
                    Укажите минимальную цену, с которой начнутся торги
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">
                    URL изображения
                </label>
                <input 
                    type="url" 
                    className="form-input" 
                    name="imageUrl"
                    placeholder="https://example.com/image.jpg"
                />
                <div className="form-hint">
                    Вставьте ссылку на изображение товара (опционально)
                </div>
                <div className="image-preview" id="image-preview">
                    <img src="" alt="Предпросмотр"/>
                </div>
            </div>

            <div className="form-actions">
                <a href="/" className="btn-cancel">Отмена</a>
                <Button type="submit" className="btn-submit">Создать товар</Button>
            </div>
        </form>
    </div>
        </>
    )
}

export default CreateItem