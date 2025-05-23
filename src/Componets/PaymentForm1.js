// import React, { useState } from 'react';

// const PaymentSummary = () => {
//     const [memberId, setMemberId] = useState('');
//     const [year, setYear] = useState('');
//     const [summary, setSummary] = useState(null);
//     const [error, setError] = useState('');

//     const fetchPaymentSummary = async () => {
//         if (!memberId || !year) {
//             setError('Please enter both Member ID and Year');
//             setSummary(null);
//             return;
//         }

//         try {
//             const response = await fetch(`/api/payment-summary/${memberId}/${year}`);
//             if (!response.ok) throw new Error('Failed to fetch payment summary');

//             const data = await response.json();
//             if (data) {
//                 setSummary(data);
//                 setError('');
//             } else {
//                 setSummary(null);
//                 setError('No payment data found for the selected member and year.');
//             }
//         } catch (err) {
//             console.error(err);
//             setSummary(null);
//             setError('An error occurred while fetching data.');
//         }
//     };

//     return (
//         <div className="container" style={{ maxWidth: '600px', marginTop: '50px' }}>
//             <h2 className="mb-4">Payment Summary</h2>

//             <div className="mb-3">
//                 <label className="form-label">Member ID</label>
//                 <input
//                     type="number"
//                     className="form-control"
//                     value={memberId}
//                     onChange={(e) => setMemberId(e.target.value)}
//                     placeholder="Enter Member ID"
//                 />
//             </div>

//             <div className="mb-3">
//                 <label className="form-label">Year (e.g. 2024-2025)</label>
//                 <input
//                     type="text"
//                     className="form-control"
//                     value={year}
//                     onChange={(e) => setYear(e.target.value)}
//                     placeholder="Enter Payment Year"
//                 />
//             </div>

//             <button className="btn btn-primary mb-3" onClick={fetchPaymentSummary}>
//                 Get Summary
//             </button>

//             {error && <div className="alert alert-danger">{error}</div>}

//             {summary && (
//                 <div className="card">
//                     <div className="card-body">
//                         <h5 className="card-title">Summary for Member ID: {memberId}</h5>
//                         <p><strong>Total Amount:</strong> ₹{summary.totalAmount}</p>
//                         <p><strong>Received Amount:</strong> ₹{summary.receivedAmount}</p>
//                         <p><strong>Due Amount:</strong> ₹{summary.dueAmount}</p>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default PaymentSummary;
