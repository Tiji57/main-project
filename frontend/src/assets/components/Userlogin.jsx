import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Userlogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await fetch('http://localhost:4000/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.success) {
                alert('Login successful!');
                localStorage.setItem('token', data.token);  // Store the token
                localStorage.setItem('userId', data._id);  // Store the user ID
        
                console.log('User ID in Local Storage:', localStorage.getItem('userId')); 

                // Store className and busNo based on the role
                if (data.role === 'teacher') {
                    navigate('/Display');
                } else if (data.role === 'driver/helper') {
                    localStorage.setItem('busNo', data.busNo);  // Store busNo for driver/helper
                    console.log('Busno in Local Storage:', localStorage.getItem('busNo')); 
                    navigate('/Driver');
                } else {
                    // You can store additional info for finance or other roles if needed
                    navigate('/Finance');
                }
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage('Error: ' + error.message);
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #2c3e50, #3498db)',  // Gradient from #2c3e50 to #3498db
                fontFamily: 'Arial, sans-serif',
                animation: 'fadeIn 1.5s ease-in-out',
            }}
        >
            <div
                style={{
                    backgroundColor: 'transparent', // Made the container transparent
                    padding: '40px',
                    borderRadius: '8px',
                    width: '100%',
                    maxWidth: '400px',
                    boxShadow: '0 0 15px rgba(255, 255, 255, 0.7)', // Updated boxShadow
                    textAlign: 'center',
                    animation: 'glow 2s infinite linear', // Added the glowing animation in a circular motion
                    border: '1px solid rgba(255, 255, 255, 0.2)', // Optional: Adds a subtle border around the form container
                }}
            >
                <h2
                    style={{
                        fontSize: '2rem',
                        color: '#fff',
                        marginBottom: '20px',
                        fontWeight: '600',
                    }}
                >
                    User Login
                </h2>
                {message && (
                    <p
                        style={{
                            color: 'red',
                            fontSize: '0.9rem',
                            marginBottom: '15px',
                        }}
                    >
                        {message}
                    </p>
                )}
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="User Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '12px',
                            margin: '10px 0',
                            borderRadius: '5px',
                            border: '1px solid #ddd',
                            fontSize: '1rem',
                            boxSizing: 'border-box',
                            outline: 'none',
                            transition: 'border 0.3s ease',
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '12px',
                            margin: '10px 0',
                            borderRadius: '5px',
                            border: '1px solid #ddd',
                            fontSize: '1rem',
                            boxSizing: 'border-box',
                            outline: 'none',
                            transition: 'border 0.3s ease',
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '12px',
                            marginTop: '15px',
                            backgroundColor: '#007bff',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease',
                        }}
                        onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
                        onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Userlogin;
