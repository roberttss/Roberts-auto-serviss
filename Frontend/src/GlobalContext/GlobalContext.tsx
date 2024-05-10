import { Dispatch, SetStateAction, createContext } from "react";
import { Product } from "../Components/ProductList/ProductList";

export type UserType = {
    email: string,
    name: string,
    id: number,
}

type GlobalContextType = {
    itemsInCart: Product[];
    setItemsInCart: Dispatch<SetStateAction<Product[]>>;
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
