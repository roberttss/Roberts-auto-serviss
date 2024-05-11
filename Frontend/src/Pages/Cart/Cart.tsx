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

    const filterForUniqueItemArray = (itemsArray:Product[]) => {
        const uniqueItemArray: CartItem[] = []

        itemsArray.forEach((item1) => {
            if(!uniqueItemArray.some((item2) => item2.item.id === item1.id )){
                uniqueItemArray.push({ item: item1, cartAmount: countElementsWithId(itemsInCart, item1.id) })
            } else {
                const itemIndex = uniqueItemArray.findIndex(item => item.item.id === item1.id);

                uniqueItemArray[itemIndex].cartAmount + 1
            }
        });

        return uniqueItemArray
    }

    const uniqueItemArray =  filterForUniqueItemArray(itemsInCart)

    console.log(11111, uniqueItemArray)

    const addOrRemoveItem = (action: string, id: number) => {
        const item = uniqueItemArray.find((item) => item.item.id === id)
        const indexo = uniqueItemArray.findIndex((item) => item.item.id === id)
        console.log(2222, item)

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


    return (
        <div className="marginForHeader">
            <div className='cart__container'>
                <div className='cart__header--container'>
                    <h1 className='cart__header--title'>Item cart</h1>
                    <button className='cart__header--button'>Proceed →</button>
                </div>
                <div className='cart__list--container'>
                    {itemsInCart.length === 0 ?
                     <div className='cart__list--empty'>Cart is empty</div> :
                        itemList.map(({item, cartAmount}) => (
                        <div className='cart__item--container' key={item.id}>
                              <img src={item.picture} alt={`${item.title} photo`} className='cart__item--picture'/>
                            {item.title}
                            <span>{item.price}</span>
                            <div>
                                    <button onClick={() => addOrRemoveItem("minus", item.id)}>minus</button>
                                    <div>{cartAmount}</div>
                                    <button onClick={() => addOrRemoveItem("plus", item.id)}>Plus</button>
                            </div>
                            <button>remove</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}