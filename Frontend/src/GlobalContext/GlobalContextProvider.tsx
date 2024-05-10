import React, { useState } from "react";
import { GlobalContext } from "./GlobalContext";
import { Product } from "../Components/ProductList/ProductList";

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [items, setItems] = useState<Product[]>([])


    const data = {
        itemsInCart: items,
        setItemsInCart: setItems,
    }

    return (
        <GlobalContext.Provider value={data}>
            {children}
        </GlobalContext.Provider>
    );
}