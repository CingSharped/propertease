import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <nav class="navbar">
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" href="#">
              WebSiteName
            </a>
          </div>
          <ul class="nav navbar-nav">
            <li class="active">
              <NavLink to="/">Home</NavLink>
            </li>
            <li class="active">
              <NavLink to="/ifc">IFC</NavLink>
            </li>
            <li class="active">
              <NavLink to="/LandlordDashboard">Landlord</NavLink>
            </li>
            <li class="active">
              <NavLink to="/Maintainance">Maintainance</NavLink>
            </li>
            <li class="active">
              <NavLink to="/Maintainance">Maintainance</NavLink>
            </li>
            <li class="active">
              <NavLink to="/TenantDashboard">Tenant</NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default NavBar;
