import { useContext } from "react";
import { GlobalContext } from "../../../GlobalContext/GlobalContext";
import { CartItem } from "../Cart";
import './ProceedCartModal.scss'

type ProceedCartModalProps = {
    onClose: () => void;
    totalCartValue: number;
    cartItemList: CartItem[];
}

type itemDataType = {
    productId: number;
    price: number;
    title: string;
    orderedAmount: number;
}

type orderDataType = {
    userId: number;
    orderedItems: itemDataType[]
}

export const ProceedCartModal = ({ onClose, totalCartValue, cartItemList }: ProceedCartModalProps) => {
    const { user, setItemsInCart } = useContext(GlobalContext)

    if (user === null) {
        return null
    }

    const onSubmit = async () => {
        const itemData: itemDataType[] = cartItemList.map(({ item, cartAmount }) => { return { productId: item.id, price: item.price, title: item.title, orderedAmount: cartAmount } })

        const dataTest: orderDataType = {
            userId: user.id,
            orderedItems: itemData
        }

        const response = await fetch("http://localhost:3000/api/orders/create", {
            method: 'POST',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify(dataTest)
        })
        const responseJSON = await response.json();

        if(responseJSON.statusCode === 500){
            return alert("Please try again")
        }

        onClose()
        setItemsInCart([])
    }

    return (
        <div className="proceedModal__container">
            <div>
                {cartItemList.map(({ item, cartAmount }) => (
                    <div className="proceedModal__container--items" key={item.id}>
                        <div className="proceedModal__container--info">
                            <img src={item.picture} alt={`${item.title} photo`} className="proceedModal__picture" />
                            <div className="proceedModal__name--container">
                                <span>{item.title}</span>
                                <div className="proceedModal__price--container">
                                    <span>Price: <b>{item.price.toFixed(2)}$</b></span>
                                    <span>Amount: {cartAmount}</span>
                                </div>

                            </div>
                        </div>
                        <div className="proceedModal__total">
                            Total: <b className="textBold">{(item.price * cartAmount).toFixed(2)}$</b>
                        </div>
                    </div>
                ))}
            </div>
            <div className="textAlignEnd">
                Total: <b className="textBold">{totalCartValue}$</b>
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