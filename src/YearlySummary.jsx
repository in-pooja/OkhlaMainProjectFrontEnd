import React, { useEffect, useState } from 'react';
import axios from 'axios';

const YearlySummary = () => {
  const [summaryData, setSummaryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const res = await axios.get('http://localhost:5000//yearly-summary');
      setSummaryData(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching summary:', err);
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">📊 Yearly Payment Summary</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Membership ID</th>
              <th>Payment Year</th>
              <th>Total Amount</th>
              <th>Amount Paid</th>
              <th>Due Amount</th>
            </tr>
          </thead>
          <tbody>
            {summaryData.map((item, index) => (
              <tr key={index}>
                <td>{item.MembershipID}</td>
                <td>{item.PaymentYear}</td>
                <td>{item.TotalAmountSum}</td>
                <td>{item.TotalAmountPaid}</td>
                <td>{item.TotalDueAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default YearlySummary;
