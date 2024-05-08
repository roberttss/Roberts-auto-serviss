import { Dispatch, SetStateAction, createContext } from "react";

type GlobalContextType = {
    itemsInCart: string;
    setItemsInCart: Dispatch<SetStateAction<string>>;
}

const defaultValues = {
    itemsInCart: "",
    setItemsInCart: () => {}
}

export const GlobalContext = createContext<GlobalContextType>(defaultValues);
