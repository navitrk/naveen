import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';


const AllCustomers = () => {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:8085/cust/all');
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
            setError('Error fetching customers records. Please try again later.');
        }
    };

    const handleDelete = async (customerId) => {
        const confirmed = window.confirm('Are you sure you want to delete this customer?');
        if (confirmed) {
            try {
                await axios.delete(`http://localhost:8085/cust/del/${customerId}`);
                setCustomers(customers.filter(customer => customer.id !== customerId));
            } catch (error) {
                console.error('Error deleting customer:', error);
                setError(`Error deleting the customer record : ${error.message}`);
            }
        }
    };

    const handleFetchCustomerById = () => {
        // redirecting to allCustomers Page
        navigate('/FetchCustomer');
    };

    return (
        <div>
            <Header />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
                <div style={{ border: '8px solid green', padding: '6px', borderRadius: '10px', width: '250px' }}>
                    <h2 style={{ textAlign: 'center', color: '#FFD700' }}>All Customers</h2>
                </div>
                {error && (
                    <div style={{ marginTop: '20px' }}>
                        <h3 style={{ textAlign: 'center', color: 'red' }}>{error}</h3>
                    </div>
                )}
                {customers.length > 0 && (
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <button onClick={handleFetchCustomerById} style={{ padding: '15px', fontSize: '16px', borderRadius: '8px', cursor: 'pointer' }}>Fetch Customer record by ID</button>
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                            <thead>
                                <tr>
                                    <th style={{ border: '1px solid black', padding: '8px' }}>Customer ID</th>
                                    <th style={{ border: '1px solid black', padding: '8px' }}>First Name</th>
                                    <th style={{ border: '1px solid black', padding: '8px' }}>Last Name</th>
                                    <th style={{ border: '1px solid black', padding: '8px' }}>Phone Number</th>
                                    <th style={{ border: '1px solid black', padding: '8px' }}>Email</th>
                                    <th style={{ border: '1px solid black', padding: '8px' }}>Address</th>
                                    <th style={{ border: '1px solid black', padding: '8px' }}>Pincode</th>
                                    <th style={{ border: '1px solid black', padding: '8px' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map(customer => (
                                    <tr key={customer.id}>
                                        <td style={{ border: '1px solid black', padding: '8px' }}>{customer.id}</td>
                                        <td style={{ border: '1px solid black', padding: '8px' }}>{customer.fName}</td>
                                        <td style={{ border: '1px solid black', padding: '8px' }}>{customer.lName}</td>
                                        <td style={{ border: '1px solid black', padding: '8px' }}>{customer.phoneNumber}</td>
                                        <td style={{ border: '1px solid black', padding: '8px' }}>{customer.email}</td>
                                        <td style={{ border: '1px solid black', padding: '8px' }}>{customer.address}</td>
                                        <td style={{ border: '1px solid black', padding: '8px' }}>{customer.pincode}</td>
                                        <td style={{ border: '1px solid black', padding: '8px' }}>
                                            <button onClick={() => handleDelete(customer.id)} style={{ padding: '5px', fontSize: '14px', borderRadius: '4px', backgroundColor: 'red', color: 'white', border: 'none' }}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllCustomers;
