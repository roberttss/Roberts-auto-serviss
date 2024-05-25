import { useContext } from 'react'
import { Product } from '../ProductList'
import './ProductItemModal.scss'
import { GlobalContext } from '../../../GlobalContext/GlobalContext'

type ProductItemModalType = {
    product: Product,
    onClose: () => void,
}

export const ProductItemModal = ({ product, onClose }: ProductItemModalType) => {
    const { itemsInCart, setItemsInCart } = useContext(GlobalContext)

    return (
        <>
            <div className='productItem__modal--main'>
                <span className='productItem__product--path'>Shop items / {product.group} / {product.title}</span>
                <h1 className='productItem__product--name'>{product.title}</h1>
                <div className='productItem__product--infoContainer'>
                    <img src={product.picture} alt={`${product.title} picture`} className='productItem_product--image' />
                    <div className='productItem_product--priceContainer'>
                        <span>{product.inStock > 0 ? <div className='productItem_product--available textAlignCenter'>Is available</div> : <div className='productItem_product--notAvailable textAlignCenter'>Not in stock</div>}</span>
                        <span className='productItem_product--price'>Price: <b className='productItem_product--bold'>{product.price}$</b></span>
                    </div>

                </div>
            </div>
            <div className="productItem__modal--buttonContainer">
                <button
                    className="productItem__modal--cancel"
                    onClick={onClose}
                >
                    Back
                </button>
                <button className="productItem__modal--add" onClick={() => setItemsInCart([...itemsInCart, product])}>Add to cart</button>
            </div>
        </>
    )
}