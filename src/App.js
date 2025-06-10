// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Layout from './Componets/Layout';
import MemberForm from './Componets/MemberForm';
import MemberTable from './Componets/ShowMemberData';
import PaymentForm from './Componets/PaymentSummary';
import ReceiptTable from './Componets/ReceptTable';
import Dashboard from './Componets/Desboard';
import LoginForms from './Componets/LoginForms';
import YearlySummary from './Componets/YearlySummary';
import Addpayment from './Componets/addPaymentForm';
import AnnualPayment from './Componets/AnnualPaymentRecord';
import Editform from './Componets/EditForm';
import Paymentreceipt from './Componets/PaymentRecipt';
import YearlyList from './Componets/yearlypaymentList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/dashboard" /> : <LoginForms setIsLoggedIn={setIsLoggedIn} />
          }
        />

        {/* Protected Routes inside Layout */}
        <Route
          element={isLoggedIn ? <Layout /> : <Navigate to="/" />}
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/member-form" element={<MemberForm />} />
          <Route path="/member-table" element={<MemberTable />} />
          <Route path="/payment-form" element={<PaymentForm />} />
          <Route path="/receipt-table" element={<ReceiptTable />} />
          <Route path="/Yearly-Summary" element={<YearlySummary />} />
          <Route path="/Add-payment" element={<Addpayment />} />
          <Route path="/Annual-payment" element={<AnnualPayment />} />
          <Route path="/Edite-Form" element={<Editform />} />
          <Route path="/Payment-Receipt" element={<Paymentreceipt />} />
          <Route path="/Yearl-List" element={<YearlyList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
