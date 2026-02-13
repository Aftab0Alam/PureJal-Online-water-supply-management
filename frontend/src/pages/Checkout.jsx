import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Checkout.css";

export default function Checkout({ role }) {

  const navigate = useNavigate();

  const [cartItems,setCartItems] = useState([]);

  /* 🔥 DELIVERY FORM STATE */
  const [form,setForm] = useState({
    name:"",
    mobile:"",
    pincode:"",
    address:""
  });

  /* ================================
     LOAD CART
  =================================*/
  useEffect(()=>{

    if(!role){
      navigate("/login");
      return;
    }

    const saved =
      JSON.parse(localStorage.getItem("purejalCart")) || [];

    if(saved.length === 0){
      navigate("/dashboard");
      return;
    }

    setCartItems(saved);

  },[role]);

  /* ================================
     FORM CHANGE
  =================================*/
  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  };

  /* ================================
     TOTAL
  =================================*/
  const total =
    cartItems.reduce((sum,i)=> sum + i.total,0);

  /* ================================
     PLACE ORDER
  =================================*/
  const placeOrder = ()=>{

    if(!form.name || !form.mobile || !form.pincode || !form.address){
      alert("Fill all delivery details");
      return;
    }

    alert("🎉 PUREJAL Order Placed Successfully");

    localStorage.removeItem("purejalCart");

    navigate("/dashboard");
  };

  return(
    <div className="checkout-page">

      <h2>💧 PUREJAL Checkout</h2>

      <div className="checkout-grid">

        {/* ================= DELIVERY FORM ================= */}
        <div className="checkout-card">

          <h3>Delivery Details</h3>

          <div className="form-grid">

            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
            />

            <input
              name="mobile"
              placeholder="Mobile Number"
              value={form.mobile}
              onChange={handleChange}
            />

            <input
              name="pincode"
              placeholder="Pincode"
              value={form.pincode}
              onChange={handleChange}
            />

            <textarea
              name="address"
              placeholder="Full Delivery Address..."
              value={form.address}
              onChange={handleChange}
            />

          </div>

        </div>

        {/* ================= ORDER SUMMARY ================= */}
        <div className="checkout-card">

          <h3>Order Summary</h3>

          {cartItems.map(item=>(
            <div key={item.id} className="checkout-item">

              <img src={item.img} alt="" />

              <div>
                <p>{item.name}</p>
                <span>{item.qty} x ₹{item.price}</span>
              </div>

              <b>₹{item.total}</b>

            </div>
          ))}

          <hr/>

          <div className="checkout-total">
            <h3>Total</h3>
            <h3>₹{total}</h3>
          </div>

          <button
            className="place-btn"
            onClick={placeOrder}
          >
            Place Order
          </button>

        </div>

      </div>

    </div>
  );
}
