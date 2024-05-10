import { useContext, useEffect, useRef } from "react";
import PageHeader from "../../Components/PageHeader/PageHeader"
import './MainPage.scss'
import ProductList from "../../Components/ProductList/ProductList";
import { MainPageIntroduction } from "../../Components/MainPageIntroduction/MainPageIntroduction";
import { jwtDecode } from "jwt-decode";
import { GlobalContext, UserType } from "../../GlobalContext/GlobalContext";

const MainPage = () => {
    const { setUser } = useContext(GlobalContext)

    const productsRef = useRef<HTMLDivElement>(null)

    const manualLogin = (jwt_token: string) => {
        const decoded: UserType = jwtDecode(jwt_token);

        return setUser(decoded)
    }

    const checkUsers = async () => {
        console.log(123123)
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
            <PageHeader />
            <div className="mainPage__introduction--container">
                <MainPageIntroduction productsRef={productsRef}></MainPageIntroduction>
            </div>
            <div className="mainPage__product--container">
                <div className="mainPage__product--title" ref={productsRef}>Our products</div>
                <ProductList />
            </div>

        </div>
    )
}

export default MainPage