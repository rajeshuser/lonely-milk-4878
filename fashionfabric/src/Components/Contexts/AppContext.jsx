import axios from "axios";
import { useState, createContext } from "react";

export const appContext = createContext();

export const AppContextProvider = (props) => {
    const { children } = props;
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const baseURL = "http://localhost:3000";

    async function refreshUser() {
        let response = await axios({
            method: "get",
            baseURL,
            url: `/users/${user.id}`,
        });
        if (response.status === 200) {
            setUser(response.data);
        }
    }

    const signInUser = (user) => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
    };

    const signOutUser = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    // pass "setUser" in place of "signInUser",
    // wherever "user" is being changed,
    // "user" should be updated in the server as well as the context using "setUser"
    const value = {
        baseURL,
        user,
        signInUser,
        signOutUser,
        refreshUser,
    };
    return <appContext.Provider value={value}>{children}</appContext.Provider>;
};
