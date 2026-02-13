import "./Admin.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin({products,setProducts,setRole}){

  const [name,setName] = useState("");
  const [price,setPrice] = useState("");
  const [img,setImg] = useState("");
  const [editId,setEditId] = useState(null);


  // logout function 
const navigate = useNavigate();

/* 🔥 LOGOUT */
const logout = () => {
    setRole(null);       // 🔥 instant state update
    navigate("/login");
  };



  /* ADD OR UPDATE PRODUCT */
  const saveProduct = () => {

    if(!name || !price) return;

    if(editId){

      /* 🔥 UPDATE MODE */
      const updated = products.map(p =>
        p.id === editId
          ? { ...p, name, price:Number(price), img: img || "/bottle1.png" }
          : p
      );

      setProducts(updated);
      setEditId(null);

    }else{

      /* 🔥 ADD MODE */
      const newProduct = {
        id: Date.now(),
        name,
        price:Number(price),
        img: img || "/bottle1.png"
      };

      setProducts([...products,newProduct]);
    }

    setName("");
    setPrice("");
    setImg("");
  };

  /* 🔥 DELETE PRODUCT */
  const removeProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  /* 🔥 EDIT LOAD */
  const editProduct = (p) => {
    setName(p.name);
    setPrice(p.price);
    setImg(p.img);
    setEditId(p.id);
  };

  return(
    <div className="admin">

     <div className="admin-hero">

  <div className="admin-top">

    <div>
      <h2>PUREJAL Admin Panel</h2>
      <p>Manage Water Products</p>
    </div>

    <button className="logout-btn" onClick={logout}>
      Logout
    </button>

  </div>

</div>


      {/* FORM */}
      <div className="admin-card">

        <div className="admin-form">

          <input
            placeholder="Bottle Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
          />

          <input
            placeholder="Image Path"
            value={img}
            onChange={(e)=>setImg(e.target.value)}
          />

          <button className="admin-btn" onClick={saveProduct}>
            {editId ? "Update Product" : "Add Product"}
          </button>

        </div>

      </div>

      {/* 🔥 PRODUCT LIST */}
      <div className="admin-list">

        {products.map(p => (

          <div key={p.id} className="admin-item">

            <img src={p.img} alt="" />

            <div>
              <h4>{p.name}</h4>
              <p>₹{p.price}</p>
            </div>

            <div className="admin-actions">
              <button onClick={()=>editProduct(p)}>Edit</button>
              <button onClick={()=>removeProduct(p.id)}>Delete</button>
            </div>

          </div>

        ))}

      </div>

    </div>
  )
}
