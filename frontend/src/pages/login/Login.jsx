import { useState } from 'react';
import './Login.css';

export default function SignIn() {
    const [form, setForm] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    async function handleForm(e) {
        e.preventDefault()

        try {

            const res = await fetch('http://localhost:5000/users/login', {
                method: 'POST',
                headers: {
                    "Content-type": 'application/json'
                },
                body: JSON.stringify(form)
            })

            if (!res.ok) {
                throw new Error('Erro ao obter dados do usuário')
            }

            const userData = await res.json()

            console.log(userData)

        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div className="auth-container">
            <h2>Sign In</h2>
            <form onSubmit={handleForm} className="auth-form">
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    onChange={(e) => handleChange(e)} />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e) => handleChange(e)} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
