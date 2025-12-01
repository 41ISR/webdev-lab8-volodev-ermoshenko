import axios from "axios"
import { use } from "react"
import { useUserStore } from "../store/useUserStore"

const apiInstance = axios.create({
    baseURL: "https://cautious-pancake-x5v7rv45jjq92975j-3001.app.github.dev/api",
    headers: {
        "Content-Type": "application/json"
    }
})

apiInstance.interceptors.request.use((config) => {
    const { session } = useUserStore.getState()

    if(session?.token){
        config.headers.Authorization = `Bearer ${session.token}`
    }

    return config
})

const getItems = async () => {
    const data = await apiInstance.get("/items")
    return data.data
}

const registerUser = async (user) => {
    const res = await apiInstance.post("/auth/register", user)
    return res
}

const loginUser = async (user) => {
    const res = await apiInstance.post("/auth/login", user)
    return res
}

const sendItems= async (message) => {
    const res = await apiInstance.post("/items", message)
    return res
}

const deleteItems = async (id) => {
    const res = await apiInstance.delete(`/items/${id}`)
    return res
}
 const getStats = async () => {
    const res = await apiInstance.get("/stats")
    return res
 }
 const getBids = async () => {
    const res = await apiInstance.get("/bids/my")
    console.log(res);
    return res
 }


export const api = {
    getItems,
    registerUser,
    loginUser,
    sendItems,
    deleteItems,
    getStats,
    getBids
}