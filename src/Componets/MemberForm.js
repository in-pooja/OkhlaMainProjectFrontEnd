import React, { useState } from 'react';
import axios from 'axios';

const MemberForm = () => {
    const [formData, setFormData] = useState({
        MemberName: '',
        CompanyName: '',
        ContactNumber: '',
        Email: '',
        GSTNo: '',
        UdhyamAadhar: '',
        RegistrationDate: '',
        MemberSince: '',
        Address1: '',
        Address2: '',
        Area: '',
        City: '',
        State: '',
        IsActive: true,
        UpdatedDate: '',
        Owner: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/Ohkla/Member', formData);
            alert(response.data.message);
            setFormData({
                MemberName: '',
                CompanyName: '',
                ContactNumber: '',
                Email: '',
                GSTNo: '',
                UdhyamAadhar: '',
                RegistrationDate: '',
                MemberSince: '',
                Address1: '',
                Address2: '',
                Area: '',
                City: '',
                State: '',
                IsActive: true,
                UpdatedDate: '',
                Owner: ''
            });
        } catch (error) {
            console.error(error);
            alert('Error saving member');
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    <h3 className="mb-0">New Member Registration</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Member Name</label>
                                <input type="text" name="MemberName" className="form-control" value={formData.MemberName} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Company Name</label>
                                <input type="text" name="CompanyName" className="form-control" value={formData.CompanyName} onChange={handleChange} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Contact Number</label>
                                <input type="text" name="ContactNumber" className="form-control" value={formData.ContactNumber} onChange={handleChange} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" name="Email" className="form-control" value={formData.Email} onChange={handleChange} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">GST Number</label>
                                <input type="text" name="GSTNo" className="form-control" value={formData.GSTNo} onChange={handleChange} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Udhyam Aadhar</label>
                                <input type="text" name="UdhyamAadhar" className="form-control" value={formData.UdhyamAadhar} onChange={handleChange} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Registration Date</label>
                                <input type="date" name="RegistrationDate" className="form-control" value={formData.RegistrationDate} onChange={handleChange} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Member Since</label>
                                <input type="text" name="MemberSince" className="form-control" value={formData.MemberSince} onChange={handleChange} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Address Line 1</label>
                                <input type="text" name="Address1" className="form-control" value={formData.Address1} onChange={handleChange} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Address Line 2</label>
                                <input type="text" name="Address2" className="form-control" value={formData.Address2} onChange={handleChange} />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label className="form-label">Area</label>
                                <input type="text" name="Area" className="form-control" value={formData.Area} onChange={handleChange} />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label className="form-label">City</label>
                                <input type="text" name="City" className="form-control" value={formData.City} onChange={handleChange} />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label className="form-label">State</label>
                                <input type="text" name="State" className="form-control" value={formData.State} onChange={handleChange} />
                            </div>
                            <div className="col-md-4 mb-3 form-check mt-4">
                                <input type="checkbox" name="IsActive" className="form-check-input" checked={formData.IsActive} onChange={handleChange} />
                                <label className="form-check-label">Active</label>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label className="form-label">Updated Date</label>
                                <input type="date" name="UpdatedDate" className="form-control" value={formData.UpdatedDate} onChange={handleChange} />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label className="form-label">Owner</label>
                                <input type="text" name="Owner" className="form-control" value={formData.Owner} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="text-end">
                            <button type="submit" className="btn btn-success">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MemberForm;
