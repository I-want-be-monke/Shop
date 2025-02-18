import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import './RegisterPage.css';

interface RegisterResponse {
    message: string;
}

interface ErrorResponse {
    message: string;
}

const Registration: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>(''); 
    const [gender, setGender] = useState<string>('male');
    const [preferredSize, setPreferredSize] = useState<number | ''>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        try {
            await axios.post<RegisterResponse>('https://localhost:7295/api/Auth/register', {
                Login: username,
                Password: password,
                Mail: email, 
                Gender: gender,
                PreferredDildoSize: preferredSize
            });
            setMessage(`Welcome ${username}! Your profile has been created successfully.`);
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            const errorMessage = axiosError.response?.data?.message || 'Registration error';
            setMessage(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="registration-container">
            <div className="glass-card">
                <form onSubmit={handleSubmit}>
                    <h1 className="title">
                        Join <span>Passion</span> Paradise
                    </h1>

                    <div className="input-group">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            className="styled-input"
                            disabled={isSubmitting}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="styled-input"
                            disabled={isSubmitting}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="styled-input"
                            disabled={isSubmitting}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <div className="select-wrapper">
                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="styled-input"
                                disabled={isSubmitting}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="input-group">
                        <input
                            type="number"
                            value={preferredSize === '' ? '' : preferredSize}
                            onChange={(e) => {
                                const value = e.target.value;
                                const numberValue = value ? parseInt(value) : '';
                                setPreferredSize(numberValue);
                            }}
                            placeholder="Preferred Size"
                            className="styled-input"
                            disabled={isSubmitting}
                        />
                    </div>

                    <button
                        type="submit"
                        className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Creating Account...' : 'Register Now'}
                    </button>

                    <div className="alternate-action">
                        <span>Already have an account? </span>
                        <Link to="/login" className="link">
                            Sign In
                        </Link>
                    </div>

                    {message && (
                        <div className={`message ${message.includes('Welcome') ? 'success' : 'error'}`}>
                            {message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Registration;
