import { useContext, useState } from 'react'
import './Cart.scss'
import { GlobalContext } from '../../GlobalContext/GlobalContext'
import { Product } from '../../Components/ProductList/ProductList'

type CartItem = {
    item: Product;
    cartAmount: number;
}

export const Cart = () => {
    const { itemsInCart } = useContext(GlobalContext)

    const countElementsWithId = (arr: Product[], targetId: number) => {
        // Filter the array to get elements that have the specified id
        const filteredArray = arr.filter(obj => obj.id === targetId);

        // Return the count of filtered elements
        return filteredArray.length;
    };

    const filterForUniqueItemArray = (itemsArray: Product[]) => {
        const uniqueItemArray: CartItem[] = []

        itemsArray.forEach((item1) => {
            if (!uniqueItemArray.some((item2) => item2.item.id === item1.id)) {
                uniqueItemArray.push({ item: item1, cartAmount: countElementsWithId(itemsInCart, item1.id) })
            } else {
                const itemIndex = uniqueItemArray.findIndex(item => item.item.id === item1.id);

                uniqueItemArray[itemIndex].cartAmount + 1
            }
        });

        return uniqueItemArray
    }

    const uniqueItemArray = filterForUniqueItemArray(itemsInCart)

    const addOrRemoveItem = (action: string, id: number) => {
        const item = uniqueItemArray.find((item) => item.item.id === id)
        const indexo = uniqueItemArray.findIndex((item) => item.item.id === id)

        if (item === undefined) {
            return null
        }

        if (action === "plus") {
            const updatedCartItems = [...itemList];

            updatedCartItems[indexo].cartAmount = updatedCartItems[indexo].cartAmount + 1

            return setItemList(updatedCartItems)
        }

        if (action === "minus") {
            const updatedCartItems = [...itemList];

            updatedCartItems[indexo].cartAmount = updatedCartItems[indexo].cartAmount - 1

            return setItemList(updatedCartItems)
        }
    }

    const [itemList, setItemList] = useState<CartItem[]>(uniqueItemArray)

    const removeItem = (id: number) => {
        const coppiedCartItems = [...itemList];

        const filteredArray = coppiedCartItems.filter((item) => item.item.id !== id)

        return setItemList(filteredArray)
    }

    const getTotalAmount = (array: CartItem[]) => {
        if (array.length === 0) {
            return 0.00
        }

        return array.map((a) => a.item.price * a.cartAmount).reduce((a, b) => a + b).toFixed(2)
    }

    return (
        <div className="marginForHeader">
            <div className='cart__container'>
                <div className='cart__header--container'>
                    <h1 className='cart__header--title'>Item cart</h1>
                    <button className='cart__header--button'>Proceed →</button>
                </div>
                <div className='cart__list--container'>
                    {itemsInCart.length === 0 ?
                        <div className='cart__list--empty textAlignCenter'>Cart is empty</div> :
                        itemList.map(({ item, cartAmount }) => (
                            <div className='cart__item--container' key={item.id}>
                                <div className='cart__item--infoContainer'>
                                    <img src={item.picture} alt={`${item.title} photo`} className='cart__item--picture' />
                                    <div className='cart__item--nameContainer'>
                                        <span>{item.title}</span>
                                        <span>Price: <b className='cart__item--bold'>{item.price.toFixed(2)}$</b></span>
                                    </div>
                                </div>


                                <div className='cart__item--optionsContainer'>
                                    <div className='cart__item--counterContainer'>
                                        <button className='cart__item--counterButtons' onClick={() => addOrRemoveItem("minus", item.id)}>-</button>
                                        <span className='cart__item--count'>{cartAmount}</span>
                                        <button className='cart__item--counterButtons' onClick={() => addOrRemoveItem("plus", item.id)}>+</button>
                                    </div>
                                    <span className='cart__item--total '>Total: <b className='cart__item--bold'>{(cartAmount * item.price).toFixed(2)}$</b></span>
                                    <button
                                        className='cart__item--remove'
                                        onClick={() => removeItem(item.id)}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    {itemsInCart.length !== 0 && <div className='cart_item--cartTotalContainer'>
                        <div className='cart_item--cartTotal textAlignEnd'>Cart total: <span className='cart__item--bold'>{getTotalAmount(itemList)}$</span></div>
                        <button className='cart__header--button'>Proceed →</button>
                    </div>}
                </div>
            </div>
        </div>
    )
}