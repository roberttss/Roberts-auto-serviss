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
            <div className="productItem__modal--buttonContainer">
                <button
                        className="productItem__modal--cancel"
                    onClick={onClose}
                >
                    Back
                </button>
                    <button className="productItem__modal--add" onClick={() => setItemsInCart([...itemsInCart, product])}>Add</button>
            </div>
        </div>
    </div> 
)}