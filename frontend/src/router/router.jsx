import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ItemDetail from "../pages/ItemDetail";
import Layout from "../components/Layout";
import MyBids from "../pages/MyBids";
import CreateItem from "../pages/CreateItem";

export const router = createBrowserRouter(

    [   
        {
            "path": "/",
            "element": <Layout />
        },
        {
            "path": "/login",
            "element": <Login/>
        },
        {
            "path": "/register",
            "element": <Register/>
        },
        {
            "path": "/items/:id",
            "element": <ItemDetail />
        },
        {
            "path": "/my-bids",
            "element": <MyBids />
        },
        {
            "path": "/create-item",
            "element": <CreateItem />
        },
    ]

)

