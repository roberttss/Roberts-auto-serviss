import { Dispatch, SetStateAction, createContext } from "react";
import { Product } from "../Components/ProductList/ProductList";

type GlobalContextType = {
    itemsInCart: Product[];
    setItemsInCart: Dispatch<SetStateAction<Product[]>>;
}

const defaultValues = {
    itemsInCart: [],
    setItemsInCart: () => {}
}

export const GlobalContext = createContext<GlobalContextType>(defaultValues);
