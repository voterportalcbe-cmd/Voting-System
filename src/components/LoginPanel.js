import React, { useState } from 'react';

function LoginPanel({ onLogin, loginError }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(username, password);
    };

    return (
        <div className="panel">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="form-group">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {loginError && <p className="error">{loginError}</p>}
                <button type="submit" className="button button-primary">Login</button>
            </form>
        </div>
    );
}

export default LoginPanel;