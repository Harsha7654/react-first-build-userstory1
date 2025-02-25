import { NavLink } from "react-router-dom";
import "./Footer.css";

function Footer() {
  // Properties ---------------------------
  // Hooks --------------------------------
  // Context ------------------------------
  // Methods ------------------------------
  const getLinkStyle = ({ isActive }) => (isActive ? "navSelected" : null);
  // View ---------------------------------
  return (
    <footer>
      <a href="https://icons8.com/icon/85327/expand-arrow">
        All Icons by Icons8
      </a>
      <div className="navItem logoutNavItem">
        <NavLink to="/logout" className={getLinkStyle}>
          Logout
        </NavLink>
      </div>
    </footer>
  );
}

export default Footer;
