import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function Dashboard() {
    const [companies, setCompanies] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    const [member, setMember] = useState(null);
    const [paymentData, setPaymentData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/Ohkla/getCompany')
            .then(response => {
                setCompanies(response.data);
            })
            .catch(error => {
                console.error("Error fetching companies:", error);
            });
    }, []);

    useEffect(() => {
        if (selectedId) {
            axios.get(`http://localhost:5000/Ohkla/getMemberById/${selectedId}`)
                .then(res => {
                    setMember(res.data);
                })
                .catch(err => console.error(err));

            axios.get(`http://localhost:5000/Ohkla/getPaymentSummaryByMember/${selectedId}`)
                .then(res => {
                    setPaymentData(res.data);
                })
                .catch(err => console.error(err));
        } else {
            setMember(null);
            setPaymentData([]);
        }
    }, [selectedId]);

    const getGrandTotals = () => {
        return paymentData.reduce((acc, row) => {
            acc.TotalAmount += row.TotalAmount || 0;
            acc.ReceivedAmount += row.ReceivedAmount || 0;
            acc.DueAmount += row.DueAmount || 0;
            return acc;
        }, { TotalAmount: 0, ReceivedAmount: 0, DueAmount: 0 });
    };

    const grandTotals = getGrandTotals();

    return (
        <div className="container my-4 p-4 bg-light rounded shadow" style={{ maxWidth: '1000px' }}>
            <h2 className="text-center mb-4 text-primary">Dashboard</h2>

            {/* Dropdown */}
            <div className="row align-items-end mb-4 gx-3">
                <div className="col-md-5">
                    <label htmlFor="companySelect" className="form-label">Company Name</label>
                    <select
                        id="companySelect"
                        className="form-select"
                        onChange={e => setSelectedId(e.target.value)}
                        value={selectedId}
                    >
                        <option value="">Select</option>
                        {companies.map(comp => (
                            <option key={comp.MembershipID} value={comp.MembershipID}>
                                {comp.CompanyName}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Member Detail Cards */}
            {member && (
                <div className="row g-3 mb-4">
                    <div className="col-md-4">
                        <div className="card text-white bg-primary">
                            <div className="card-body">
                                <h5 className="card-title">Member Name</h5>
                                <p className="card-text">{member.MemberName}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card text-white bg-success">
                            <div className="card-body">
                                <h5 className="card-title">Member Since</h5>
                                <p className="card-text">{member.MemberSince}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Year-wise Payment Grid */}
            {paymentData.length > 0 && (
                <div className="table-responsive">
                    <h4 className="mb-3">Yearly Payment Summary</h4>
                    <table className="table table-bordered table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>Year</th>
                                <th>Total Amount</th>
                                <th>Received Amount</th>
                                <th>Due Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentData.map((yearData, index) => (
                                <tr key={index}>
                                    <td>{yearData.Year}</td>
                                    <td>₹ {yearData.TotalAmount}</td>
                                    <td>₹ {yearData.ReceivedAmount}</td>
                                    <td>₹ {yearData.DueAmount}</td>
                                </tr>
                            ))}
                            <tr className="fw-bold bg-light">
                                <td>Grand Total</td>
                                <td>₹ {grandTotals.TotalAmount}</td>
                                <td>₹ {grandTotals.ReceivedAmount}</td>
                                <td>₹ {grandTotals.DueAmount}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
