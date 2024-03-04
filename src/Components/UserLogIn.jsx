import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

const UserLogIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setFormData(prevState => ({
                ...prevState,
                email: storedEmail // Update email in the form data state
            }));
            setIsLoggedIn(true); // Set isLoggedIn to true if email is stored in localStorage
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send login request to the backend
            const response = await axios.post('http://localhost:8085/users/login', formData);
            console.log(response.data); // Log the response data for debugging

            // Check if the login was successful based on the response
            if (response.status === 200 && response.data === 'Login successful') {
                // Store the authentication token and email in local storage
                localStorage.setItem('authToken', response.headers['authorization']);
                localStorage.setItem('email', formData.email);

                // Update the isLoggedIn state to indicate the user is logged in
                setIsLoggedIn(true);

                // Redirect to LandingPage after successful login
                navigate('/LandingPage');
            } else {
                // Handle other responses or display error messages
                // For example, if the response indicates invalid credentials
                // you can display an appropriate error message to the user
                alert('Invalid email or password. Please try again.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            // Handle error, e.g., display error message to the user
            alert('Server not online. Please try again later.');
        }
    };

    const handleLogout = () => {
        // Clear localStorage and update isLoggedIn state to false
        localStorage.removeItem('authToken');
        localStorage.removeItem('email');
        setIsLoggedIn(false);
    };

    return (
        <div>
            <Header />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div style={{ textAlign: 'center' }}>
                    <h2>ADMIN / EMPLOYEE</h2>
                    {isLoggedIn ? ( // If user is logged in
                        <div style={{ border: '8px solid green', padding: '20px', borderRadius: '10px', width: '400px', textAlign: 'center' }}>
                            <h3>Session is going on</h3>
                            <button onClick={handleLogout} style={{ backgroundColor: '#FFA500', padding: '15px', fontSize: '16px', borderRadius: '8px', cursor: 'pointer' }}>Logout</button>
                        </div>
                    ) : ( // If user is not logged in
                        <div>
                            <div style={{ border: '8px solid green', padding: '20px', borderRadius: '10px', width: '400px', textAlign: 'center' }}>
                                <form onSubmit={handleSubmit}>
                                    <div style={{ marginBottom: '10px', textAlign: 'center' }}>
                                        <label>Email:</label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            style={{ border: '2px solid green', borderRadius: '5px', padding: '5px', marginRight: '10px' }}
                                            required
                                        />
                                    </div>
                                    <div style={{ marginBottom: '10px', textAlign: 'center' }}>
                                        <label>Password:</label>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            style={{ border: '2px solid green', borderRadius: '5px', padding: '5px', marginRight: '10px' }}
                                            required
                                        />
                                    </div>

                                    <button type="submit" style={{ backgroundColor: '#FFA500', padding: '15px', fontSize: '16px', borderRadius: '8px', cursor: 'pointer' }}>Login</button>
                                </form>
                            </div>
                            <div style={{ marginTop: '20px' }}>
                                <h7>New User?</h7>
                                <Link to="/NewUserReg" style={{ textDecoration: 'none' }}>
                                    <button style={{ backgroundColor: '#FFA500', padding: '15px', fontSize: '16px', borderRadius: '8px', cursor: 'pointer' }}>Register</button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserLogIn;
