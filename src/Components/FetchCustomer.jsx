import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';


const CustomerSearchById = () => {
    const [searchId, setSearchId] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [searchError, setSearchError] = useState(null);
    const [updatedDetails, setUpdatedDetails] = useState(null);

    // State to manage edit mode
    const [isEditMode, setIsEditMode] = useState(false);

    // State to manage visibility of clear button
    const [isClearVisible, setIsClearVisible] = useState(false);

    useEffect(() => {
        // Initialize the updatedDetails state with searchResult
        setUpdatedDetails(searchResult);
    }, [searchResult]);

    const handleChange = (e) => {
        setUpdatedDetails({ ...updatedDetails, [e.target.name]: e.target.value });
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchId) {
            setSearchError('Please enter a customer ID to search.');
            return;
        }

        try {
            // Fetching customer record based on id
            const response = await axios.get(`http://localhost:8085/cust/${searchId}`);
            if (response.data) {
                setSearchResult(response.data);
                setSearchError(null);

                // Show clear button
                setIsClearVisible(true);

                // Reset edit mode on search
                setIsEditMode(false);
            } else {
                setSearchResult(null);
                setSearchError(`No results found for customer ID: ${searchId}`);
            }
        } catch (error) {
            console.error('Error searching customer:', error);
            setSearchError(`Error while searching customer: : ${error.message}`);
        }
    };

    const handleClear = () => {
        setSearchId(''); // Clear search ID
        setSearchResult(null); // Clear search result
        setIsClearVisible(false); // Hide clear button
        setIsEditMode(false); // Reset edit mode
    };

    const handleEdit = () => {
        setIsEditMode(true); // Enable edit mode
    };

    const handleUpdate = async () => {

        // required confirmation before commit
        const confirmed = window.confirm('Are you sure you want to update this record?');
        if (confirmed) {
            try {
                // updating the record
                const response = await axios.put(`http://localhost:8085/cust/update/${searchResult.id}`, updatedDetails);
                setSearchResult(response.data);

                // Disable edit mode after update
                setIsEditMode(false);

                alert('Customer details updated successfully.');
            } catch (error) {
                console.error('Error updating customer:', error);
                setSearchError(`Error updating customer: ${error.message}`);
            }
        }
    };

    const handleDelete = async () => {
        // confirming before commit
        const confirmed = window.confirm('Are you sure you want to delete this record?');
        if (confirmed) {
            try {
                //deleting the record based on id
                await axios.delete(`http://localhost:8085/cust/del/${searchResult.id}`);
                setSearchResult(null);

                // Reset the search ID
                setSearchId('');

            } catch (error) {
                console.error('Error deleting customer:', error);
                setSearchError(`Error deleting customer: ${error.message}`);
            }
        }
    };

    return (
        <div>
            <Header />

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>

                {/* Search form */}

                <div style={{ border: '8px solid green', padding: '20px', borderRadius: '10px', width: '400px' }}>
                    <h2 style={{ textAlign: 'center', color: '#FFD700' }}>Search Customer by ID</h2>
                    <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <input type="text" name="id" placeholder="Search by ID" value={searchId} onChange={(e) => setSearchId(e.target.value)} style={{ marginBottom: '10px', width: '75%', textAlign: 'center', borderRadius: '8px', height: '30px' }} />

                        {/*Clear button */}
                        {isClearVisible && (
                            <button type="button" onClick={handleClear} style={{ width: '40%', marginTop: '10px', marginRight: '5px', padding: '15px', fontSize: '16px', borderRadius: '8px', cursor: 'pointer' }}>Clear</button>
                        )}

                        {/* Search button */}
                        {!isClearVisible && (
                            <button type="submit" style={{ width: '40%', marginTop: '10px', marginRight: '5px', padding: '15px', fontSize: '16px', borderRadius: '8px', cursor: 'pointer' }}>Search</button>
                        )}
                    </form>
                </div>

                {/* Customer details form */}
                {searchResult && (
                    <div style={{ marginTop: '20px', width: '600px', textAlign: 'center' }}>
                        <h3 style={{ textAlign: 'center' }}>Customer Details</h3>
                        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <input type="text" name="fName" placeholder="First Name" value={updatedDetails?.fName || ''} onChange={handleChange} disabled={!isEditMode} style={{ marginBottom: '10px', width: '75%', textAlign: 'center', borderRadius: '8px', height: '30px' }} />
                            <input type="text" name="lName" placeholder="Last Name" value={updatedDetails?.lName || ''} onChange={handleChange} disabled={!isEditMode} style={{ marginBottom: '10px', width: '75%', textAlign: 'center', borderRadius: '8px', height: '30px' }} />
                            <input type="text" name="phoneNumber" placeholder="Phone Number" value={updatedDetails?.phoneNumber || ''} onChange={handleChange} disabled={!isEditMode} style={{ marginBottom: '10px', width: '75%', textAlign: 'center', borderRadius: '8px', height: '30px' }} />
                            <input type="email" name="email" placeholder="Email" value={updatedDetails?.email || ''} onChange={handleChange} disabled={!isEditMode} style={{ marginBottom: '10px', width: '75%', textAlign: 'center', borderRadius: '8px', height: '30px' }} />
                            <input type="text" name="address" placeholder="Address" value={updatedDetails?.address || ''} onChange={handleChange} disabled={!isEditMode} style={{ marginBottom: '10px', width: '75%', textAlign: 'center', borderRadius: '8px', height: '30px' }} />
                            <input type="text" name="pincode" placeholder="Pincode" value={updatedDetails?.pincode || ''} onChange={handleChange} disabled={!isEditMode} style={{ marginBottom: '10px', width: '75%', textAlign: 'center', borderRadius: '8px', height: '30px' }} />
                        </form>
                    </div>
                )}

                {/* Edit and Update buttons */}
                {searchResult && (
                    <div style={{ marginTop: '20px' }}>
                        {!isEditMode ? (
                            <button onClick={handleEdit} style={{ padding: '10px', fontSize: '16px', borderRadius: '8px', backgroundColor: '#FFD700', color: 'black', border: 'none', cursor: 'pointer' }}>Edit</button>
                        ) : (
                            <button onClick={handleUpdate} style={{ padding: '10px', fontSize: '16px', borderRadius: '8px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>Update</button>
                        )}
                    </div>
                )}

                {/* Delete button */}
                {searchResult && (
                    <div style={{ marginTop: '20px' }}>
                        <button onClick={handleDelete} style={{ padding: '10px', fontSize: '16px', borderRadius: '8px', backgroundColor: 'red', color: 'white', border: 'none', cursor: 'pointer' }}>Delete</button>
                    </div>
                )}

                {/* Search error message */}
                {searchError && (
                    <div style={{ marginTop: '20px' }}>
                        <h3 style={{ textAlign: 'center', color: 'red' }}>{searchError}</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomerSearchById;
