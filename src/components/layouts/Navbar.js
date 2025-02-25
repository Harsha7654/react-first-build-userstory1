import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  // Properties ---------------------------
  // Hooks --------------------------------
  // Context ------------------------------
  // Methods ------------------------------
  const getLinkStyle = ({ isActive }) => (isActive ? "navSelected" : null);
  // View ---------------------------------
  return (
    <nav>
      <div className="navItem">
        <NavLink to="/" className={getLinkStyle}>
          Home
        </NavLink>
      </div>
      <div className="navItem">
        <NavLink to="/subjects" className={getLinkStyle}>
          My Subjects
        </NavLink>
      </div>
      <div className="navItem">
        <NavLink to="/contact" className={getLinkStyle}>
          Contact Us
        </NavLink>
      </div>
      <div className="navItem accountNavItem">
        <NavLink to="/account" className={getLinkStyle}>
          Account
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
