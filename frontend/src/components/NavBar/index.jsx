
import { Outlet, NavLink } from "react-router-dom";

import { useLogout } from '../../hooks/useLogout';
// import { useAuthContext } from '../../hooks/useAuthContext';

import './style.css'

const NavBar = () => {
  const { logout } = useLogout()
  // const { user } = useAuthContext()

  const styles = ({ isActive }) => ({ color: isActive ? "#ECD444" : "white" });
  
  const handleClick = () => {
    logout()
  }
  return (
    <div>
      <nav className="NavBar sticky">
        <div className="logo-container">
          <img src="https://github.com/CingSharped/propertease/blob/staging/frontend/src/assets/images/PE_logo_D39B0B.png?raw=true" alt="" />
          <h3>PropertEase</h3>
        </div>

        <div className="Nav-Links">
          <NavLink to="/" style={styles}>
            Home
          </NavLink>
          <NavLink to="/ifc" style={styles}>
            IFC
          </NavLink>
          {/* Logic to be added */}
          <NavLink to="/login" style={styles}>
            Login/Sign Up
          </NavLink>
          <NavLink onClick={handleClick} style={styles}>
            Logout
          </NavLink>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar
