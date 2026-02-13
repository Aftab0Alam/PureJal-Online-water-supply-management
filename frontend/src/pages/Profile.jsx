import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile(){

  const navigate = useNavigate();

  const current =
    JSON.parse(localStorage.getItem("purejalCurrentUser"));

  const [edit,setEdit] = useState(false);
  const [name,setName] = useState(current?.name || "");

  if(!current){
    navigate("/login");
    return null;
  }

  /* 🔥 SAVE PROFILE */
  const saveProfile = () => {

    const users =
      JSON.parse(localStorage.getItem("purejalUsers")) || [];

    const updatedUsers = users.map(u =>
      u.mobile === current.mobile
        ? { ...u, name }
        : u
    );

    localStorage.setItem(
      "purejalUsers",
      JSON.stringify(updatedUsers)
    );

    const updatedCurrent = {
      ...current,
      name
    };

    localStorage.setItem(
      "purejalCurrentUser",
      JSON.stringify(updatedCurrent)
    );

    setEdit(false);
    window.location.reload(); // navbar update
  };

  /* 🔥 LOGOUT */
  const logout = () => {
    localStorage.removeItem("purejalCurrentUser");
    localStorage.removeItem("purejalRole");
    navigate("/login");
  };

  return(
    <div className="profile-page">

      <div className="profile-card">

        {/* AVATAR */}
        <div className="profile-avatar">
          {current.role==="admin" && <span className="crown">👑</span>}
          {name.charAt(0)}
        </div>

        {/* NAME */}
        {edit ? (
          <input
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
        ) : (
          <h2>{name}</h2>
        )}

        <p>📱 {current.mobile}</p>
        <p className="role">
          {current.role==="admin"
            ? "Admin Account"
            : "Retailer"}
        </p>

        {/* ACTION BUTTONS */}
        <div className="profile-actions">

          {edit ? (
            <button onClick={saveProfile}>
              Save
            </button>
          ) : (
            <button onClick={()=>setEdit(true)}>
              Edit Profile
            </button>
          )}

          <button className="logout-btn" onClick={logout}>
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}
