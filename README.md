# 💧 PUREJAL — Premium Water Ordering Platform

PUREJAL is a **modern responsive water-ordering web application** built with **React + Vite**.
It provides a clean Flipkart-style shopping experience with **authentication, cart system, profile UI, checkout flow**, and a fully responsive **PRO MAX glass-morphism design**.

---

# 🚀 Live Features

## 🔐 Authentication System

* Retailer Signup & Login
* LocalStorage based session handling
* Role-based access (User / Admin ready)
* Auto redirect on logout

## 🛍️ Smart Dashboard

* Premium product cards
* Quantity control (+ / -)
* Dynamic price calculation
* Add to Cart with auto save
* Glassmorphism UI animations

## 🛒 PUREJAL Cart PRO

* Flipkart-style cart layout
* Same item auto-merge logic
* Quantity update & live total
* Remove item option
* Auto redirect to dashboard if cart becomes empty
* Sticky checkout bar

## 👤 User Profile System

* Avatar from username
* Navbar user identity display
* Logout functionality
* Future backend ready

## 💳 Checkout Page

Responsive delivery form including:

* Full Name
* Mobile Number
* Address
* Delivery Address
* Pincode
* Order Confirmation UI

## 🎨 PRO MAX Navbar

* Glass UI
* Responsive mobile layout
* Cart badge counter
* Profile + Logout
* Ultra mobile optimized

---

# 📱 Fully Responsive Design

PUREJAL UI works perfectly across:

* 💻 Desktop
* 💼 Laptop
* 📱 Mobile
* 📲 Tablets
* iPhone & Android devices

Responsive sections include:

* Navbar
* Dashboard Grid
* Cart Page
* Checkout Form

---

# 🧱 Tech Stack

### Frontend

* React JS
* Vite
* React Router DOM
* CSS (Glass UI + Responsive System)

### State Handling

* useState
* useEffect
* LocalStorage (Temporary Database)

---

# 📂 Project Structure

```
frontend/
│
├── src/
│   ├── components/
│   │      Navbar.jsx
│   │
│   ├── pages/
│   │      Dashboard.jsx
│   │      Cart.jsx
│   │      Checkout.jsx
│   │      Profile.jsx
│   │      Login.jsx
│   │      Signup.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── CSS files
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```
git clone https://github.com/YOUR_USERNAME/purejal.git
```

## 2️⃣ Install Dependencies

```
npm install
```

## 3️⃣ Run Project

```
npm run dev
```

Open:

```
http://localhost:5173
```

---

# 🔄 Current Workflow

1. User Signup/Login
2. Dashboard shows water products
3. Add items to cart
4. Cart auto syncs with localStorage
5. Checkout form submission

---

# 🧠 Architecture Logic

## Cart System

* Cart stored inside:

```
localStorage → purejalCart
```

Each item structure:

```
{
  id,
  name,
  price,
  img,
  qty,
  total
}
```

Same items merge automatically by ID.

---

## Authentication Logic

```
purejalRole
purejalCurrentUser
```

Used for:

* Navbar display
* Page protection
* Redirect handling

---

# 🔥 Upcoming Backend Upgrade (Planned)

* Node.js + Express API
* MongoDB database
* JWT Authentication
* Order history
* Admin panel
* Payment integration

---

# 🎯 UI Highlights

* Ultra Glass Navbar
* Floating Product Cards
* Slide Cart Panel
* Premium Gradient Buttons
* Smooth Hover Animations

---

# 🤝 Author

**Aftab Alam**
Aspiring AI & Full Stack Developer
Passionate about Automation, UI Engineering & Scalable Systems.

---

# ⭐ Support

If you like this project:

```
⭐ Star the repository
🍴 Fork it
🚀 Build something amazing
```

---

# 💧 PUREJAL

> Premium Water Ordering Experience — Designed for Performance & Style.
