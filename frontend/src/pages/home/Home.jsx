import React from 'react'
import './Home.css'

import { useAuthContext } from '../../context/authContext'

function Home() {
    const { userAuth } = useAuthContext()

    console.log(userAuth)

    return (
        <div>
            <h1>Bom dia</h1>
        </div>
    )
}

export default Home