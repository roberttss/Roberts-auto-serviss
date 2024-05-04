import { useState } from "react";
import PageHeader from "../../Components/PageHeader/PageHeader"
import './MainPage.css'

export type UserType = {
    email: string,
    name: string,
    id: number,
}

const MainPage = () => {
    const [user, setUser] = useState<UserType | null>(null);

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
            <h1 className="mainPage__title">
                {user === null ? "Welcome to Robis Serviss, please log in" : `Welcome ${user.name}`}
            </h1>
        </div>
    )
}

export default MainPage