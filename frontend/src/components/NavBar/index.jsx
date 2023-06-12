import React from "react";
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
        <NavLink to="/LandlordDashboard" style={styles}>
          Landlord
        </NavLink>
        <NavLink to="/Maintainance" style={styles}>
          Maintainance
        </NavLink>
        <NavLink to="/Property" style={styles}>
          Property
        </NavLink>
        <NavLink to="/TenantDashboard" style={styles}>
          Tenant
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
};

export default NavBar;
