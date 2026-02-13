import "../styles/global.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup(){

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [mobile,setMobile] = useState("");
  const [password,setPassword] = useState("");

  const handleSignup = () => {

    if(!name || !mobile || !password){
      alert("Fill all fields");
      return;
    }

    /* 🔥 SAVE USER IN LOCAL STORAGE */
    const users =
      JSON.parse(localStorage.getItem("purejalUsers")) || [];

    const newUser = {
      name,
      mobile,
      password,
      role:"retailer"
    };

    localStorage.setItem(
      "purejalUsers",
      JSON.stringify([...users,newUser])
    );

    alert("Signup Successful");

    navigate("/login");
  };

  return(
    <div className="auth-wrapper">

      <div className="login-card">

        <h2>Create Account</h2>
        <p>Join PUREJAL B2B Platform</p>

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e)=>setMobile(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          className="primary-btn"
          onClick={handleSignup}
        >
          Signup
        </button>

        <p
          style={{marginTop:"12px",cursor:"pointer",opacity:.7}}
          onClick={()=>navigate("/login")}
        >
          Already have account? Login
        </p>

      </div>

    </div>
  );
}
