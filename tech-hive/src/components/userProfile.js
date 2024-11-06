import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import css from '../styles/userprofile.css'

const UserProfile = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [profileInfo, setProfileInfo] = useState({
        username: '',
        profilePicture: '',
        bio: '',
        email: '',
        phone: '',
        location: '',
        language: 'English',
        theme: 'Light',
        notificationSettings: 'All',
        socialLinks: { twitter: '', linkedin: '' },
        firstName: '',
        lastName: '',
        uid: '',
        creationDate: '',
        lastLogin: '',
        twoFactorAuth: false,
        privacySettings: 'Public'
    });
    const [currentSection, setCurrentSection] = useState('basic-info');

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser) {
            setProfileInfo(storedUser);
            setLoading(false);
        } else {
            const getUser = async () => {
                try {
                    const response = await axios.get('https://the-hive-backend.onrender.com/api/user');
                    setProfileInfo(response.data);
                    localStorage.setItem('user', JSON.stringify(response.data));
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching user data", error);
                    setLoading(false);
                }
            };
            getUser();
        }
    }, []);

    const handleEditToggle = () => setIsEditing(!isEditing);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        localStorage.setItem('user', JSON.stringify(profileInfo));
        setIsEditing(false);
    };

    const track = () => {
        navigate('/track')
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1>User Profile</h1>

            <nav>
                <button className='user-Btns' onClick={() => setCurrentSection('basic-info')}>Basic Info</button>
                <button className='user-Btns' onClick={() => setCurrentSection('contact-info')}>Contact Info</button>
                <button className='user-Btns' onClick={() => setCurrentSection('account-details')}>Account Details</button>
                <button className='user-Btns' onClick={() => setCurrentSection('preferences')}>Preferences</button>
                <button className='user-Btns' onClick={() => setCurrentSection('social-links')}>Social Links</button>
                <button className='user-Btns' onClick={() => setCurrentSection('security-privacy')}>Security & Privacy</button>
            </nav>

            {currentSection === 'basic-info' && (
                <section className="basic-info">
                    <h2>Basic Information</h2>
                    <p className='texts'><strong>Username:</strong> {profileInfo.username || 'Not provided'}</p>
                    <p className='texts'><strong>Full Name:</strong> {profileInfo.firstName} {profileInfo.lastName}</p>
                    {profileInfo.profilePicture && (
                        <img src={profileInfo.profilePicture} alt="Profile" />
                    )}
                    <p className='texts'><strong>Bio:</strong> {profileInfo.bio || 'Not provided'}</p>
                </section>
            )}

            {currentSection === 'contact-info' && (
                <section className="contact-info">
                    <h2>Contact Information</h2>
                    <p className='texts'><strong>Email:</strong> {profileInfo.email}</p>
                    <p className='texts'><strong>Phone:</strong> {profileInfo.phone}</p>
                    <p className='texts'><strong>Location:</strong> {profileInfo.location}</p>
                </section>
            )}

            {currentSection === 'account-details' && (
                <section className="account-details">
                    <h2>Account Details</h2>
                    <p className='texts'><strong>User ID:</strong> {profileInfo.uid}</p>
                    <p className='texts'><strong>Account Created:</strong> {profileInfo.creationDate}</p>
                    <p className='texts'><strong>Last Login:</strong> {profileInfo.lastLogin}</p>
                </section>
            )}

            {currentSection === 'preferences' && (
                <section className="preferences">
                    <h2>Preferences</h2>
                    <p className='texts'><strong>Language:</strong> {profileInfo.language}</p>
                    <p className='texts'><strong>Theme:</strong> {profileInfo.theme}</p>
                    <p className='texts'><strong>Notifications:</strong> {profileInfo.notificationSettings}</p>
                </section>
            )}

            {currentSection === 'social-links' && (
                <section className="social-links">
                    <h2>Social Links</h2>
                    <p><strong>Twitter:</strong> {profileInfo.socialLinks.twitter}</p>
                    <p><strong>LinkedIn:</strong> {profileInfo.socialLinks.linkedin}</p>
                </section>
            )}

            {currentSection === 'security-privacy' && (
                <section className="security-privacy">
                    <h2>Security and Privacy</h2>
                    <p><strong>Password Reset Options:</strong> Enabled</p>
                    <p><strong>Two-Factor Authentication:</strong> {profileInfo.twoFactorAuth ? 'Enabled' : 'Disabled'}</p>
                    <p><strong>Privacy Settings:</strong> {profileInfo.privacySettings}</p>
                </section>
            )}

            {isEditing && (
                <div className="edit-profile">
                    <h3>Edit Profile Information</h3>
                    <input
                        type="text"
                        name="username"
                        className='input'
                        placeholder="Username"
                        value={profileInfo.username}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="profilePicture"
                        className='input'
                        placeholder="Profile Picture URL"
                        value={profileInfo.profilePicture}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="bio"
                        className='input'
                        placeholder="Bio"
                        value={profileInfo.bio}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="phone"
                        className='input'
                        placeholder="Phone"
                        value={profileInfo.phone}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="location"
                        className='input'
                        placeholder="Location"
                        value={profileInfo.location}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="language"
                        className='input'
                        placeholder="Language"
                        value={profileInfo.language}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="theme"
                        className='input'
                        placeholder="Theme"
                        value={profileInfo.theme}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleSave}>Save Changes</button>
                    <button onClick={handleEditToggle}>Cancel</button>
                </div>
            )}
            <button onClick={handleEditToggle} className='fun-btns'>Edit Profile</button>
            <button onClick={track}  className='fun-btns'>View Order</button>
        </div>
    );
};

export default UserProfile;
