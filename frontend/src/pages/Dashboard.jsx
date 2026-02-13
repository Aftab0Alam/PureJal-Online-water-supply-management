import "./Dashboard.css";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ products, role }) {

  const [qty,setQty] = useState({});
  const [cartItems,setCartItems] = useState(()=>{
    return JSON.parse(localStorage.getItem("purejalCart")) || [];
  });

  const [openCart,setOpenCart] = useState(false);

  const navigate = useNavigate();

  /* =============================
     🔥 AUTO REDIRECT IF LOGOUT
  ============================= */
  useEffect(()=>{

    if(!role){
      navigate("/login",{replace:true});
    }

  },[role]);   // ✅ VERY IMPORTANT

  /* =============================
     CHANGE QTY
  ============================= */
  const changeQty = (id,value) => {

    setQty(prev => {

      if(value === ""){
        return { ...prev, [id]:"" };
      }

      const num = Number(value);

      return {
        ...prev,
        [id]: num < 1 ? 1 : num
      };
    });
  };

  /* =============================
     ADD TO CART
  ============================= */
const addToCart = (product) => {

  const quantity = Number(qty[product.id]) || 1;

  // 🔥 check if item already exists
  const existingIndex = cartItems.findIndex(
    i => i.id === product.id
  );

  let updatedCart = [];

  if(existingIndex !== -1){

    // ✅ ITEM ALREADY EXISTS → QTY INCREASE
    updatedCart = cartItems.map(item => {

      if(item.id === product.id){

        const newQty = item.qty + quantity;

        return {
          ...item,
          qty:newQty,
          total:newQty * item.price
        };
      }

      return item;
    });

  }else{

    // ✅ NEW ITEM ADD
    updatedCart = [
      ...cartItems,
      {
        id:product.id,
        name:product.name,
        price:product.price,
        img:product.img,
        qty:quantity,
        total:quantity * product.price
      }
    ];
  }

  setCartItems(updatedCart);

  localStorage.setItem(
    "purejalCart",
    JSON.stringify(updatedCart)
  );
};


  const logout = () => {

  localStorage.removeItem("purejalRole");
  localStorage.removeItem("purejalCurrentUser"); // 🔥 FIXED

  navigate("/login",{replace:true});
};

  return(
    <div className="dashboard">

      {/* 🔥 PUREJAL SMART NAVBAR */}
      <Navbar
        role={role}
        cartCount={cartItems.length}
        onCartClick={()=>{

          if(!role){
            navigate("/login");
            return;
          }

          setOpenCart(true);
        }}
      />

      {/* HERO */}
      <div className="dash-hero">
        <p>Premium Water Ordering Panel</p>
      </div>

      {/* PRODUCTS */}
      <div className="product-grid">

        {products.map((p)=>{

          const quantity = qty[p.id] ?? 1;
          const total = (Number(quantity)||1) * p.price;

          return(
            <div key={p.id} className="product-card">

              <img src={p.img} alt="" />
              <h3>{p.name}</h3>

              <div className="order-panel">

                <div className="qty-control">

                  <button
                    onClick={()=>changeQty(
                      p.id,
                      (Number(quantity)||1)-1
                    )}
                  >
                    -
                  </button>

                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e)=>changeQty(
                      p.id,
                      e.target.value
                    )}
                  />

                  <button
                    onClick={()=>changeQty(
                      p.id,
                      (Number(quantity)||1)+1
                    )}
                  >
                    +
                  </button>

                </div>

                <p className="total">Total: ₹{total}</p>

                <button
                  className="order-btn"
                  onClick={()=>{

                    if(!role){
                      navigate("/login");
                      return;
                    }

                    addToCart(p);
                  }}
                >
                  Add to Cart
                </button>

              </div>

            </div>
          );
        })}

      </div>

      {/* BLUR OVERLAY */}
      {openCart && (
        <div
          className="cart-overlay"
          onClick={()=>setOpenCart(false)}
        ></div>
      )}

      {/* SLIDE CART */}
      <div className={`cart-panel ${openCart?"open":""}`}>

        <div className="cart-header">
          <h3>Your Cart</h3>
          <button onClick={()=>setOpenCart(false)}>✖</button>
        </div>

        <div className="cart-body">

          {cartItems.length===0 && <p>No Items</p>}

          {cartItems.map((item,index)=>(
            <div key={index} className="cart-item">
              <p>{item.name}</p>
              <span>{item.qty} x ₹{item.total}</span>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}
