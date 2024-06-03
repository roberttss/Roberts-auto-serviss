import { useContext } from "react"
import { GlobalContext } from "../../GlobalContext/GlobalContext"

export const Profile = () => {
    const { user } = useContext(GlobalContext)

    const test = () => {
        fetch('http://localhost:3000/api/orders/all', {
            method: 'GET',
            credentials: "include",
        }).then((res) => res.json()).then((res) => console.log(1111, res))
    }

    return (
        <div className="marginForHeader">
            <h1>THis is profile for {user?.name}</h1>
            <h2>User ID is: {user?.id}</h2>
            <button className='introduction__button--style' onClick={test}>Teeeeest</button>
        </div>
    )   
}