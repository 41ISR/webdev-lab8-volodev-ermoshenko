import { createBrowserRouter } from "react-router-dom"
import ItemsList from "../pages/ItemsList"
import Logout from "../pages/Logout"
import Register from "../pages/Register"
import Layout from "../pages/Layout"
import CreateItem from "../pages/CreateItem"
import MyBids from "../pages/MyBids"
import SignIn from "../pages/SignIn"

export const router = createBrowserRouter(
    [
        {
            path: "/logout",
            element: <Logout />
        },
        {
            path: "/",
            element: <Layout />,
            children:
                [
                    {
                        index: true,
                        element: <ItemsList />
                    },

                    {
                        path: "/my-bids",
                        element: <MyBids />
                    },
                    {
                        path: "/create-item",
                        element: <CreateItem />
                    },
                    {
                        path: "/item/:id",
                        element: <ItemDetail />
                    }
                ]
        },
        {
            path: "/login",
            element: <SignIn />
        },
        {
            path: "/register",
            element: <Register />
        },


    ]
)