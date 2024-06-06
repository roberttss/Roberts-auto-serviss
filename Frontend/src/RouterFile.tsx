import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainPage from "./Pages/MainPage/MainPage"
import { Cart } from "./Pages/Cart/Cart"
import PageHeader from "./Components/PageHeader/PageHeader"
import { Profile } from "./Pages/Profile/Profile"
import { useContext, useEffect, useRef } from "react"
import { GlobalContext, UserType } from "./GlobalContext/GlobalContext"
import { jwtDecode } from "jwt-decode"

export const RouterFile = () => {
    const { setUser } = useContext(GlobalContext)

    const productsRef = useRef<HTMLDivElement>(null)

    const manualLogin = (jwt_token: string) => {
        const decoded: UserType = jwtDecode(jwt_token);

        return setUser(decoded)
    }

    const checkUsers = async () => {
        const response = await fetch('http://localhost:3000/api/users/verify', {
            method: 'GET',
            credentials: 'include'
        })

        if (response.status === 401) {
            return null
        }

        const users = await response.json();

        manualLogin(users.cookieValue)
        return users.cookieValue
    }

    useEffect(() => {
        checkUsers()
    }, [])

    return (
        <div>
            <BrowserRouter basename="/">
                <PageHeader />
                <Routes>
                    <Route path="" element={<MainPage productsRef={productsRef} />} /> 
                    <Route path="cart" element={<Cart />} />
                    <Route path="profile" element={<Profile />} /> 
                </Routes>
            </BrowserRouter>
        </div>
    )

}