import React, { useState } from "react";
import { GlobalContext, ProductInCart, UserType } from "./GlobalContext";

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [items, setItems] = useState<ProductInCart[]>([])
    const [user, setUser] = useState<UserType | null>(null);

    const data = {
        itemsInCart: items,
        setItemsInCart: setItems,
        user: user,
        setUser: setUser, 
    }

    console.log(1111, items)

    return (
        <GlobalContext.Provider value={data}>
            {children}
        </GlobalContext.Provider>
    );
}