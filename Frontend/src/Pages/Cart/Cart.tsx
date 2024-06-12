import { useContext, useState } from 'react'
import './Cart.scss'
import { GlobalContext, ProductInCart } from '../../GlobalContext/GlobalContext'
import { ProceedCartModal } from './Components/ProceedCartModal'
import { Modal } from '../../Components/Modal/Modal'
import { Product } from '../../Components/ProductList/ProductList'

const getTotalAmount = (array: ProductInCart[]) => {
    if (array.length === 0) {
        return 0.00
    }

    return array.map((a) => a.product.price * a.amountInCart).reduce((a, b) => a + b).toFixed(2)
}

export const Cart = () => {
    const { itemsInCart, setItemsInCart, user } = useContext(GlobalContext)

    const [openProceedModal, setOpenProceedModal] = useState(false)

    const addOrRemoveItem = (action: 'plus' | 'minus', product: Product) => {
        const updatedCart: ProductInCart[] = itemsInCart.map((item) => {
            const actionSign = (action === 'plus' ? item.amountInCart + 1 : item.amountInCart - 1)

            if (item.product.id === product.id) {
                const changedItem = {
                    amountInCart: actionSign,
                    product: item.product
                }
                return changedItem
            }

            return item
        })

        const filteredArray: ProductInCart[] = updatedCart.filter((item) => item.amountInCart !== 0)

        return setItemsInCart(filteredArray)
    }

    const removeItem = (id: number) => {
        const copiedCartItems = [...itemsInCart];

        const filteredArray = copiedCartItems.filter((item) => item.product.id !== id)

        return setItemsInCart(filteredArray)
    }

    const onCartSubmit = () => {
        if (user === null) {
            return alert("Please register to proceed with cart")
        }

        if (itemsInCart.length === 0) {
            return alert("Please add atleast 1 item to the cart")
        }

        setOpenProceedModal(true)
    }

    return (
        <div className="marginForHeader">
            <div className='cart__container'>
                <div className='cart__header--container'>
                    <h1 className='cart__header--title'>Item cart</h1>
                    <button className='cart__header--button' onClick={onCartSubmit}>Proceed →</button>
                </div>
                <div className='cart__list--container'>
                    {itemsInCart.length === 0 ?
                        <div className='cart__list--empty textAlignCenter'>Cart is empty</div> :
                        itemsInCart.map(({ product, amountInCart }) => (
                            <div className='cart__item--container' key={product.id}>
                                <div className='cart__item--infoContainer'>
                                    <img src={product.picture} alt={`${product.title} photo`} className='cart__item--picture' />
                                    <div className='cart__item--nameContainer'>
                                        <span>{product.title}</span>
                                        <span>Price: <b className='cart__item--bold'>{product.price.toFixed(2)}$</b></span>
                                    </div>
                                </div>

                                <div className='cart__item--optionsContainer'>
                                    <div className='cart__item--counterContainer'>
                                        <button className='cart__item--counterButtons' onClick={() => addOrRemoveItem("minus", product)}>-</button>
                                        <span className='cart__item--count'>{amountInCart}</span>
                                        <button className='cart__item--counterButtons' onClick={() => addOrRemoveItem("plus", product)}>+</button>
                                    </div>
                                    <span className='cart__item--total '>Total: <b className='cart__item--bold'>{(amountInCart * product.price).toFixed(2)}$</b></span>
                                    <button
                                        className='cart__item--remove'
                                        onClick={() => removeItem(product.id)}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    {itemsInCart.length !== 0 && <div className='cart_item--cartTotalContainer'>
                        <div className='cart_item--cartTotal textAlignEnd'>Cart total: <span className='cart__item--bold'>{getTotalAmount(itemsInCart)}$</span></div>
                        <button className='cart__header--button' onClick={onCartSubmit}>Proceed →</button>
                    </div>}
                    {openProceedModal && <Modal><ProceedCartModal onClose={() => setOpenProceedModal(false)} totalCartValue={Number(getTotalAmount(itemsInCart))} cartItemList={itemsInCart} /></Modal>}
                </div>
            </div>
        </div>
    )
}