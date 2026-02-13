import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Cart.css";

export default function Cart({ role }) {

  const navigate = useNavigate();

  const [cartItems,setCartItems] = useState([]);
  const [cartLoaded,setCartLoaded] = useState(false); // 🔥 IMPORTANT

  /* =============================
     LOAD CART FROM STORAGE
  ============================= */
  useEffect(()=>{

    const saved =
      JSON.parse(localStorage.getItem("purejalCart")) || [];

    setCartItems(saved);
    setCartLoaded(true); // 🔥 mark loaded

  },[]);

  /* =============================
     AUTO REDIRECT IF EMPTY (SAFE)
  ============================= */
  useEffect(()=>{

    // 🔥 only redirect after storage load
    if(cartLoaded && cartItems.length === 0){
      navigate("/dashboard",{ replace:true });
    }

  },[cartItems,cartLoaded]);

  /* =============================
     SAVE CART
  ============================= */
  const saveCart = (updated) => {

    setCartItems(updated);

    localStorage.setItem(
      "purejalCart",
      JSON.stringify(updated)
    );
  };

  /* =============================
     REMOVE ITEM
  ============================= */
  const removeItem = (id) => {

    const updated =
      cartItems.filter(i => i.id !== id);

    saveCart(updated);
  };

  /* =============================
     CHANGE QTY
  ============================= */
  const changeQty = (id,value) => {

    const updated = cartItems.map(item => {

      if(item.id === id){

        const qty = Number(value) < 1 ? 1 : Number(value);

        return {
          ...item,
          qty,
          total: qty * item.price
        };
      }

      return item;
    });

    saveCart(updated);
  };

  /* =============================
     GRAND TOTAL
  ============================= */
  const grandTotal =
    cartItems.reduce((sum,i)=> sum + i.total,0);

  return(
    <div className="cart-page">

      <h2>🛒 PUREJAL Cart</h2>

      {/* ITEMS */}
      <div className="cart-list">

        {cartItems.map(item => (

          <div key={item.id} className="cart-card">

            <img src={item.img} alt="" />

            <div className="cart-info">
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>

              {/* QTY CONTROL */}
              <div className="cart-qty">

                <button onClick={()=>changeQty(item.id,item.qty-1)}>
                  -
                </button>

                <input
                  type="number"
                  value={item.qty}
                  onChange={(e)=>changeQty(item.id,e.target.value)}
                />

                <button onClick={()=>changeQty(item.id,item.qty+1)}>
                  +
                </button>

              </div>

            </div>

            <div className="cart-right">
              <h4>₹{item.total}</h4>

              <button
                className="remove-btn"
                onClick={()=>removeItem(item.id)}
              >
                Remove
              </button>
            </div>

          </div>

        ))}

      </div>

      {/* 🔥 STICKY CHECKOUT BAR */}
      {cartItems.length>0 && (

        <div className="cart-summary">

          <h3>Total: ₹{grandTotal}</h3>

          <button
            className="checkout-btn"
            onClick={()=>{

              if(!role){
                navigate("/login");
                return;
              }

              navigate("/checkout");
            }}
          >
            Proceed to Checkout
          </button>

        </div>

      )}

    </div>
  );
}
