
// import { useState, useEffect } from "react";
// import axios from "axios";
// import 'bootstrap/dist/css/bootstrap.min.css';

// const CreateUserForm = () => {
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         password: "",
//         role: "user",
//     });

//     const [message, setMessage] = useState("");
//     const [alertType, setAlertType] = useState("success");

//     useEffect(() => {
//         const role = localStorage.getItem("role");
//         if (role !== "admin") {
//             window.location.href = "/";
//         }
//     }, []);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleCreate = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post("http://localhost:5000/Ohkla/createUser", formData);
//             setMessage(res.data.message);
//             setAlertType("success");
//             setFormData({
//                 name: "",
//                 email: "",
//                 password: "",
//                 role: "user",
//             });
//         } catch (err) {
//             setMessage(err.response?.data?.message || "Something went wrong");
//             setAlertType("danger");
//         }
//     };
//  //style={{ backgroundColor: '#173a60' }
//     return (
//         <div className="container mt-5" style={{ maxWidth: "600px"}}>
//             <div className="card shadow-sm border-0">
//                 <div className="card-header text-white "style={{
//     backgroundColor: '#173a60',
//     display: 'flex',
//     alignItems: 'center',       // Vertically center
//     justifyContent: 'center',   // Horizontally center
//   }}>
//                     <h4 className="mb-0">Create New User</h4>
//                 </div>
//                 <div className="card-body">
//                     {message && (
//                         <div className={`alert alert-${alertType}`} role="alert">
//                             {message}
//                         </div>
//                     )}
//                     <form onSubmit={handleCreate}>
//                         <div className="mb-3">
//                             <label className="form-label">Name</label>
//                             <input
//                                 type="text"
//                                 name="name"
//                                 className="form-control"
//                                 placeholder="Enter name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>

//                         <div className="mb-3">
//                             <label className="form-label">Email</label>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 className="form-control"
//                                 placeholder="Enter email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>

//                         <div className="mb-3">
//                             <label className="form-label">Password</label>
//                             <input
//                                 type="password"
//                                 name="password"
//                                 className="form-control"
//                                 placeholder="Enter password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>

//                         <div className="mb-3">
//                             <label className="form-label">Role</label>
//                             <select
//                                 name="role"
//                                 className="form-select"
//                                 value={formData.role}
//                                 onChange={handleChange}
//                             >
//                                 <option value="user">User</option>
//                                 <option value="admin">Admin</option>
//                             </select>
//                         </div>

//                       <div className="d-flex justify-content-center">
//   <button type="submit" className="btn btn-success w-30">
//     Create User
//   </button>
// </div>

//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CreateUserForm;


import { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateUserForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
    });

    const [message, setMessage] = useState("");
    const [alertType, setAlertType] = useState("success");

    useEffect(() => {
        const role = localStorage.getItem("role");
        if (role !== "admin") {
            window.location.href = "/";
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

       const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/Ohkla/createUser", formData);

            // SweetAlert success popup
            Swal.fire({
                icon: 'success',
                title: 'User Created',
                text: res.data.message,
                confirmButtonColor: '#198754'
            });

            setFormData({
                name: "",
                email: "",
                password: "",
                role: "user",
            });
        } catch (err) {
            // SweetAlert error popup
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.response?.data?.message || "Something went wrong",
                confirmButtonColor: '#dc3545'
            });
        }
    }
    return (
        <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <div className="card w-100 shadow" style={{ maxWidth: '500px' }}>
                <div className="card-header text-white text-center" style={{ backgroundColor: '#173a60' }}>
                    <h4>Create New User</h4>
                </div>
                <div className="card-body">
                    {message && (
                        <div className={`alert alert-${alertType} text-center`} role="alert">
                            {message}
                        </div>
                    )}
                    <form onSubmit={handleCreate}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Enter name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Role</label>
                            <select
                                name="role"
                                className="form-select"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="user">User</option>
                                <option value="admin">admin</option>
                            </select>
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-success">
                                Create User
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateUserForm;
