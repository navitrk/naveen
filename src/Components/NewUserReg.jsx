import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';

const NewUserReg = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook

    const [formData, setFormData] = useState({
        name: '',
        dateOfBirth: '',
        email: '',
        password: '',
        userType: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.userType) {
            alert('Please select a user type.');
            return;
        }

        if (!formData.email || !formData.dateOfBirth || !formData.password || !formData.userType) {
            alert('*** Please fill all the required fields ***');
            return;
        }

        const currentYear = new Date().getFullYear();
        const minBirthYear = currentYear - 21;

        const { dateOfBirth } = formData;
        const birthYear = new Date(dateOfBirth).getFullYear();

        if (birthYear > minBirthYear) {
            alert('You must be at least 21 years old to register.');
            return;
        }

        // Validate password
        if (!isPasswordValid(formData.password)) {
            alert('Password must be at least 8 characters long and contain alphabets, special characters, and numerals.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8085/users/add', formData);
            console.log(response.data);

            if (response.data === 'Email already exists!') {
                alert('Email already exists!');
            } else {
                setFormData({
                    name: '',
                    dateOfBirth: '',
                    email: '',
                    password: '',
                    userType: ''
                });

                alert('User registered successfully!');
                navigate('/UserLogIn'); // Navigate to "/UserLogIn" after successful registration
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    const isPasswordValid = (password) => {
        // Password must be at least 8 characters long and contain alphabets, special characters, and numerals.
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleLoginClick = () => {
        navigate('/UserLogIn'); // Navigate to "/UserLogIn" route
    };

    return (
        <div>
            <Header />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div style={{ textAlign: 'center' }}>
                    <h2>Registration Form</h2>
                    <div style={{ border: '8px solid green', padding: '20px', borderRadius: '10px', width: '400px', textAlign: 'center' }}>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                <label style={{ marginRight: '10px', textAlign: 'right', minWidth: '100px' }}>User Type:</label>
                                <input
                                    type="radio"
                                    id="employee"
                                    name="userType"
                                    value="EMPLOYEE"
                                    checked={formData.userType === 'EMPLOYEE'}
                                    onChange={handleChange}
                                />
                                <label htmlFor="employee" style={{ marginRight: '10px' }}>Employee</label>
                                <input
                                    type="radio"
                                    id="admin"
                                    name="userType"
                                    value="ADMIN"
                                    checked={formData.userType === 'ADMIN'}
                                    onChange={handleChange}
                                />
                                <label htmlFor="admin">Admin</label>
                            </div>
                            <div style={{ marginBottom: '10px', textAlign: 'center' }}>
                                <label>Name:</label>
                                <input type="text" name="name" placeholder="Nick name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div style={{ marginBottom: '10px', textAlign: 'center' }}>
                                <label>Date of Birth:</label>
                                <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                            </div>
                            <div style={{ marginBottom: '10px', textAlign: 'center' }}>
                                <label>Email:</label>
                                <input type="email" name="email" placeholder="Email *" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div style={{ marginBottom: '10px', textAlign: 'center' }}>
                                <label>Password:</label>
                                <input type="password" name="password" placeholder="Password *" value={formData.password} onChange={handleChange} required />
                            </div>

                            <button type="submit" style={{ backgroundColor: '#FFA500', padding: '15px', fontSize: '16px', borderRadius: '8px', cursor: 'pointer' }}>Register</button>
                        </form>
                    </div>
                    <p>Already signed up? <button style={{ backgroundColor: '#FFA500', padding: '15px', fontSize: '16px', borderRadius: '8px', cursor: 'pointer' }} onClick={handleLoginClick}>Login</button></p>
                </div>
            </div>
        </div>
    );
};

export default NewUserReg;
