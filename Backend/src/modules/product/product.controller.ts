import { getProducts } from "./product.service"

export const getProductsHandler = async () => {
    const products = await getProducts()

    return products
}