import { useNavigate } from "react-router-dom"
import useUserStore from "../store/useUserStore"
import { useEffect } from "react"

const Logout = () => {
    const navigate = useNavigate()
    const { clearSession } = useUserStore()
    useEffect(() => {
        clearSession()
        navigate("/")
    }, [])
    return <></>
}

export default Logout