import { useRef, useState } from "react";
import PageHeader from "../../Components/PageHeader/PageHeader"
import './MainPage.scss'
import ProductList from "../../Components/ProductList/ProductList";
import { MainPageIntroduction } from "../../Components/MainPageIntroduction/MainPageIntroduction";

export type UserType = {
    email: string,
    name: string,
    id: number,
}

const MainPage = () => {
    const [user, setUser] = useState<UserType | null>(null);

    const productsRef = useRef<HTMLDivElement>(null)

    // const checkUsers = async () => {
    //     const response = await fetch('http://localhost:3000/api/users', {
    //         method: 'GET',
    //         credentials: 'include'
    //     })

    //     const users = await response.json();
    //     console.log(123123, users);
    // }

    return (
        <div>
            <PageHeader user={user} setUser={setUser}></PageHeader>
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