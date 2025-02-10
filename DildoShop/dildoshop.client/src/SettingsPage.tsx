import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import './ShopShelf.css';

const SettingsPage: React.FC = () => {
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [codeSent, setCodeSent] = useState(false);
    const [error, setError] = useState('');

    const handleEnable2FA = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.match(/^\S+@\S+\.\S+$/)) {
            setError('Please enter a valid email address');
            return;
        }

        try {
            const response = await axios.post('https://localhost:7295/api/TwoFactorAuth/send-code', email, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                setCodeSent(true);
                setError('');
            }
        } catch (err) {
            setError('Failed to send verification code');
            console.error(err);
        }
    };

    const handleVerifyCode = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://localhost:7295/api/TwoFactorAuth/verify-code', {
                email,
                code,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                setIs2FAEnabled(true);
                setError('');
            }
        } catch (err) {
            setError('Invalid verification code');
            console.error(err);
        }
    };

    return (
        <div className="shop-container">
            <div className="glass-card">
                <div className="shop-header">
                    <h1 className="title">
                        Account <span>Settings</span>
                    </h1>
                    <Link to="/" className="cart-link">
                        ? Back to Shop
                    </Link>
                </div>

                <div className="settings-content">
                    <div className="security-card">
                        <h3>Two-Factor Authentication</h3>
                        <div className="toggle-row">
                            <span>Status: {is2FAEnabled ? 'Enabled' : 'Disabled'}</span>
                            <button
                                className={`toggle-btn ${is2FAEnabled ? 'enabled' : ''}`}
                                onClick={() => setIs2FAEnabled(!is2FAEnabled)}
                            >
                                <div className="toggle-knob" />
                            </button>
                        </div>

                        {!is2FAEnabled && (
                            <form onSubmit={handleEnable2FA} className="auth-form">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <button type="submit" className="auth-button">
                                    Send Verification Code
                                </button>
                            </form>
                        )}

                        {codeSent && !is2FAEnabled && (
                            <form onSubmit={handleVerifyCode} className="auth-form">
                                <input
                                    type="text"
                                    placeholder="Enter verification code"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    required
                                />
                                <button type="submit" className="auth-button">
                                    Verify Code
                                </button>
                            </form>
                        )}

                        {error && <div className="error-message">{error}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
