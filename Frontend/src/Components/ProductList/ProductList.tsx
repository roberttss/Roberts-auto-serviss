import { useEffect, useState } from "react";
import './ProductList.scss'

type Product = {
    id: number,
    title: string,
    price: number,
    inStock: number,
    picture: string,
    group: string,
}[]

const ProductList = () => {
    const [products, setProducts] = useState<Product>([])
    const [filteredProductList, setFilteredProductList] = useState<Product>([])
    const [filterValue, setFilterValue] = useState<string>("")

    useEffect(() => {
        fetch('http://localhost:3000/api/products', {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((res) => (setProducts(res), setFilteredProductList(res)))
    }, [])

    useEffect(() => {
        if (filterValue === "") {
            return setFilteredProductList(products)
        }

        const filteredList = products.filter((product) => (
            product.group === filterValue
        ))

        setFilteredProductList(filteredList)
    }, [products, filterValue])


    return (
        <div>
            <select className="productList__filter" name="filter" value={filterValue} onChange={(e) => setFilterValue(e.target.value)}>
                <option value="">Select a filter... (All)</option>
                <option value="Wheels">Filter by group (Wheels)</option>
                <option value="Engine">Filter by group (Engines)</option>
                <option value="Window">Filter by group (Windows)</option>
            </select>
            <div className="productList__products--container">
                {filteredProductList.map(({ id, title, picture, price }) => (
                    <div className="productList__product--container" key={id}>
                        <img className="productList__image" src={picture} alt={`${title} photo`} />
                        <h2 className="productList__title">
                            {title}
                        </h2>
                        <h2 className="productList__title">
                            {price}$
                        </h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductList