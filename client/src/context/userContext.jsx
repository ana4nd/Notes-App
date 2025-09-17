import { createContext, useContext, useState } from "react";


export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [user, setUser] = useState(null)
    return <UserContext.Provider value={{ user, setUser, backendUrl }}>
        {children}
    </UserContext.Provider>
}

export const getData = () => useContext(UserContext)