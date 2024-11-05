import React, { useState } from 'react';
import axios from 'axios';
import { FidgetSpinner } from 'react-loader-spinner'; 
import '../styles/auth.css';
import { useNavigate } from 'react-router';
import logo from '../components/removed-background.png';

const API_URL = 'http://localhost:5000/api';

const LoginAdmin = () => {
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

    const Login = async (e) => {
        e.preventDefault();
        setLoading(true); 
        try {
            const response = await axios.post(`${API_URL}/Login`, {
                email: loginEmail,
                password: loginPassword,
            });
            navigate('/admin');
           
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false); 
        }
    };


    return(
<div>
<div className="left-section">
                            <h1>
                                <img src={logo} alt="Logo" className='logo' />
                                Welcome back
                            </h1>
                            <form onSubmit={Login}>
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
</div>
    );
};



export default LoginAdmin