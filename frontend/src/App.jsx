import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";

export default function App(){

  /* =============================
     PRODUCTS (AUTO LOAD + SAVE)
  ============================= */

  const [products,setProducts] = useState(()=>{

    const saved = localStorage.getItem("purejalProducts");

    return saved
      ? JSON.parse(saved)
      : [
          { id:1,name:"1 Litre Bottle",price:20,img:"/bottle1.png" }
        ];
  });

  useEffect(()=>{
    localStorage.setItem(
      "purejalProducts",
      JSON.stringify(products)
    );
  },[products]);

  /* =============================
     ROLE SESSION
  ============================= */

  const [role,setRole] = useState(
    localStorage.getItem("purejalRole") || null
  );

  useEffect(()=>{
    if(role){
      localStorage.setItem("purejalRole",role);
    }else{
      localStorage.removeItem("purejalRole");
    }
  },[role]);

  /* =============================
     ROUTES
  ============================= */

  return(
    <BrowserRouter>

      <Routes>

        {/* 🔐 LOGIN */}
        <Route
          path="/login"
          element={
            role
              ? <Navigate to={role==="admin" ? "/admin" : "/dashboard"} />
              : <Login setRole={setRole}/>
          }
        />



  {/* checkout page route  */} 

<Route
  path="/checkout"
  element={<Checkout role={role} />}
/>


        {/* cart page route  */}
      <Route
  path="/cart"
  element={<Cart role={role} />}
/>




        {/* 👀 PUBLIC DASHBOARD (Flipkart Style) */}
        <Route
          path="/"
          element={
            <Dashboard
              products={products}
              role={role}
            />
          }
        />

<Route path="/profile" element={<Profile/>}/>


        <Route
  path="/signup"
  element={<Signup/>}
/>


        {/* ALSO SUPPORT /dashboard URL */}
        <Route
          path="/dashboard"
          element={
            <Dashboard
              products={products}
              role={role}
            />
          }
        />

        {/* 👨‍💼 ADMIN PANEL (Protected) */}
        <Route
          path="/admin"
          element={
            role==="admin"
              ? (
                  <Admin
                    products={products}
                    setProducts={setProducts}
                    setRole={setRole}
                  />
                )
              : <Navigate to="/login"/>
          }
        />

        {/* ❌ FALLBACK */}
        <Route
          path="*"
          element={<Navigate to="/"/>}
        />

      </Routes>

    </BrowserRouter>
  );
}
