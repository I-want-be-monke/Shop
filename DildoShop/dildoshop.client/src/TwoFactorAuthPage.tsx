import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import './ShopShelf.css';

const SettingsPage: React.FC = () => {
    const location = useLocation();
    const email = location.state?.email; // �������� ����� �� ���������
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);
    const [code, setCode] = useState('');
    const [codeSent, setCodeSent] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // �������� ������� 2FA ��� ������� ������������
        const check2FAStatus = async () => {
            try {
                const response = await axios.get(`https://localhost:7295/api/TwoFactorAuth/status?email=${email}`);
                setIs2FAEnabled(response.data.is2FAEnabled);
            } catch (err: unknown) {
                if (axios.isAxiosError(err)) {
                    console.error('Error fetching 2FA status:', err.message);
                } else {
                    console.error('Unexpected error:', err);
                }
            }
        };

        if (email) {
            check2FAStatus();
        }
    }, [email]);

    const handleEnable2FA = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.match(/^\S+@\S+\.\S+$/)) {
            setError('Please enter a valid email address');
            return;
        }

        try {
            const response = await axios.post('https://localhost:7295/api/TwoFactorAuth/send-code', { email }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                setCodeSent(true);
                setError('');
            }
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const axiosError = err as AxiosError;
                setError('Failed to send verification code: ' + (axiosError.response?.data || axiosError.message));
            } else {
                setError('An unexpected error occurred: ' + err);
            }
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
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const axiosError = err as AxiosError;
                setError('Invalid verification code: ' + (axiosError.response?.data || axiosError.message));
            } else {
                setError('An unexpected error occurred: ' + err);
            }
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
                                    readOnly 
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

