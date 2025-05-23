// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function PaymentForm() {
//     const [companies, setCompanies] = useState([]);
//     const [selectedId, setSelectedId] = useState('');
//     const [member, setMember] = useState({});
//     const [year, setYear] = useState('2023-2024');

//     const [totalAmount, setTotalAmount] = useState('');
//     const [amountPaid, setAmountPaid] = useState('');
//     const [dueAmount, setDueAmount] = useState('');
//     const [receiptNo, setReceiptNo] = useState('');
//     const [receiptDate, setReceiptDate] = useState('');
//     const [chequeNo, setChequeNo] = useState('');
//     const [chequeDate, setChequeDate] = useState('');
//     const [bankName, setBankName] = useState('');
//     const [paymentMode, setPaymentMode] = useState('');


//     const years = Array.from({ length: 10 }, (_, i) => `${2018 + i}-${2019 + i}`);

//     useEffect(() => {
//         axios.get('http://localhost:5000/Ohkla/getCompany')
//             .then(res => setCompanies(res.data))
//             .catch(err => console.error(err));
//     }, []);

//     const fetchMember = () => {
//         if (selectedId) {
//             axios.get(`http://localhost:5000/Ohkla/getMemberById/${selectedId}`)
//                 .then(res => {
//                     setMember(res.data);
//                     if (res.data.TotalAmount) {
//                         setTotalAmount(res.data.TotalAmount);
//                     }
//                 })
//                 .catch(err => console.error(err));
//         }
//     };

//     function InputSelect({ label, value, onChange, options }) {
//         return (
//             <div className="col-12 col-md-6">
//                 <label className="form-label">{label}</label>
//                 <select className="form-select" value={value} onChange={onChange}>
//                     {options.map((opt, i) => (
//                         <option key={i} value={opt}>{opt || 'Select'}</option>
//                     ))}
//                 </select>
//             </div>
//         );
//     }

//     // Auto-calculate Due Amount
//     useEffect(() => {
//         const total = parseFloat(totalAmount) || 0;
//         const paid = parseFloat(amountPaid) || 0;
//         const due = total - paid;
//         if (!isNaN(due)) {
//             setDueAmount(due.toFixed(2));
//         }
//     }, [amountPaid, totalAmount]);

//     const handleSave = async () => {
//         if (!selectedId || !amountPaid || isNaN(amountPaid)) {
//             alert("Please fill in required fields: Company and Amount Paid.");
//             return;
//         }

//         try {
//             await axios.post('http://localhost:5000/Ohkla/addPayment', {
//                 MembershipID: parseInt(selectedId),
//                 PaymentYear: year,
//                 AmountPaid: parseFloat(amountPaid),
//                 DueAmount: parseFloat(dueAmount),
//                 TotalAmount: parseFloat(totalAmount),
//                 ReceiptNumber: receiptNo,
//                 ReceiptDate: receiptDate,
//                 ChequeNumber: chequeNo,
//                 ChequeReceiveOn: chequeDate || null,
//                 BankName: bankName,
//                 PaymentType: paymentMode
//             });

//             alert("✅ Payment details saved successfully!");

//             // Reset form fields
//             setAmountPaid('');
//             setDueAmount('');
//             setReceiptNo('');
//             setReceiptDate('');
//             setChequeNo('');
//             setChequeDate('');
//             setBankName('');
//             setPaymentMode('');
//         } catch (err) {
//             console.error("Error while saving payment:", err.response || err.message);
//             alert("❌ Failed to save payment details.");
//         }
//     };

//     return (
//         <div className="container my-4 p-4 bg-light rounded shadow" style={{ maxWidth: '900px' }}>
//             <h2 className="text-center mb-4 text-primary">Add Payment Details</h2>

//             {/* Dropdowns */}
//             <div className="row align-items-end mb-3 gx-3">
//                 <div className="col-md-5">
//                     <label htmlFor="companySelect" className="form-label">Company Name</label>
//                     <select
//                         id="companySelect"
//                         className="form-select"
//                         onChange={e => setSelectedId(e.target.value)}
//                         value={selectedId}
//                     >
//                         <option value="">Select</option>
//                         {companies.map(comp => (
//                             <option key={comp.MembershipID} value={comp.MembershipID}>
//                                 {comp.CompanyName}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 <div className="col-md-4">
//                     <label htmlFor="yearSelect" className="form-label">Payment Year</label>
//                     <select
//                         id="yearSelect"
//                         className="form-select"
//                         onChange={e => setYear(e.target.value)}
//                         value={year}
//                     >
//                         {years.map(y => (
//                             <option key={y}>{y}</option>
//                         ))}
//                     </select>
//                 </div>

//                 <div className="col-md-3 d-grid">
//                     <button onClick={fetchMember} className="btn btn-primary">Search</button>
//                 </div>
//             </div>

//             <hr />

//             {/* Member Info */}
//             <div className="row g-3">
//                 <InputField label="Member ID" value={member.MembershipID || ''} readOnly />
//                 <InputField label="Member Name" value={member.MemberName || ''} readOnly />
//                 <InputField label="Email" value={member.Email || ''} readOnly />
//                 <InputField label="Member Since" value={member.MemberSince || ''} readOnly />
//                 <InputField label="Contact No." value={member.ContactNumber || ''} readOnly />

//                 <InputField label="Total Amount" value={totalAmount} onChange={e => setTotalAmount(e.target.value)} />
//                 <InputField label="Amount Paid" value={amountPaid} onChange={e => setAmountPaid(e.target.value)} />
//                 <InputField label="Due Amount" value={dueAmount} readOnly />
//                 <InputField label="Receipt No." value={receiptNo} onChange={e => setReceiptNo(e.target.value)} />
//                 <InputField label="Receipt Date" type="date" value={receiptDate} onChange={e => setReceiptDate(e.target.value)} />

//                 <InputField label="Cheque No." value={chequeNo} onChange={e => setChequeNo(e.target.value)} />
//                 <InputField label="Cheque Receive On" type="date" value={chequeDate} onChange={e => setChequeDate(e.target.value)} />
//                 <InputField label="Bank" value={bankName} onChange={e => setBankName(e.target.value)} />
//                 <InputSelect
//                     label="Payment Type"
//                     value={paymentMode}
//                     onChange={e => setPaymentMode(e.target.value)}
//                     options={['', 'UPI', 'Online', 'Offline']}
//                 />

//             </div>

//             <div className="mt-4 text-center">
//                 <button onClick={handleSave} className="btn btn-success btn-lg px-5">Save</button>
//             </div>
//         </div>
//     );
// }

// function InputField({ label, value, onChange, readOnly = false, type = "text" }) {
//     return (
//         <div className="col-12 col-md-6">
//             <label className="form-label">{label}</label>
//             <input
//                 type={type}
//                 className="form-control"
//                 value={value}
//                 onChange={onChange}
//                 readOnly={readOnly}
//             />
//         </div>
//     );
// }

// export default PaymentForm;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PaymentForm() {
    const [companies, setCompanies] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    const [member, setMember] = useState({});
    const [year, setYear] = useState('2023-2024');

    const [totalAmount, setTotalAmount] = useState('');
    const [amountPaid, setAmountPaid] = useState('');
    const [dueAmount, setDueAmount] = useState('');
    const [receiptNo, setReceiptNo] = useState('');
    // const [receiptDate, setReceiptDate] = useState('');
    const [chequeNo, setChequeNo] = useState('');
    const [chequeDate, setChequeDate] = useState('');
    const [bankName, setBankName] = useState('');
    const [paymentMode, setPaymentMode] = useState('');

    const years = Array.from({ length: 10 }, (_, i) => `${2018 + i}-${2019 + i}`);

    useEffect(() => {
        axios.get('http://localhost:5000/Ohkla/getCompany')
            .then(res => setCompanies(res.data))
            .catch(err => console.error(err));
    }, []);

    ;
    const fetchMember = () => {
        if (selectedId) {
            axios.get(`http://localhost:5000/Ohkla/getMemberById/${selectedId}`)
                .then(res => {
                    setMember(res.data);
                    setTotalAmount(res.data.TotalAmount || '');

                    const receiptGenerated = `REC-${Math.floor(100 + Math.random() * 900)}`;
                    setReceiptNo(receiptGenerated);
                })
                .catch(err => console.error(err));
        }
    };

    useEffect(() => {
        const total = parseFloat(totalAmount) || 0;
        const paid = parseFloat(amountPaid) || 0;
        const due = total - paid;
        if (!isNaN(due)) {
            setDueAmount(due.toFixed(2));
        }
    }, [amountPaid, totalAmount]);

    const handleSave = async () => {
        if (!selectedId || !amountPaid || isNaN(amountPaid)) {
            alert("Please fill in required fields: Company and Amount Paid.");
            return;
        }

        try {
            await axios.post('http://localhost:5000/Ohkla/addPayment', {
                MembershipID: parseInt(selectedId),
                PaymentYear: year,
                AmountPaid: parseFloat(amountPaid),
                DueAmount: parseFloat(dueAmount),
                TotalAmount: parseFloat(totalAmount),
                ReceiptNumber: receiptNo,

                ChequeNumber: chequeNo,
                ChequeReceiveOn: chequeDate || null,
                BankName: bankName,
                PaymentType: paymentMode
            });

            alert("✅ Payment details saved successfully!");

            // Reset
            setAmountPaid('');
            setDueAmount('');
            setReceiptNo('');

            setChequeNo('');
            setChequeDate('');
            setBankName('');
            setPaymentMode('');
        } catch (err) {
            console.error("Error while saving payment:", err.response || err.message);
            alert("❌ Failed to save payment details.");
        }
    };

    return (
        <div className="container my-4 p-4 bg-light rounded shadow" style={{ maxWidth: '900px' }}>
            <h2 className="text-center mb-4 text-primary">Add Payment Details</h2>

            <div className="row align-items-end mb-3 gx-3">
                <div className="col-md-5">
                    <label className="form-label">Company Name</label>
                    <select
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

                <div className="col-md-4">
                    <label className="form-label">Payment Year</label>
                    <select
                        className="form-select"
                        onChange={e => setYear(e.target.value)}
                        value={year}
                    >
                        {years.map(y => (
                            <option key={y}>{y}</option>
                        ))}
                    </select>
                </div>

                <div className="col-md-3 d-grid">
                    <button onClick={fetchMember} className="btn btn-primary">Search</button>
                </div>
            </div>

            <hr />

            <div className="row g-3">
                <InputField label="Member ID" value={member.MembershipID || ''} readOnly />
                <InputField label="Member Name" value={member.MemberName || ''} readOnly />
                <InputField label="Email" value={member.Email || ''} readOnly />
                <InputField label="Member Since" value={member.MemberSince || ''} readOnly />
                <InputField label="Contact No." value={member.ContactNumber || ''} readOnly />

                <InputField label="Total Amount" value={totalAmount} onChange={e => setTotalAmount(e.target.value)} />
                <InputField label="Amount Paid" value={amountPaid} onChange={e => setAmountPaid(e.target.value)} />
                <InputField label="Due Amount" value={dueAmount} readOnly />
                <InputField label="Receipt No." value={receiptNo} readOnly />
                {/* <InputField label="Receipt Date" type="date" value={receiptDate} onChange={e => setReceiptDate(e.target.value)} /> */}
                <InputField label="Cheque No." value={chequeNo} onChange={e => setChequeNo(e.target.value)} />
                <InputField label="Cheque Receive On" type="date" value={chequeDate} onChange={e => setChequeDate(e.target.value)} />
                <InputField label="Bank" value={bankName} onChange={e => setBankName(e.target.value)} />
                <InputSelect label="Payment Type" value={paymentMode} onChange={e => setPaymentMode(e.target.value)} options={['', 'UPI', 'Online', 'Offline']} />
            </div>

            <div className="mt-4 text-center">
                <button onClick={handleSave} className="btn btn-success btn-lg px-5">Save</button>
            </div>
        </div>
    );
}

function InputField({ label, value, onChange, readOnly = false, type = "text" }) {
    return (
        <div className="col-12 col-md-6">
            <label className="form-label">{label}</label>
            <input
                type={type}
                className="form-control"
                value={value}
                onChange={onChange}
                readOnly={readOnly}
            />
        </div>
    );
}

function InputSelect({ label, value, onChange, options }) {
    return (
        <div className="col-12 col-md-6">
            <label className="form-label">{label}</label>
            <select className="form-select" value={value} onChange={onChange}>
                {options.map((opt, i) => (
                    <option key={i} value={opt}>{opt || 'Select'}</option>
                ))}
            </select>
        </div>
    );
}



export default PaymentForm;
