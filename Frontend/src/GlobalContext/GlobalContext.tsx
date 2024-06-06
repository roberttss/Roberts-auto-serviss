import { Dispatch, SetStateAction, createContext } from "react";
import { Product } from "../Components/ProductList/ProductList";

export type UserType = {
    email: string,
    name: string,
    id: number,
}

export type ProductInCart = {
    amountInCart: number,
    product: Product
}

type GlobalContextType = {
    itemsInCart: ProductInCart[];
    setItemsInCart: Dispatch<SetStateAction<ProductInCart[]>>;
    user: UserType | null;
    setUser: Dispatch<SetStateAction<UserType | null>>;
}

const defaultValues = {
    itemsInCart: [],
    setItemsInCart: () => {},
    user: null,
    setUser: () => {}
}

export const GlobalContext = createContext<GlobalContextType>(defaultValues);
