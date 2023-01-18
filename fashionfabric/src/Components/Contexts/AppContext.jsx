import { createContext } from "react";

export const appContext = createContext();

export const AppContextProvider = (props) => {
    const { children } = props;
    const baseURL = "http://localhost:3000";
    const value = {
        baseURL,
    };
    return <appContext.Provider value={value}>{children}</appContext.Provider>;
};
