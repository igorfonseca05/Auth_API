import { createContext, useContext, useState } from "react";


const AuthContext = createContext()

export function AuthContextProvider({ children }) {
    const [userAuth, setUserAuth] = useState(undefined)

    return (
        <AuthContext.Provider value={{ userAuth, setUserAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('O contexto deve ser fornecido')
    }

    return context
}