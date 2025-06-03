import { useState } from 'react';
import './Login.css';

import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom'

export default function SignIn() {

    const { loading, login, error } = useAuth()

    const [form, setForm] = useState({ email: '', password: '' });

    const navigate = useNavigate()

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    async function handleForm(e) {
        e.preventDefault()
        await login(form)
        navigate('/')
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
                {!loading && <button type="submit" >Login</button>}
                {loading && <button type="submit" disabled={loading} >Aguarde...</button>}
            </form>
        </div>
    );
}
