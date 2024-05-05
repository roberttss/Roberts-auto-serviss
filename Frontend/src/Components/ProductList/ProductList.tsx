import { ChangeEvent, useEffect, useState } from "react";
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
    const [filterValue, setFilterValue] = useState<string>("")

    useEffect(() => {
        fetch('http://localhost:3000/api/products', {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((res) => setProducts(res))
    }, [])

    const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setFilterValue(e.target.value);
    }

    return (
        <div>
            <div>Here will be Item List</div>
            <select name="filter" value={filterValue} onChange={onSelectChange}>
                <option value="">Select a filter...</option>
                <option value="Wheels">Filter by group (Wheels)</option>
                <option value="Engine">Filter by group (Engines)</option>
                <option value="Window">Filter by group (Windows)</option>
            </select>
            <div className="productList__products--container">
                {products.map(({ id, title, picture, price }) => (
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