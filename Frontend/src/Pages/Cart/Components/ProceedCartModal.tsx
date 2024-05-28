import { useContext } from "react";
import { GlobalContext } from "../../../GlobalContext/GlobalContext";
import { CartItem } from "../Cart";

type ProceedCartModalProps = {
    onClose: () => void;
    totalCartValue: number;
    cartItemList: CartItem[];
}

export const ProceedCartModal = ({ onClose, totalCartValue, cartItemList }: ProceedCartModalProps) => {
    const { itemsInCart, user } = useContext(GlobalContext)

    console.log(itemsInCart)
    console.log(user)

    const onSubmit = () => {
        const sendData = [{
            id:453,
            price:12.99,
            title: "Engine Oil Filter",
            orderedAmount: 2
        }]

        fetch("http://localhost:3000/api/orders/create", {
            method: 'POST',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify(sendData)
        })

        console.log(124)

    }

    return (
        <div>
            <div>
                {cartItemList.map(({ item, cartAmount }) => (
                    <div key={item.id}>
                        <h1>{item.title}</h1>
                        <span>{item.price.toFixed(2)}$</span>
                        <span>Amount: {cartAmount}</span>
                    </div>
                ))}
            </div>
            <div>
                Total: {totalCartValue}$
            </div>
            <div className="productItem__modal--buttonContainer">
                <button
                    className="productItem__modal--cancel"
                    onClick={onClose}
                >
                    Cancel
                </button>
                <button className="productItem__modal--add" onClick={() => onSubmit()}>Order</button>
            </div>
        </div>
    )
}