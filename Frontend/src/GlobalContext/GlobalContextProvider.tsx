import React, { useState } from "react";
import { GlobalContext, UserType } from "./GlobalContext";
import { Product } from "../Components/ProductList/ProductList";

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [items, setItems] = useState<Product[]>([])
    const [user, setUser] = useState<UserType | null>(null);

    const data = {
        itemsInCart: items,
        setItemsInCart: setItems,
        user: user,
        setUser: setUser, 
    }

    return (
        <GlobalContext.Provider value={data}>
            {children}
        </GlobalContext.Provider>
    );
}