import { useContext } from "react"
import { GlobalContext } from "../../GlobalContext/GlobalContext"
import './Profile.scss'
import profilePic from './assets/static/profilePicture.png'

export const Profile = () => {
    const { user } = useContext(GlobalContext)

    const test = () => {
        fetch(`http://localhost:3000/api/orders/all/${user?.id}`, {
            method: 'GET',
            credentials: "include",
        }).then((res) => res.json()).then((res) => console.log(1111, res))
    }

    const test2 = () => {
        fetch(`http://localhost:3000/api/services/all/${user?.id}`, {
            method: 'GET',
            credentials: "include",
        }).then((res) => res.json()).then((res) => console.log(2222, res))
    }

    return (
        <div className="profile__container marginForHeader">
            <div className="profile__info--container">
                <img src={profilePic} alt="Profile picture" className="profile__picture" />
                <div className="profile__info--infoContainer">
                    <span>Username: {user?.name}</span>
                    <span>User ID: {user?.id}</span>
                </div>

            </div>
            <div className="profile__order--container">
                <h1 className="profile__order--header textBold">Your orders</h1>

                <button onClick={() => test()}>Call</button>
            </div>

            <div className="profile__order--container">
                <h1 className="profile__order--header textBold">Your ordered services</h1>

                <button onClick={() => test2()}>Call</button>
            </div>
        </div>
    )
}