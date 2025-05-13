import { useState } from 'react';
import './Login.css';

export default function SignIn() {
    const [form, setForm] = useState({ email: '', password: '' });

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };



    return (
        <div className="auth-container">
            <h2>Sign In</h2>
            <form className="auth-form">
                <input name="email" type="email" placeholder="Email" required />
                <input name="password" type="password" placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
