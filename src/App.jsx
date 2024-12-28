import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './user/login';
import CreateAccount from './pages/Signup';
import Navbar from './pages/navbar';
import Myprofile from './user/profile';

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Navbar should be outside Routes to be visible on all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<CreateAccount />} />
        <Route path="/profile" element={<Myprofile />} />

      </Routes>
    </Router>
  );
};

export default App;