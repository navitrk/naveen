import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from react-router-dom

const HomePage = () => {
    const [isCustomerExpanded, setIsCustomerExpanded] = useState(false);
    const [isEmployeeExpanded, setIsEmployeeExpanded] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate(); // Initialize navigate

    const handleMoreClick = () => {
        setIsExpanded(!isExpanded);
        setIsCustomerExpanded(false); // Close Customers dropdown when More is clicked
        setIsEmployeeExpanded(false); // Close Employees/Admins dropdown when More is clicked
    };

    const handleCustomersClick = () => {
        setIsCustomerExpanded(!isCustomerExpanded);
        setIsEmployeeExpanded(false); // Close Employees/Admins dropdown when Customers is clicked
    };

    const handleEmployeesClick = () => {
        setIsEmployeeExpanded(!isEmployeeExpanded);
        setIsCustomerExpanded(false); // Close Customers dropdown when Employees/Admins is clicked
    };

    const handleMenuItemClick = (menu) => {
        console.log(`Clicked on ${menu}`);

        // we can handle menu item clicks here
        if (menu === 'UserLogin') {
            // Navigate to the /UserLogIn page
            navigate('/UserLogIn');
        }

    };

    const handleHeaderButtonClick = () => {
        // Redirect to the header page using navigate
        navigate('/');
    };

    return (
        <>
            <div style={{ position: 'sticky', top: 0, zIndex: 2 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#333', color: '#fff' }}>
                    {/* HomePage button */}
                    <button onClick={handleHeaderButtonClick} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 'bold', color: 'gold', textDecoration: 'none' }}>BenchBank</button>
                    <div style={{ position: 'relative' }}>
                        {/* More drop down button */}
                        <button onClick={handleMoreClick} style={{ backgroundColor: 'transparent', color: '#fff', border: 'none', cursor: 'pointer' }}>More ↓ ⋮</button>
                        {isExpanded && (
                            <div style={{ position: 'absolute', top: '100%', right: 0, backgroundColor: '#333', minWidth: '150px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)', zIndex: 1 }}>
                                <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                    <li>
                                        {/* For customer nested button */}
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
                                        {/* For Employee/Admin nested button */}
                                        <button onClick={handleEmployeesClick} style={{ backgroundColor: 'transparent', color: '#fff', border: 'none', cursor: 'pointer', padding: '10px', width: '100%', textAlign: 'left' }}>Employees/Admins →</button>
                                        {isEmployeeExpanded && (
                                            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                                <li><button onClick={() => handleMenuItemClick('UserLogin')} style={{ backgroundColor: 'transparent', color: '#fff', border: 'none', cursor: 'pointer', padding: '10px', width: '100%', textAlign: 'center' }}>1. Login</button></li>
                                            </ul>
                                        )}
                                    </li>

                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div style={{ backgroundImage: 'url(https://preview.free3d.com/img/2023/08/3191685632745276929/ap764576.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {/* we can add page content here */}
                <h1 style={{ color: '#FFD700', fontSize: '60px' }}>Welcome to BenchBank!</h1>
            </div>
        </>
    );
};

export default HomePage;
