
import { useEffect, useState } from "react";

import { useAuthContext } from "../src/context/authContext";

export function useAuth() {
    const { setUserAuth } = useAuthContext()

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [isMounted, setCheckIsMounted] = useState(true)


    function checkIfIsMounted() {
        if (!isMounted) return
    }

    async function login(user) {
        checkIfIsMounted()

        setLoading(true)
        setError(null)

        try {
            const res = await fetch('http://localhost:5000/users/login', {
                method: 'POST',
                headers: {
                    "Content-type": 'application/json'
                },
                body: JSON.stringify(user)
            })

            if (!res.ok) {
                throw new Error('Erro ao obter dados do usuário')
            }

            const userData = await res.json()
            setUserAuth(userData)

        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        return () => setCheckIsMounted(false)
    }, [])

    return {
        login,
        error,
        loading
    }


}