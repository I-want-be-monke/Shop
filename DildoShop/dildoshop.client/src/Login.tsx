import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import './Login.css';

// Интерфейс для структуры ответа об ошибке
interface ErrorResponse {
    message: string;
}

// Интерфейс для структуры ответа о пользователе
interface UserResponse {
    message: string;
    is2FAEnabled: boolean;
    email: string;
}

const Login: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [inputPassword, setInputPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        try {
            const response = await axios.post<UserResponse>('https://localhost:7295/api/auth/login', {
                login: inputValue,
                password: inputPassword
            });
            setMessage(response.data.message);


            if (response.data.is2FAEnabled) {
                navigate('/TwoFactorAuth', { state: { email: response.data.email } });
            } else {
               navigate('/')
            }
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>; // Приведение типа
            const errorMessage = axiosError.response?.data.message || 'Login error';
            setMessage(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="login-container">
            <div className="glass-card">
                <form onSubmit={handleSubmit}>
                    <h1 className="title">
                        Welcome to <span>Passion</span> Paradise
                    </h1>

                    <div className="input-group">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Email or Username"
                            className="styled-input"
                            disabled={isSubmitting}
                            required
                        />
                        <div className="input-icon">
                            <svg className="icon" viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                        </div>
                    </div>

                    <div className="input-group">
                        <input
                            type="password"
                            value={inputPassword}
                            onChange={(e) => setInputPassword(e.target.value)}
                            placeholder="Password"
                            className="styled-input"
                            disabled={isSubmitting}
                            required
                        />
                        <div className="input-icon">
                            <svg className="icon" viewBox="0 0 24 24">
                                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                            </svg>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Authenticating...' : 'Continue'}
                    </button>
                    <div className="alternate-action">
                        <span>New here? </span>
                        <Link to="/registration" className="link">
                            Create account
                        </Link>
                    </div>

                    {message && (
                        <div className={`message ${message.startsWith('Welcome') ? 'success' : 'error'}`}>
                            <svg className="message-icon" viewBox="0 0 24 24">
                                {message.startsWith('Welcome') ? (
                                    <path d="M20 12a8 8 0 11-16 0 8 8 0 0116 0zm-3-7l1.5 1.5L12 14l-3-3 1.5-1.5L12 11l5-6z" />
                                ) : (
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                                )}
                            </svg>
                            {message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Login;
