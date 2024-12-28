import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './user/login';
import Signup from './pages/Signup';
import UserModule from './user/userapp';
import Myprofile from './user/profile';
import UserhomeModule from './user/userhome';
import EditProfile from './user/edit-profile';
import UserNav from './user/UserNav';
import Popular from './user/popular';
import { FavProvider } from './context/CartContext';
import App from './App';
import './index.css';

// Main module for conditional rendering
const MainModule = () => {
  if (localStorage.getItem("userid") === null) {
    return <App />;
  } else {
    if (localStorage.getItem("usertype") === "USER") {
      return <UserModule />;
    } else {
      return <CompanyModule />; // Ensure CompanyModule is defined
    }
  }
};

// Render the app with routing and CartProvider
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FavProvider> {/* Wrap the app with CartProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Myprofile />} />
          <Route path="/userhome" element={<UserhomeModule />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/UserNav" element={<UserNav />} />
          <Route path="/popular" element={<Popular />} />
        </Routes>
      </Router>
    </FavProvider> {/* Close the CartProvider wrapper */}
  </React.StrictMode>
);


export default MainModule;