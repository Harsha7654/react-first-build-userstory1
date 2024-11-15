import { Link } from "react-router-dom";

import "./Header.css";

function Header() {
  // Properties ---------------------------
  // Hooks --------------------------------
  // Context ------------------------------
  // Methods ------------------------------
  // View ---------------------------------
  return (
    <header>
      <Link to="/">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgTpwWIdo5kfJFOiypBy4AYXlfc4Gb4WgWUw&s"
          alt="Icon showing group"
        />
      </Link>
      <Link to="/">
        <h1>Kuizz App</h1>
      </Link>
      <div className="login">
        <p>Welcome John Doe!</p>
      </div>
    </header>
  );
}

export default Header;
