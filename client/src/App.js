import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Header from './components/Header.js';
import AddCategory from './pages/AddCategory.js';
import AddBlog from './pages/AddBlog.js';
import SingleBlog from './pages/SingleBlog.js';
import PrivateRoute from './services/Protected.js';
import Footer from './components/Footer.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewsComponent from './pages/News.js';

const App = () => {
  return (
    <>
   <ToastContainer />
   <Header/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/' element={<PrivateRoute/>}>
        <Route path="/" element={<Home />} />
        <Route path="/add-blog" element={<AddBlog />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/blog/:id" element={<SingleBlog />} />
        <Route path="/news" element={<NewsComponent />} />
        </Route>
      </Routes>
   <Footer/>
      </>
   
  );
};

export default App;
