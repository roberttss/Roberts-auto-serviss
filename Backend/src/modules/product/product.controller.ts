import { getProducts } from "./product.service"

//Function which allows to get all products
export const getProductsHandler = async () => {
    const products = await getProducts()

    return products
}