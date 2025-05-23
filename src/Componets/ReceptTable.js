import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReceiptTable = () => {
    const [receipts, setReceipts] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // Search term state

    useEffect(() => {
        axios.get('http://localhost:5000/Ohkla/getReceipts')
            .then(res => setReceipts(res.data))
            .catch(err => console.error("Error fetching receipts", err));
    }, []);

    // Filter receipts based on searchTerm, checking all relevant fields (case-insensitive)
    const filteredReceipts = receipts.filter(receipt => {
        const term = searchTerm.toLowerCase();

        return (
            (receipt.ReceiptNumber?.toString().toLowerCase().includes(term)) ||
            (receipt.ReceiptDate?.toLowerCase().includes(term)) ||
            (receipt.CompanyName?.toLowerCase().includes(term)) ||
            (receipt.DateOfReceiving?.toLowerCase().includes(term)) ||
            (receipt.ReceivedAmount?.toString().toLowerCase().includes(term)) ||
            (receipt.ChequeNumber?.toLowerCase().includes(term)) ||
            (receipt.BankName?.toLowerCase().includes(term)) ||
            (receipt.PaymentYear?.toString().toLowerCase().includes(term))
        );
    });

    return (
        <div className="container mt-4">
            {/* Search Bar */}
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search receipts..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="card shadow-sm rounded">
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">🧾 Receipt Summary</h4>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover table-bordered mb-0">
                            <thead className="table-dark text-center">
                                <tr>
                                    <th>Receipt No</th>
                                    <th>Receipt Date</th>
                                    <th>Company Name</th>
                                    <th>Date of Receiving</th>
                                    <th>Received Amount</th>
                                    <th>Cheque No</th>
                                    <th>Bank Name</th>
                                    <th>Payment Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredReceipts.length > 0 ? (
                                    filteredReceipts.map((receipt, index) => (
                                        <tr key={index}>
                                            <td className="text-center">{receipt.ReceiptNumber}</td>
                                            <td>{receipt.ReceiptDate?.slice(0, 10)}</td>
                                            <td>{receipt.CompanyName}</td>
                                            <td>{receipt.DateOfReceiving?.slice(0, 10)}</td>
                                            <td>₹ {receipt.ReceivedAmount}</td>
                                            <td>{receipt.ChequeNumber || "-"}</td>
                                            <td>{receipt.BankName || "-"}</td>
                                            <td className="text-center">{receipt.PaymentYear}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center text-muted p-3">
                                            No receipts found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReceiptTable;
