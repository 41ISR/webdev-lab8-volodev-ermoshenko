import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"
import "../styles/Layout.css"
import Footer from "../components/Footer"
import ItemsList from "./ItemsList"

const Layout = () => {
    return (
        <div className="container">
            <NavBar />
            {/* <ItemsList /> */}
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout