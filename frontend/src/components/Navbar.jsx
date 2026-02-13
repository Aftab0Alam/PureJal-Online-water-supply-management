import "./Navbar.css";
import { useNavigate } from "react-router-dom";

export default function Navbar({ role, cartCount, onCartClick }) {

  const navigate = useNavigate();

  /* 🔥 CURRENT USER */
  const currentUser =
    JSON.parse(localStorage.getItem("purejalCurrentUser"));

  /* 🔥 LOGOUT FUNCTION */
  const handleLogout = () => {

    localStorage.removeItem("purejalRole");
    localStorage.removeItem("purejalCurrentUser");

    // Hard redirect (white screen issue avoid)
    window.location.href = "/login";
  };

  return(
    <div className="navbar">

      {/* LEFT */}
      <div
        className="nav-left"
        onClick={()=>navigate("/dashboard")}
      >
        💧 PUREJAL
      </div>

      {/* RIGHT */}
      <div className="nav-right">

        {/* CART */}
        <div className="nav-cart"onClick={()=>navigate("/cart")}
>
          🛒
          <span className="nav-badge">{cartCount}</span>
        </div>

        {/* USER PROFILE */}
        {currentUser ? (

          <div className="nav-user">

            {/* PROFILE CLICK */}
            <div
              className="nav-user-info"
              onClick={()=>navigate("/profile")}
            >
              <div className="avatar">
                {currentUser.name?.charAt(0)}
              </div>
              <span>{currentUser.name}</span>
            </div>

            {/* 🔥 LOGOUT BUTTON */}
            <button
              className="nav-logout"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        ) : (

          <button
            className="nav-login"
            onClick={()=>navigate("/login")}
          >
            Login
          </button>

        )}

      </div>

    </div>
  );
}
