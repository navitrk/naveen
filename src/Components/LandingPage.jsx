import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

function Card({ background, buttonText, link }) {
    const handleClick = () => {
        window.location.href = link;
    };

    return (
        <div className="card" style={{ background }}>
            <div className="card-content">
                <button className="btn" onClick={handleClick}>
                    {buttonText}
                </button>
            </div>
        </div>
    );
}

function LandingPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        // Check if the authentication token is present in local storage
        const authToken = localStorage.getItem('authToken');
        setIsLoggedIn(!!authToken); // Update isLoggedIn state based on token presence
        // !! is converting into boolean value 

        // Retrieve user email from local storage
        const storedUserEmail = localStorage.getItem('email');
        setUserEmail(storedUserEmail || ''); // Set user email or empty string if not available
    }, []);

    const handleLogout = () => {
        // Clear authentication token and user email from local storage
        localStorage.removeItem('authToken');
        localStorage.removeItem('email');
        setIsLoggedIn(false); // Update isLoggedIn state to false
    };

    return (
        <div>
            <Header />

            <style>
                {`
                .container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }

                .card {
                    width: 300px;
                    height: 200px;
                    margin-right: 20px; /* Add margin between cards */
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transition: transform 0.3s ease;
                }

                .btn {
                    padding: 10px 20px;
                    background-color: #BCB88A;
                    color: #013220;
                    text-decoration: none;
                    border-radius: 8px;
                    transition: background-color 0.3s ease;
                }

                .logout {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                }
                `}
            </style>

            {isLoggedIn ? (
                <div>
                    <div className="logout">
                        <span>Logged in as {userEmail}</span>
                        <button onClick={handleLogout}>Logout</button>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '50px' }}>
                        <h1>Welcome to BenchBank!</h1>
                    </div>

                    <div className="container">
                        <Card background="#ffcccc" buttonText="Customer Management" link="/NewCustomer" />
                        <Card background="#ccffcc" buttonText="Transactions" link="/page2" />
                        <Card background="#ccccff" buttonText="Manage profile" link="/page3" />
                    </div>
                </div>
            ) : (
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <h1>You are not logged in.</h1>
                    <Link to="/UserLogIn"><button>Login</button></Link>
                </div>
            )}
        </div>
    );
}

export default LandingPage;
