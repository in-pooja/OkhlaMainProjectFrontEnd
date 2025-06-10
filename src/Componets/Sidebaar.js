// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Sidbar.css';

// function Sidbaar() {
//   const [isOpen, setIsOpen] = useState(false); // initially hidden

//   return (
//     <>
//       {/* Toggle button (visible when sidebar is closed) */}
//       {!isOpen && (
//         <div className="text-start m-3" style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 2000 }}>
//           <button
//             className="btn btn-outline-secondary"
//             onClick={() => setIsOpen(true)}
//             style={{
//               fontSize: '20px',
//               color: '#27496d',
//               borderColor: '#27496d',
//             }}
//           >
//             &#8942;
//           </button>
//         </div>
//       )}

//       {/* Sidebar (visible when isOpen is true) */}
//       {isOpen && (
//         <div
//           className="sidebar text-white p-3"
//           style={{
//             minHeight: '100vh',
//             width: '200px',
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             zIndex: 2001,
//             transition: 'all 0.3s ease',
//             background: 'linear-gradient(135deg, #27496d, #142850)',
//             boxShadow: '2px 0 5px rgba(0,0,0,0.3)',
//           }}
//         >
//           {/* Menu heading with close icon on right */}
//           <div className="d-flex justify-content-between align-items-center mb-3">
//             <h4 className="m-0">Menu</h4>
//             <button
//               className="btn btn-outline-light"
//               onClick={() => setIsOpen(false)}
//               style={{
//                 fontSize: '14px',
//                 borderRadius: '50%',
//                 padding: '5px 10px',
//                 borderColor: '#fff',
//                 color: '#fff',
//               }}
//               title="Close"
//             >
//               &#x2715;
//             </button>
//           </div>

//           {/* Menu links */}
//           <ul className="list-unstyled">
//             <li><Link to="/dashboard" className="text-white">Dashboard</Link></li>
//             <li><Link to="/member-form" className="text-white">Member Form</Link></li>
//             <li><Link to="/payment-form" className="text-white">Payment Form</Link></li>
            
//             <li><Link to="/member-table" className="text-white">Member Table</Link></li>
//             <li><Link to="/receipt-table" className="text-white">Receipt Table</Link></li>
//             <li><Link to="/Yearly-Summary" className="text-white">Yearly-Calculation</Link></li>

            
//           </ul>
//         </div>
//       )}
//     </>
//   );
// }

// export default Sidbaar;
import React from 'react';
import {
  FaTachometerAlt,
  FaUserPlus,
  FaMoneyCheckAlt,
  FaUsers,
  FaReceipt,
  FaChartLine,
  FaPlusCircle,
  FaClipboardList,
  FaEdit,
  FaFileInvoiceDollar,
  FaEye,
  FaListAlt
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Sidbar.css';

function Sidbaar() {
  return (
    <>
      <div
        className="sidebar text-white p-3"
        style={{
          minHeight: '100vh',
          width: '200px',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 2001,
          transition: 'all 0.3s ease',
          background: 'linear-gradient(135deg, #27496d, #142850)',
          boxShadow: '2px 0 5px rgba(0,0,0,0.3)',
        }}
      >
        <div className="mb-3">
          <h4 className="m-0">Menu</h4>
        </div>

        <ul className="list-unstyled">
          <li>
            <Link to="/dashboard" className="text-white d-flex align-items-center gap-2">
              <FaTachometerAlt /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/member-form" className="text-white d-flex align-items-center gap-2">
              <FaUserPlus /> New Memebr Form
            </Link>
          </li>
            <li>
            <Link to="/member-table" className="text-white d-flex align-items-center gap-2">
              <FaUsers /> Member List
            </Link>
          </li>
          <li>
            <Link to="/payment-form" className="text-white d-flex align-items-center gap-2">
              <FaMoneyCheckAlt /> Payment Form
            </Link>
          </li>
        
          <li>
            <Link to="/receipt-table" className="text-white d-flex align-items-center gap-2">
              <FaReceipt /> Payment Receipt
            </Link>
          </li>
           <li>
            <Link to="/Annual-payment" className="text-white d-flex align-items-center gap-2">
              <FaClipboardList /> Annual PaymentSummary
            </Link>
          </li>
          <li>
            <Link to="/Add-payment" className="text-white d-flex align-items-center gap-2">
              <FaPlusCircle /> Payment Setting
            </Link>
          </li>
          {/* <li>
            <Link to="/Yearly-Summary" className="text-white d-flex align-items-center gap-2">
              <FaChartLine /> Yearly Summary
            </Link>
          </li>
          
         
          <li>
            <Link to="/Edite-Form" className="text-white d-flex align-items-center gap-2">
              <FaEdit /> Edit Form
            </Link>
          </li>
          <li>
            <Link to="/Payment-Receipt" className="text-white d-flex align-items-center gap-2">
              <FaFileInvoiceDollar /> Payment Receipt
            </Link>
          </li>
         
          <li>
            <Link to="/Yearl-List" className="text-white d-flex align-items-center gap-2">
              <FaListAlt /> Yearly List
            </Link>
          </li> */}
        </ul>
      </div>
    </>
  );
}

export default Sidbaar;
