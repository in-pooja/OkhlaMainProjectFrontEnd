import React from 'react';
import MemberForm from './Componets/MemberForm';
import MemberTable from './Componets/ShowMemberData';
import PaymentForm from './Componets/PaymentSummary';
import ReceiptTable from './Componets/ReceptTable';
import Dashboard from './Componets/Desboard';
// import PaymentForm1 from './Componets/PaymentForm1';

function App() {
  return (
    <div className="App">
      <MemberForm />
      <MemberTable />
      <PaymentForm />
      <ReceiptTable />
      <Dashboard />
      {/* <PaymentForm1 /> */}
    </div>
  );
}

export default App;
