import { useCallback, useEffect, useState } from "react";
import './ProductList.scss'

type Product = {
    id: number,
    title: string,
    price: number,
    inStock: number,
    picture: string,
    group: string,
}

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [filteredProductList, setFilteredProductList] = useState<Product[]>([])
    const [filterValue, setFilterValue] = useState<string>("")
    const [sortValue, setSortValue] = useState<string>("")

    useEffect(() => {
        fetch('http://localhost:3000/api/products', {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((res) => (setProducts(res), setFilteredProductList(res)))
    }, [])

    const sortProductList = useCallback((test: Product[]) => {
        if (sortValue === "") {
            return setFilteredProductList(test)
        }

        if (sortValue === "low") {
            const sortedProducts = [...test].sort((a, b) => (
                a.price - b.price
            ))

            return setFilteredProductList(sortedProducts)
        } else {
            const sortedProducts = [...test].sort((a, b) => (
                b.price - a.price
            ))

            return setFilteredProductList(sortedProducts)
        }
    }, [sortValue])

    useEffect(() => {
        if (filterValue === "") {
            return sortProductList(products)
        }

        const filteredList = products.filter((product) => (
            product.group === filterValue
        ))

        sortProductList(filteredList)

    }, [products, filterValue, sortValue, sortProductList])

    return (
        <div>
            <div className="productList__filter--container">
                <select className="productList__filter" name="filter" value={filterValue} onChange={(e) => setFilterValue(e.target.value)}>
                    <option value="">Select a filter... (All)</option>
                    <option value="Wheels">Filter by group (Wheels)</option>
                    <option value="Engine">Filter by group (Engines)</option>
                    <option value="Window">Filter by group (Windows)</option>
                </select>
                <select className="productList__filter" name="sort" value={sortValue} onChange={(e) => setSortValue(e.target.value)}>
                    <option value="">Do not sort</option>
                    <option value="low">Sort low to high (Price)</option>
                    <option value="high">Sort high to low (Price)</option>
                </select>
            </div>
            
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