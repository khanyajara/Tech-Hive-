import React, { useState } from 'react';
import axios from 'axios';
import { FidgetSpinner } from 'react-loader-spinner'; 
import '../styles/auth.css';
import { useNavigate } from 'react-router';
import logo from '../components/removed-background.png';

const API_URL = 'https://the-hive-backend.onrender.com/api';

const LoginSignUp = () => {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [signupFirstName, setSignupFirstName] = useState('');
    const [signupLastName, setSignupLastName] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [resetEmail, setResetEmail] = useState('');
    const [activeForm, setActiveForm] = useState('login');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false); 

    const navigate = useNavigate();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); 
        try {
            const response = await axios.post(`${API_URL}/Login`, {
                email: loginEmail,
                password: loginPassword,
            });
            const { role, user } = response.data;
            localStorage.setItem('user', JSON.stringify(user));
            if (!role) {
                navigate('/home');
            } else if (role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/home');
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false); 
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); 
        try {
            const response = await axios.post(`${API_URL}/Signup`, {
                email: signupEmail,
                password: signupPassword,
                firstName: signupFirstName,
                lastName: signupLastName,
            });
            const { user } = response.data;
            localStorage.setItem('user', JSON.stringify(user)); 
            navigate('/home');
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Signup failed');
        } finally {
            setLoading(false); 
        }
    };

    const handleResetSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); 
        try {
            const response = await axios.post(`${API_URL}/resetPassword`, {
                email: resetEmail,
            });
            console.log(response.data);
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Password reset failed');
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="auth-container">
            {loading && (
                <div className="loader">
                    <FidgetSpinner
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="fidget-spinner-loading"
                        wrapperStyle={{}}
                        wrapperClass="loader"
                        ballColor="#00BFFF"
                    />
                </div>
            )}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <div className="form-and-features">
                <div className="form-column">
                    {activeForm === 'login' && (
                        <div className="left-section">
                            <h1>
                                <img src={logo} alt="Logo" className='logo' />
                                Welcome back
                            </h1>
                            <form onSubmit={handleLoginSubmit}>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className='input-field'
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className='input-field'
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                    />
                                </div>
                                <p className="terms"><a href="#" onClick={() => setActiveForm('reset')}>Forgot password?</a></p>
                                <button className="button">Login</button>
                                <p className="terms">Don't have an account? <a href="#" onClick={() => setActiveForm('signup')}>Sign up</a></p>
                            </form>
                        </div>
                    )}
                    {activeForm === 'signup' && (
                        <div className="right-section">
                            <img src={logo} alt="Logo" className='logo' />
                            <h2>Register</h2>
                            <form onSubmit={handleSignupSubmit}>
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        className='input-field'
                                        value={signupFirstName}
                                        onChange={(e) => setSignupFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        className='input-field'
                                        value={signupLastName}
                                        onChange={(e) => setSignupLastName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className='input-field'
                                        value={signupEmail}
                                        onChange={(e) => setSignupEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className='input-field'
                                        value={signupPassword}
                                        onChange={(e) => setSignupPassword(e.target.value)}
                                    />
                                </div>
                                <button className="button">Sign Up</button>
                                <p className="terms">Already have an account? <a href="#" onClick={() => setActiveForm('login')}>Sign in</a></p>
                            </form>
                        </div>
                    )}
                    {activeForm === 'reset' && (
                        <div className="right-section">
                            <h2>Forgot Password</h2>
                            <form onSubmit={handleResetSubmit}>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className='input-field'
                                        placeholder="Enter your email"
                                        value={resetEmail}
                                        onChange={(e) => setResetEmail(e.target.value)}
                                    />
                                </div>
                                <button className="button2">Send Reset Link</button>
                                <p className="terms"><a href="#" onClick={() => setActiveForm('login')}>Back to Login</a></p>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginSignUp;
