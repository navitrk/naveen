import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Header = () => {
    const [isCustomerExpanded, setIsCustomerExpanded] = useState(false);
    const [isEmployeeExpanded, setIsEmployeeExpanded] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        // Check if the user is logged in
        const authToken = localStorage.getItem('authToken');
        const storedUserEmail = localStorage.getItem('email');
        setIsLoggedIn(!!authToken && !!storedUserEmail);
        setUserEmail(storedUserEmail || '');
    }, []);

    const handleMoreClick = () => {
        setIsExpanded(!isExpanded);
        setIsCustomerExpanded(false);
        setIsEmployeeExpanded(false);
    };

    const handleCustomersClick = () => {
        setIsCustomerExpanded(!isCustomerExpanded);
        setIsEmployeeExpanded(false);
    };

    const handleEmployeesClick = () => {
        setIsEmployeeExpanded(!isEmployeeExpanded);
        setIsCustomerExpanded(false);
    };

    const handleMenuItemClick = (menu) => {
        console.log(`Clicked on ${menu}`);

        if (menu === 'Login') {
            navigate('/UserLogIn');
        }
    };

    const handleHeaderButtonClick = () => {
        navigate('/');
    };

    const handleLogout = () => {
        // Clear authentication token and user email from local storage
        localStorage.removeItem('authToken');
        localStorage.removeItem('email');
        setIsLoggedIn(false);
        setUserEmail('');
        navigate('/UserLogIn');
    };

    return (
        <>
            <div style={{ position: 'sticky', top: 0, zIndex: 2 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#333', color: '#fff' }}>
                    <button onClick={handleHeaderButtonClick} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 'bold', color: 'gold', textDecoration: 'none' }}>BenchBank</button>
                    <div style={{ flex: 1, textAlign: 'center' }}>
                        <div style={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>
                            {location.pathname === '/UserLogIn' ? 'User LogIn' : ''}
                            {location.pathname === '/NewUserReg' ? 'User registration' : ''}
                        </div>
                    </div>
                    {(location.pathname === '/NewCustomer' || location.pathname === '/allCustomers' || location.pathname === '/FetchCustomer') && (
                        <div style={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>CUSTOMER MANAGEMENT</div>
                    )}
                    {(isLoggedIn && location.pathname === '/LandingPage' || isLoggedIn && location.pathname === '/NewCustomer' || isLoggedIn && location.pathname === '/allCustomers' || isLoggedIn && location.pathname === '/FetchCustomer') && (
                        <div style={{ textAlign: 'right' }}>
                            <span>Logged in as {userEmail}</span>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                    {location.pathname !== '/LandingPage' && location.pathname !== '/UserLogIn' && location.pathname !== '/allCustomers' && location.pathname !== '/FetchCustomer' && location.pathname !== '/NewCustomer' && location.pathname !== '/NewUserReg' && (
                        <div style={{ position: 'relative' }}>
                            <button onClick={handleMoreClick} style={{ backgroundColor: 'transparent', color: '#fff', border: 'none', cursor: 'pointer' }}>More ↓ ⋮</button>
                            {isExpanded && (
                                <div style={{ position: 'absolute', top: '100%', right: 0, backgroundColor: '#333', minWidth: '150px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)', zIndex: 1 }}>
                                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                        <li>
                                            <button onClick={handleCustomersClick} style={{ backgroundColor: 'transparent', color: '#fff', border: 'none', cursor: 'pointer', padding: '10px', width: '100%', textAlign: 'left' }}>For Customers →</button>
                                            {isCustomerExpanded && (
                                                <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                                    <li><button onClick={() => handleMenuItemClick('CustomerLogin')} style={{ backgroundColor: 'transparent', color: '#fff', border: 'none', cursor: 'pointer', padding: '10px', width: '100%', textAlign: 'center' }}>1. Login</button></li>
                                                    <li><button onClick={() => handleMenuItemClick('New Customer register')} style={{ backgroundColor: 'transparent', color: '#fff', border: 'none', cursor: 'pointer', padding: '10px', width: '100%', textAlign: 'center' }}>2. New Customer register</button></li>
                                                    <li><button onClick={() => handleMenuItemClick('Express interest to open a new account')} style={{ backgroundColor: 'transparent', color: '#fff', border: 'none', cursor: 'pointer', padding: '10px', width: '100%', textAlign: 'center' }}>3. Express interest to open a new account</button></li>
                                                </ul>
                                            )}
                                        </li>
                                        <li>
                                            <button onClick={handleEmployeesClick} style={{ backgroundColor: 'transparent', color: '#fff', border: 'none', cursor: 'pointer', padding: '10px', width: '100%', textAlign: 'left' }}>For Employees/Admins →</button>
                                            {isEmployeeExpanded && (
                                                <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                                    <li><button onClick={() => handleMenuItemClick('Login')} style={{ backgroundColor: 'transparent', color: '#fff', border: 'none', cursor: 'pointer', padding: '10px', width: '100%', textAlign: 'center' }}>1. Login</button></li>
                                                </ul>
                                            )}
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Header;
