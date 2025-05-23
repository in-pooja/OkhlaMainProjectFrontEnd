import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditMemberForm from './EditForm';

const MemberTable = () => {
    const [members, setMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchMembers = () => {
        axios.get('http://localhost:5000/Ohkla/getMember')
            .then(response => {
                const activeMembers = response.data.filter(member => member.IsActive === true || member.IsActive === 1);
                setMembers(activeMembers);
                setFilteredMembers(activeMembers);
            })
            .catch(error => console.error('Error fetching members:', error));
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    useEffect(() => {
        const lowerSearch = searchTerm.toLowerCase();
        const result = members.filter(member =>
            Object.values(member).some(
                val =>
                    val &&
                    val.toString().toLowerCase().includes(lowerSearch)
            )
        );
        setFilteredMembers(result);
    }, [searchTerm, members]);

    const handleEdit = (member) => {
        setSelectedMember(member);
    };

    const handleCancel = () => {
        setSelectedMember(null);
    };

    const handleUpdate = () => {
        setSelectedMember(null);
        fetchMembers(); // Refresh after update
    };

    return (
        <div className="container-fluid mt-4">
            <h2 className="text-center mb-4">All Member Details</h2>

            {!selectedMember && (
                <div className="mb-3 text-end">
                    <input
                        type="text"
                        className="form-control w-25 d-inline"
                        placeholder="Search all fields..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            )}

            {selectedMember ? (
                <EditMemberForm
                    memberData={selectedMember}
                    onCancel={handleCancel}
                    onUpdate={handleUpdate}
                />
            ) : (
                <div style={{ overflowX: 'auto' }} className="shadow p-3 rounded">
                    <table className="table table-bordered table-hover align-middle text-center" style={{ minWidth: '1500px' }}>
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Member Name</th>
                                <th>Company</th>
                                <th>Contact</th>
                                <th>Email</th>
                                <th>GST No</th>
                                <th>Udhyam Aadhar</th>
                                <th>Registration Date</th>
                                <th>Member Since</th>
                                <th>Address 1</th>
                                <th>Address 2</th>
                                <th>Area</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Status</th>
                                <th>Updated Date</th>
                                <th>Owner</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMembers.length === 0 ? (
                                <tr>
                                    <td colSpan="18">No members found</td>
                                </tr>
                            ) : (
                                filteredMembers.map((member, index) => (
                                    <tr key={member.MemberID || index}>
                                        <td>{index + 1}</td>
                                        <td>{member.MemberName}</td>
                                        <td>{member.CompanyName}</td>
                                        <td>{member.ContactNumber}</td>
                                        <td>{member.Email}</td>
                                        <td>{member.GSTNo}</td>
                                        <td>{member.UdhyamAadhar}</td>
                                        <td>{member.RegistrationDate?.substring(0, 10)}</td>
                                        <td>{member.MemberSince}</td>
                                        <td>{member.Address1}</td>
                                        <td>{member.Address2}</td>
                                        <td>{member.Area}</td>
                                        <td>{member.City}</td>
                                        <td>{member.State}</td>
                                        <td>
                                            {member.IsActive ? (
                                                <span className="badge bg-success">Active</span>
                                            ) : (
                                                <span className="badge bg-secondary">Inactive</span>
                                            )}
                                        </td>
                                        <td>{member.UpdatedDate?.substring(0, 10)}</td>
                                        <td>{member.Owner}</td>
                                        <td>
                                            <button className="btn btn-sm btn-primary" onClick={() => handleEdit(member)}>
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MemberTable;
