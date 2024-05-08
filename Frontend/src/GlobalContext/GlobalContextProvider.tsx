import React, { useState } from "react";
import { GlobalContext } from "./GlobalContext";

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [items, setItems] = useState<string>("")


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