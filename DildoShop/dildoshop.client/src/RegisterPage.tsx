import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RegisterPage.css';

const Registration: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [gender, setGender] = useState<string>('male');
    const [preferredSize, setPreferredSize] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            if (username && password && preferredSize) {
                setMessage(`Welcome ${username}! Your profile created successfully`);
            } else {
                setMessage('Please fill in all required fields');
            }
            setIsSubmitting(false);
        }, 1500);
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="styled-input"
                            disabled={isSubmitting}
                        />
                        <div className="input-icon">
                            <svg className="icon" viewBox="0 0 24 24">
                                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                            </svg>
                        </div>
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
                            <div className="input-icon">
                                <svg className="icon" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm4-2H9v-2h6v2zm0-4H9V8h6v2z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="input-group">
                        <input
                            type="text"
                            value={preferredSize}
                            onChange={(e) => setPreferredSize(e.target.value)}
                            placeholder="Preferred Size"
                            className="styled-input"
                            disabled={isSubmitting}
                        />
                        <div className="input-icon">
                            <svg className="icon" viewBox="0 0 24 24">
                                <path d="M16 3h-2v10.56c-.59-.35-1.27-.56-2-.56-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V5h2v-2zm-4 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                            </svg>
                        </div>
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
                            <svg className="message-icon" viewBox="0 0 24 24">
                                {message.includes('Welcome') ? (
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

export default Registration;