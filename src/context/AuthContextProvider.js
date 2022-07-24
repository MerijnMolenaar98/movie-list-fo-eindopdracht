import React from "react";
import {useState, useEffect} from "react";

export const AuthContext = React.createContext(null);

function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {

        const user = sessionStorage.getItem('user');

        if (user) {
            setUser(user);
        }

        console.log(user);

    }, []);

    console.log(user);
    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    );

}

export default AuthContextProvider;