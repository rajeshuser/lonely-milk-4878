import { useState, createContext } from "react";

export const appContext = createContext();

export const AppContextProvider = (props) => {
    const { children } = props;
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const baseURL = "http://localhost:3000";

    const signInUser = (user) => {
        console.log("user passed to context", user);
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
    };

    // pass "setUser" in place of "signInUser",
    // wherever "user" is being changed,
    // "user" should be updated in the server as well as the context using "setUser"
    const value = {
        baseURL,
        user,
        signInUser,
    };
    return <appContext.Provider value={value}>{children}</appContext.Provider>;
};
