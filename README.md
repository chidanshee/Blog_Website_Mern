# 📝 BlogByMe - Blog Web Application

**BlogByMe** is a full-stack blogging platform built with the **MERN** stack. It allows users to create, read, and explore blogs with robust security features like **JWT authentication**, **OTP verification**, and **secure MongoDB Atlas integration**.

---

## 🔗 Live Demo

👉 [Visit BlogByMe](https://blogbyme.vercel.app)

---

## 🚀 Features

- ✍️ Create and manage blogs
- 🗂️ Add and assign blog categories
- 🔍 Filter blog posts by category or keywords
- 📰 Read the latest news on a dedicated news page
- 🔐 Secure login and registration with **JWT token**
- 🔁 OTP verification for new user registration
- 🛡️ Protected routes and middleware-based access control
- ☁️ MongoDB Atlas cloud database with enhanced security settings
- 📦 Backend deployed using **Render**
- 🌐 Frontend deployed using **Vercel**
- 📱 Fully responsive design (Mobile + Desktop)
- 📊 Optimized performance (Google PageSpeed scores shown below)

---

## 📸 Screenshots

> Below are screenshots of various pages of the BlogByMe app

### 🔐 Login Page  
<img width="1440" alt="Login Page" src="https://github.com/user-attachments/assets/bb3b77b6-a921-4663-9dfb-ea24b77c2ab4" />

### 📝 Register Page  
<img width="1440" alt="Register Page" src="https://github.com/user-attachments/assets/71ae5b1b-f567-487e-b8a5-841b0800cdc2" />

### ➕ Add Blog Page  
<img width="1440" alt="Add Blog Page" src="https://github.com/user-attachments/assets/f5d43561-e756-4d7b-8595-7540256a9ed5" />

### 📰 Latest News Page  
<img width="1440" alt="Latest News Page" src="https://github.com/user-attachments/assets/3db12169-29db-42da-8c68-cadef4b48826" />

### 🔍 Blog Home Page  
<img width="1440" alt="Blog Home Page" src="https://github.com/user-attachments/assets/fdddf886-70e0-40a3-b0f6-a835b2fcbe75" />

### 🧾 PageSpeed Insights - Mobile  
<img width="1440" alt="PageSpeed Mobile" src="https://github.com/user-attachments/assets/da219888-b854-492d-b303-8b01f769293f" />

### 🖥️ PageSpeed Insights - Desktop  
<img width="1440" alt="PageSpeed Desktop" src="https://github.com/user-attachments/assets/cb60fd4f-a1cb-458f-ad3a-c5655345cb5e" />

---

## ⚙️ Tech Stack

- **Frontend:** React.js, Bootstrap CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Cloud)
- **Authentication:** JWT, OTP (via Email)
- **Deployment:**
  - Frontend: [Vercel](https://vercel.com/)
  - Backend: [Render](https://render.com/)

---

## 🔐 Security Features

- JWT token-based session management
- OTP verification during registration
- Middleware to protect private routes
- MongoDB Atlas secured with IP whitelisting and credentials

---

## 🧪 Performance Insights

> ✅ Excellent performance tested via Google PageSpeed Insights:

- **📱 Mobile:**  
  - Performance: 96  
  - Accessibility: 93  
  - Best Practices: 100  
  - SEO: 91

- **🖥️ Desktop:**  
  - Performance: 100  
  - Accessibility: 88  
  - Best Practices: 100  
  - SEO: 91

> See screenshots above for full Lighthouse audit results.

---

## 📌 Getting Started (Local Development)

```bash
# Clone the repository
git clone https://github.com/your-username/BLOG_WEBSITE.git
cd BLOG_WEBSITE

# Install dependencies for backend
cd server
npm install
nodemon index.js

# Install dependencies for frontend
cd ../client
npm install
npm start

