import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/useAuth.js";
import useLoad from "../api/useLoad.js";
import "./FauxLogin.css";

export default function Login() {
  // Initialisation ------------------------------
  const { login } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  // State ---------------------------------------
  const [students, , loadingStudentsMessage] = useLoad(`/users/userRole/2`);
  const [staff, , loadingStaffMessage] = useLoad(`/users/userRole/1`);
  const [selectedUser, setSelectedUser] = useState(null);

  // Methods -------------------------------------
  const handleSubmit = (event) => {
    event.preventDefault();
    login(selectedUser);
    navigate("/account");
  };

  const handleStudentChange = (event) =>
    setSelectedUser(students[parseInt(event.target.value)]);
  const handleStaffChange = (event) =>
    setSelectedUser(staff[parseInt(event.target.value)]);

  // View ----------------------------------------
  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <h2>... as a student</h2>
        <label>Use this dropdown to select a student</label>
        {!students ? (
          <p>{loadingStudentsMessage}</p>
        ) : (
          <>
            <select onChange={handleStudentChange}>
              <option value={null}>Select student ...</option>
              {students.map((user, index) => (
                <option key={user.UserID} value={index}>
                  {`${user.UserUsername}, ${user.UserRoleID} (${user.UserEmail})`}
                </option>
              ))}
            </select>
          </>
        )}
        <h2>... as a teacher</h2>
        <label>Use this dropdown to select a Teacher ID</label>
        {!staff ? (
          <p>{loadingStaffMessage}</p>
        ) : (
          <>
            <select onChange={handleStaffChange}>
              <option value={null}>Select staff member ...</option>
              {staff.map((user, index) => (
                <option key={user.UserID} value={index}>
                  {`${user.UserUsername}, ${user.UserRoleID} (${user.UserEmail})`}
                </option>
              ))}
            </select>
          </>
        )}
        <button type="submit">Login</button>
      </form>
    </section>
  );
}
