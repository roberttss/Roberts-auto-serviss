import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../../GlobalContext/GlobalContext"
import './Profile.scss'
import profilePic from './assets/static/profilePicture.png'

type orderedItemsType = {
    productId: number;
    price: number;
    title: string;
    orderedAmount: number;
    id: number;
    orderId: number;
}

type orderListType = {
    userId: number;
    orderId: number;
    orderedItems: orderedItemsType[]
}

type serviceListType = {
    id: number;
    createAt: Date;
    name: string;
    orderedServiceDate: Date;
    orderServiceTime: string;
    userId: number;
}

export const Profile = () => {
    const { user } = useContext(GlobalContext)

    const [orderList, setOrderList] = useState<orderListType[]>([])
    const [serviceList, setServiceList] = useState<serviceListType[]>([])

    useEffect(() => {
        if (user === null) {
            return
        }

        fetch(`http://localhost:3000/api/orders/all/${user?.id}`, {
            method: 'GET',
            credentials: "include",
        }).then((res) => res.json()).then((res) => setOrderList(res))

        fetch(`http://localhost:3000/api/services/all/${user?.id}`, {
            method: 'GET',
            credentials: "include",
        }).then((res) => res.json()).then((res) => setServiceList(res))
    }, [user, user?.id])

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

                {orderList.length === 0 && user !== null && <p className="profile__needLogIn textBold">You have no orders</p>}

                {user === null && <p className="profile__needLogIn textBold">Please log in to see your orders!</p>}

                {orderList.length !== 0 && user !== null && orderList.map(({ orderId, orderedItems }) => (
                    <div className="profile__order--container" key={orderId}>
                        OrderId: {orderId}
                        <br /><br />
                        Ordered item list:
                        <div>
                            {orderedItems.map((item) => (
                                <div key={item.productId}>
                                    title: {item.title}, price: {item.price}, amount: {item.price}$
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="profile__order--container">
                <h1 className="profile__order--header textBold">Your ordered services</h1>
                {serviceList.length === 0 && user !== null && <p className="profile__needLogIn textBold">You have no services ordered</p>}

                {user === null && <p className="profile__needLogIn textBold">Please log in to see your ordered services!</p>}

                {serviceList.length !== 0 && user !== null && serviceList.map(({ name, id }, index) => (
                    <div className="profile__order--container" key={index}>
                        <h2>Id: {id}</h2>
                        Ordered service name: {name}
                    </div>
                ))}
            </div>
        </div>
    )
}