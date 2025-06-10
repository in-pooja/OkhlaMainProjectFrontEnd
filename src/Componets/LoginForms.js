// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import './Login.css';

// function LoginForms({ setIsLoggedIn }) {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post('http://localhost:5000/Ohkla/login', {
//         username,
//         password
//       });

//       if (res.data.success) {
//         setIsLoggedIn(true);

//         Swal.fire({
//           icon: 'success',
//           title: 'Login Successful!',
//           text: 'Welcome to the Member Dashboard',
//           confirmButtonColor: '#6e44ff',
//         }).then(() => {
//          navigate('/dashboard');

//         });
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Login Failed!',
//           text: 'Invalid username or password.',
//           confirmButtonColor: '#6e44ff',
//         });
//       }
//     } catch (err) {
//       console.error('Login error:', err);
//       Swal.fire({
//         icon: 'error',
//         title: 'Login Error',
//         text: 'Something went wrong. Try again later.',
//         confirmButtonColor: '#6e44ff',
//       });
//     }
//   };

//   return (
//     <div className="login-bg">
//       <div className="login-box">
//         <h2>Login</h2>
//         <form onSubmit={handleLogin}>
//           <div className="mb-3">
//             <input
//               type="text"
//               placeholder="Username"
//               className="form-control"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <input
//               type="password"
//               placeholder="Password"
//               className="form-control"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" className="btn btn-primary w-100">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default LoginForms;




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Login.css';

const LoginForms = ({ setIsLoggedIn }) => { // ✅ props added
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    contactNumber: ''
  });

  const navigate = useNavigate();

// ✅ make sure this is inside the component

  const toggleForm = () => {
    setIsSignup(prev => !prev);
    setFormData({
      username: '',
      email: '',
      password: '',
      contactNumber: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isSignup
      ? 'http://localhost:5000/Ohkla/signup'
      : 'http://localhost:5000/Ohkla/login';

    const dataToSend = isSignup
      ? formData
      : { email: formData.email, password: formData.password };

    try {
      const res = await axios.post(url, dataToSend);

     if (res.data.success) {
  Swal.fire({
    icon: 'success',
    title: res.data.message,
    showConfirmButton: false,
    timer: 1500
  }).then(() => {
    if (!isSignup) {
       console.log("username:"+res.data.username);
       localStorage.setItem("username", res.data.username);
      // ✅ change on this line for username
      setIsLoggedIn(true); // ✅ Yeh line add karo
      navigate('/dashboard');
    } else {
      toggleForm(); // After signup, go to login
    }
  });
}
 else {
        Swal.fire('Failed', res.data.message, 'error');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Something went wrong', 'error');
    }
  };

  return (
    <div className="login-bg">
      <div className="login-box">
        <h2>{isSignup ? 'Signup' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <>
              <div className="mb-3">
                <input type="text" name="username" placeholder="Username" className="form-control" value={formData.username} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <input type="text" name="contactNumber" placeholder="Contact Number" className="form-control" value={formData.contactNumber} onChange={handleChange} required />
              </div>
            </>
          )}

          <div className="mb-3">
            <input type="email" name="email" placeholder="Email" className="form-control" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="mb-4">
            <input type="password" name="password" placeholder="Password" className="form-control" value={formData.password} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn btn-primary w-100">{isSignup ? 'Signup' : 'Login'}</button>
        </form>

        <div className="mt-3 text-center">
          <button className="btn btn-link"style={{ color: 'white' }} onClick={toggleForm}>
            {isSignup ? 'Already have an account? Login' : 'Create New User'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForms;
