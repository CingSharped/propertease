
import { Outlet, NavLink } from "react-router-dom";

const NavBar = () => {
  const styles = ({ isActive }) => ({ color: isActive ? "#ECD444" : "black" });

  return (
    <>
      <nav>
        <NavLink to="/" style={styles}>
          Home
        </NavLink>
        <NavLink to="/ifc" style={styles}>
          IFC
        </NavLink>
        <NavLink to="/login" style={styles}>
          Login/Sign Up
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}

export default NavBar