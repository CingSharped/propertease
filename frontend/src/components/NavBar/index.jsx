import { Outlet, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';

import './style.css';

const NavBar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const styles = ({ isActive }) => ({ color: isActive ? "#ECD444" : "white" });
  const navigate = useNavigate();
  const handleClick = () => {
    logout();
  };

  const handleDashboardClick = (e) => {
    e.preventDefault()

    user.user_type ? navigate (`/${user.user_type}`) : "" 
    
//     if ( user.user_type == "Tenant") {
      
//       return navigate("/tenant") 
//       console.log("I'm in tenant")
//     } else if ( user.user_type  === 'Service') {
//       navigate('/service') 
//     } else if ( user.user_type  === 'Landlord') {
//       navigate('/landlord') 
//     } else {
//       navigate('/login') 
//     }
// console.log(user.user_type)
  }

  // Do we need a variable that allows for user type?
  // let dashboardLink;
 
// let user = null;

//   try {

//     user = JSON.parse(localStorage.getItem('user'));
//     user = user.user_type

//   }

 
 

  return (
    <>
      <nav className="NavBar">
        <div className="propertease-logo-container">
          <NavLink to="/" ><img src="https://github.com/CingSharped/propertease/blob/staging/frontend/src/assets/images/PE_logo_D39B0B.png?raw=true" alt="" />
          <h3>PropertEase</h3></NavLink>
        </div>

        {!user ? 
          <>
            <div className="Nav-Links">
              <NavLink to="/login" style={styles}>
                Login/Sign Up
              </NavLink>
            </div>
          </>
          : 
            <>
              <div className="Nav-Links">
                < NavLink onClick={(e) => handleDashboardClick(e)} style={styles}>
                  Dashboard
                </NavLink>
                <NavLink onClick={(e) => logout(e)} style={styles}>
                  Logout
                </NavLink>
              </div>
            </> 
        }

  



          {/* <div className="Nav-Links">
            <NavLink to={dashboardLink} style={styles}>
              Dashboard
            </NavLink>
            <NavLink to="/login" style={styles}>
              Login/Sign Up
            </NavLink>
            <NavLink onClick={handleClick} style={styles}>
              Logout
            </NavLink>
          </div> */}
      </nav>
      <Outlet />
      

    </>
  );
};

export default NavBar;

