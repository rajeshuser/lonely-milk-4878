import { useState, createContext } from "react";

export const appContext = createContext();

export const AppContextProvider = (props) => {
    const { children } = props;
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const baseURL = "http://localhost:3000";

    const putUserInLocalStorage = (user) => {
        localStorage.setItem("user", JSON.stringify(user));
    };

    const value = {
        baseURL,
        user,
        putUserInLocalStorage,
    };
    return <appContext.Provider value={value}>{children}</appContext.Provider>;
};
