import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';

const NewCustomerRecord = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fName: '',
        lName: '',
        phoneNumber: '',
        email: '',
        address: '',
        pincode: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        //phone number data validation
        if (name === "phoneNumber") {
            if (value !== "" && !/^\d*$/.test(value)) {
                alert('Phone number should contain only numbers.');
                return;
            }

            if (value.length > 10) {
                alert('Phone number should be maximum 10 digits long.');
                return;
            }
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.lName || !formData.fName || !formData.phoneNumber || !formData.pincode) {
            alert('*** Please fill all the required fields ***');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8085/cust/add', formData);
            console.log(response.data);

            setFormData({
                fName: '',
                lName: '',
                phoneNumber: '',
                email: '',
                address: '',
                pincode: ''
            });

            document.getElementsByName("fName")[0].placeholder = "First Name";
            document.getElementsByName("lName")[0].placeholder = "Last Name";
            document.getElementsByName("phoneNumber")[0].placeholder = "Phone Number";
            document.getElementsByName("email")[0].placeholder = "Email";
            document.getElementsByName("address")[0].placeholder = "Address";
            document.getElementsByName("pincode")[0].placeholder = "Area pincode";

            alert(`Successfully created a record for ${formData.fName}`);
        } catch (error) {
            console.error('Error creating customer:', error);
        }
    };

    const handleFocus = (e) => {
        if (!e.target.value) {
            e.target.placeholder = '';
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        if (!value && !formData[name]) {
            e.target.placeholder = name.charAt(0).toUpperCase() + name.slice(1);
        }
    };


    const handleViewAllCustomers = () => {
        // redirecting to allCustomers Page
        navigate('/allCustomers');
    };

    const handleFetchCustomers = () => {
        // redirecting to FetchCustomer page
        navigate('/FetchCustomer');
    };

    return (
        <div>
            <Header />

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                {/* Green border */}
                <div style={{ border: '8px solid green', padding: '20px', borderRadius: '10px', width: '400px' }}>
                    <h2 style={{ textAlign: 'center', color: '#FFD700' }}>New customer record</h2>

                    {/* New customer form */}
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <input type="text" name="fName" placeholder="First Name *" value={formData.fName} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} style={{ marginBottom: '10px', width: '75%', textAlign: 'center', borderRadius: '8px', height: '30px' }} />
                        <input type="text" name="lName" placeholder="Last Name *" value={formData.lName} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} style={{ marginBottom: '10px', width: '75%', textAlign: 'center', borderRadius: '8px', height: '30px' }} />
                        <input type="text" name="phoneNumber" placeholder="Phone Number *" value={formData.phoneNumber} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} style={{ marginBottom: '10px', width: '75%', textAlign: 'center', borderRadius: '8px', height: '30px' }} />
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} style={{ marginBottom: '10px', width: '75%', textAlign: 'center', borderRadius: '8px', height: '30px' }} />
                        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} style={{ marginBottom: '10px', width: '75%', textAlign: 'center', borderRadius: '8px', height: '30px' }} />
                        <input type="text" name="pincode" placeholder="Area pincode *" value={formData.pincode} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} style={{ marginBottom: '10px', width: '75%', textAlign: 'center', borderRadius: '8px', height: '30px' }} />

                        {/* Save customer record button */}
                        <button type="submit" style={{ width: '80%', marginTop: '10px', padding: '15px', fontSize: '16px', borderRadius: '8px', cursor: 'pointer' }}>Save Customer record</button>
                    </form>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        {/* view all */}
                        <button onClick={handleViewAllCustomers} style={{ marginRight: '20px', padding: '15px', fontSize: '16px', borderRadius: '8px', cursor: 'pointer' }}>View All Customers</button>
                        {/* Fetch customer record button */}
                        <button onClick={handleFetchCustomers} style={{ padding: '15px', fontSize: '16px', borderRadius: '8px', cursor: 'pointer' }}>Fetch Customer record by ID</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewCustomerRecord;
