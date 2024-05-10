import { useContext } from 'react'
import { Product } from '../ProductList'
import './ProductItemModal.scss'
import { GlobalContext } from '../../../GlobalContext/GlobalContext'

type ProductItemModalType = {
    product: Product,
    onClose: () => void,
}

export const ProductItemModal = ({product, onClose}: ProductItemModalType) => {
    const {itemsInCart, setItemsInCart} = useContext(GlobalContext)

    return (
    <div className="productItem__modal">
        <div className="productItem__modal--content">
            <div>This is {product.title}</div>
                <button onClick={() => setItemsInCart([...itemsInCart, product])}>Add</button>
            <button onClick={onClose}>Close</button>
        </div>
    </div> 
)}