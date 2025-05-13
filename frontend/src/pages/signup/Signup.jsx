import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

export default function Signup() {
    const [user, setUser] = useState({ name: '', email: '', password: '' })
    const [message, setMessage] = useState(null)
    const [loading, setLoading] = useState(false)



    function handleInput(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    async function handleForm(e) {
        e.preventDefault()
        setLoading(true)
        setMessage(null)

        try {
            const res = await fetch('http://localhost:5000/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })

            const userData = await res.json()
            console.log(userData)
            setMessage(userData.message)
            setUser({ name: '', email: '', password: '' })

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }

    return (
        <div className="auth-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleForm} className="auth-form">
                <input name="name" placeholder="Name" required value={user.name} onChange={handleInput} />
                <input name="email" type="email" placeholder="Email" required value={user.email} onChange={handleInput} />
                <input name="password" type="password" placeholder="Password" required value={user.password} onChange={handleInput} />
                {!loading && <button type="submit">Register</button>}
                {loading && <button type="submit" disabled>Aguarde...</button>}
                {message && <p>{message}</p>}
            </form>
        </div>
    );
}
