import { NavLink } from "react-router-dom";
import "./Header.css";
const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-sm  navbar1">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon "></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={(navDate) =>
                    navDate.isActive
                      ? "nav-link text-white bg-primary"
                      : "nav-link text-white"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/CreateTask"
                  className={(navDate) =>
                    navDate.isActive
                      ? "nav-link text-white bg-primary"
                      : "nav-link text-white"
                  }
                >
                  CreateTask
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
