import { useContext } from "react"
import "./navbar.css"
import {Link, useNavigate} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"


const Navbar = () => {
  const {user, logout} = useContext(AuthContext)
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    sessionStorage.clear(); // Clear session storage
    navigate("/login", { replace: true }); // Navigate to the login page without adding to history
  };

  return (
    <div className="navbar">
        <div className="navContainer">
          <Link to="/" style={{color: "inherit", textDecoration: "none"}} > 
          <span className="logo">Smartbooking</span>
          </Link>
          { user ? user.username && <button onClick = {handleLogout} className="logButton">Logout</button> : (
          <div className="navItems">
              <Link to = "/register"><button className="navButton">Register</button></Link>
              <Link to = "/login"><button className="navButton">Login</button></Link>
          </div>
          )}
          
        </div>

    </div>
  )
}

export default Navbar