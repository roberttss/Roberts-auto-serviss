import { useContext } from 'react'
import './Cart.scss'
import { GlobalContext } from '../../GlobalContext/GlobalContext'

export const Cart = () => {
    const { itemsInCart } = useContext(GlobalContext)

    return (
        <div className="marginForHeader">
            <div className='cart__container'>
                <div className='cart__header--container'>
                    <h1 className='cart__header--title'>Item cart</h1>
                    <button className='cart__header--button'>Proceed →</button>
                </div>
                <div>
                    {itemsInCart.length === 0 ?
                     <div className='cart__list--empty'>Cart is empty</div> :
                      itemsInCart.map((item) => (
                        <div>
                            {item.title}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}