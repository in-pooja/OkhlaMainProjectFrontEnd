import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditMemberForm = ({ memberData, onCancel, onUpdate }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setFormData(memberData);
    }, [memberData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/Ohkla/updateMember/${formData.MembershipID}`, formData);
            alert('Member updated successfully');
            onUpdate();
        } catch (error) {
            console.error('Error updating member:', error);
            alert('Update failed');
        }
    };

    return (
        <div className="container mt-4">
            <div className="card shadow-lg">
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Edit Member - {formData.MemberName}</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="row g-3">

                        {/* Input fields */}
                        {[
                            { label: 'Member Name', name: 'MemberName' },
                            { label: 'Company Name', name: 'CompanyName' },
                            { label: 'Contact Number', name: 'ContactNumber' },
                            { label: 'Email', name: 'Email' },
                            { label: 'GST Number', name: 'GSTNo' },
                            { label: 'Udhyam Aadhar', name: 'UdhyamAadhar' },
                            { label: 'Registration Date', name: 'RegistrationDate', type: 'date' },
                            { label: 'Member Since', name: 'MemberSince' },
                            { label: 'Address Line 1', name: 'Address1' },
                            { label: 'Address Line 2', name: 'Address2' },
                            { label: 'Area', name: 'Area' },
                            { label: 'City', name: 'City' },
                            { label: 'State', name: 'State' },
                            { label: 'Updated Date', name: 'UpdatedDate', type: 'date' },
                            { label: 'Owner', name: 'Owner' }
                        ].map(({ label, name, type }) => (
                            <div className="col-md-6" key={name}>
                                <label className="form-label">{label}</label>
                                <input
                                    type={type || 'text'}
                                    className="form-control"
                                    name={name}
                                    value={formData[name] || ''}
                                    onChange={handleChange}
                                />
                            </div>
                        ))}

                        {/* Status Dropdown */}
                        <div className="col-md-6">
                            <label className="form-label">Status</label>
                            <select
                                className="form-select"
                                name="IsActive"
                                value={formData.IsActive ? 'true' : 'false'}
                                onChange={(e) =>
                                    handleChange({
                                        target: {
                                            name: 'IsActive',
                                            value: e.target.value === 'true',
                                        },
                                    })
                                }
                            >
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                        </div>

                        {/* Buttons */}
                        <div className="col-12 mt-3">
                            <button type="submit" className="btn btn-success me-3">
                                💾 Save
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={onCancel}>
                                ❌ Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditMemberForm;
