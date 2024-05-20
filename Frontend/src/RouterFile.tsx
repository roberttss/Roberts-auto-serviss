import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainPage from "./Pages/MainPage/MainPage"
import { Cart } from "./Pages/Cart/Cart"
import PageHeader from "./Components/PageHeader/PageHeader"
import { Profile } from "./Pages/Profile/Profile"

export const RouterFile = () => {

    return (
        <div>
            <BrowserRouter basename="/">
                <PageHeader />
                <Routes>
                    <Route path="" element={<MainPage />} /> 
                    <Route path="cart" element={<Cart />} />
                    <Route path="profile" element={<Profile />} /> 
                </Routes>
            </BrowserRouter>
        </div>
    )

}