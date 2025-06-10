import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditMemberForm from './EditForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import'./showMember.css'


const MemberTable = () => {
    const [members, setMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);

    const [filters, setFilters] = useState({
        MemberName: '', CompanyName: '', ContactNumber: '', Email: '', GSTNo: '',
        UdhyamAadhar: '', RegistrationDate: '', MemberSince: '', Address1: '', Address2: '',
        Area: '', City: '', State: '', Status: '', UpdatedDate: '', Owner: '',
        Category: '', PrinterCategory: ''
    });

    const fetchMembers = () => {
        axios.get('http://localhost:5000/Ohkla/getMember')
            .then(response => {
                const activeMembers = response.data.filter(member =>
                    member.IsActive === true || member.IsActive === 1
                );
                setMembers(activeMembers);
                setFilteredMembers(activeMembers);
            })
            .catch(error => console.error('Error fetching members:', error));
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    useEffect(() => {
        const result = members.filter(member => {
            return Object.entries(filters).every(([key, filterVal]) => {
                if (!filterVal) return true;
                let memberVal = '';

                if (key === 'Status') {
                    memberVal = member.IsActive ? 'active' : 'inactive';
                } else if (key === 'RegistrationDate' || key === 'UpdatedDate') {
                    memberVal = member[key]?.substring(0, 10) || '';
                } else {
                    memberVal = member[key] || '';
                }

                return memberVal.toString().toLowerCase().includes(filterVal.toLowerCase());
            });
        });

        setFilteredMembers(result);
    }, [filters, members]);

    const handleFilterChange = (e, column) => {
        setFilters(prev => ({ ...prev, [column]: e.target.value }));
    };

    const handleEdit = (member) => setSelectedMember(member);
    const handleCancel = () => setSelectedMember(null);
    const handleUpdate = () => {
        setSelectedMember(null);
        fetchMembers();
    };

    return (
        <div className="container " style={{marginLeft: '190px',marginTop:'0'}}>
            {/* <h2 className="text-center text-white" style={{backgroundColor: '#173a60'}}>All Member Details</h2> */}
 <div className="card-header text-white"style={{ backgroundColor: '#173a60' }}>
                    {/* <h4 className="mb-0"style={{ textAlign: 'center' }}>All Member Details</h4> */}
                    <h1 className="mb-0"style={{ textAlign: 'center' }}>👥 All Member Details</h1>

                </div>
            {selectedMember ? (
                <EditMemberForm
                    memberData={selectedMember}
                    onCancel={handleCancel}
                    onUpdate={handleUpdate}
                />
            ) : (
                <div className="table-responsive rounded">
                 <table className="table table-bordered table-hover text-center align-middle equal-width">

                        <thead style={{ backgroundColor: '#e6f2ff' }}>
                            <tr>
                                <th>#</th>
                                {Object.keys(filters).map((key, index) => (
                                    <th key={index}>
                                        <div className="d-flex flex-column">
                                            <span>{key.replace(/([A-Z])/g, ' $1')}</span>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm mt-1"
                                                value={filters[key]}
                                                onChange={(e) => handleFilterChange(e, key)}
                                                placeholder={key === 'Status' ? 'Active/Inactive' : 'Search...'}
                                            />
                                        </div>
                                    </th>
                                ))}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMembers.length === 0 ? (
                                <tr>
                                    <td colSpan="100%">No members found</td>
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
                                        <td>{member.Category}</td>
                                        <td>{member.PrinterCategory}</td>
                                        <td>{member.IsActive ? 'Active' : 'Inactive'}</td>
                                        <td>{member.UpdatedDate?.substring(0, 10)}</td>
                                        <td>{member.Owner}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-primary"
                                                onClick={() => handleEdit(member)}
                                            >
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
