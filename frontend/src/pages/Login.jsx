import "../styles/global.css";

import bottle from "../assets/purejal-bottle.png";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setRole }) {

  const heroRef = useRef(null);
  const navigate = useNavigate();

  const [mobile,setMobile] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(false);
  const [wave,setWave] = useState(false); // 🌊 cinematic wave

  /* =============================
     HERO 3D MOVE
  ============================= */
  const handleMove = (e) => {

    const bottleEl = heroRef.current;
    if(!bottleEl) return;

    const x = (window.innerWidth/2 - e.clientX)/40;
    const y = (window.innerHeight/2 - e.clientY)/40;

    bottleEl.style.transform =
      `rotateY(${x}deg) rotateX(${-y}deg)`;
  };

  const resetMove = () => {
    if(heroRef.current){
      heroRef.current.style.transform =
        "rotateY(0deg) rotateX(0deg)";
    }
  };

  /* =============================
     LOGIN SYSTEM (CINEMATIC)
  ============================= */
  const handleLogin = () => {

    if(!mobile || !password){
      setError(true);
      setTimeout(()=>setError(false),400);
      return;
    }

    setLoading(true);

    setTimeout(()=>{

      /* 🔥 ADMIN LOGIN */
      if(mobile==="admin" && password==="123"){

        setRole("admin");
        setWave(true); // 🌊 trigger wave

        setTimeout(()=>{
          navigate("/admin");
        },600);

        return;
      }
if(mobile==="user" && password==="123"){

  const demoUser = {
    name:"Demo Retailer",
    mobile:"user",
    role:"retailer"
  };

  localStorage.setItem(
    "purejalCurrentUser",
    JSON.stringify(demoUser)
  );

  setRole("retailer");
  setWave(true);

  setTimeout(()=>{
    navigate("/dashboard");
  },600);

  return;
}


      /* 🔥 USER LOGIN FROM STORAGE */
      const users =
        JSON.parse(localStorage.getItem("purejalUsers")) || [];

      const found = users.find(
        u => u.mobile===mobile && u.password===password
      );

      if(found){

        setRole(found.role || "retailer");
        setWave(true); // 🌊 trigger wave

        setTimeout(()=>{
          navigate("/dashboard");
        },600);

      }else{
        setError(true);
        setTimeout(()=>setError(false),400);
      }

      setLoading(false);

    },800);
  };

  return (
    <div className="pro-login-wrapper">

      {/* 🌊 CINEMATIC WAVE OVERLAY */}
      {wave && <div className="login-wave"></div>}

      {/* LEFT BRAND SIDE */}
      <div className="brand-side">

        <div className="liquid-bg"></div>
        <div className="water-aura"></div>
        <div className="water-aura-2"></div>

        <div
          className="hero-wrap"
          onMouseMove={handleMove}
          onMouseLeave={resetMove}
        >
          <div className="light-strip"></div>

          <img
            ref={heroRef}
            src={bottle}
            className="hero-bottle"
            alt="PUREJAL Bottle"
          />
        </div>

        <div className="brand-content">
          <h1>PUREJAL</h1>
          <p>Premium B2B Water Supply Platform</p>
        </div>

      </div>

      {/* RIGHT LOGIN SIDE */}
      <div className="form-side">
        <div className={`login-card ${error ? "shake":""}`}>

          <h2>Welcome Back</h2>
          <p>Retailer Login</p>

          <input
            type="text"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e)=>setMobile(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password / OTP"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button
            className={`primary-btn ${loading?"loading":""}`}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? <span className="loader"></span> : "Login"}
          </button>

          {/* SIGNUP LINK */}
          <p
            style={{marginTop:"12px",cursor:"pointer",opacity:.7}}
            onClick={()=>navigate("/signup")}
          >
            New user? Create Account
          </p>

        </div>
      </div>

    </div>
  );
}
