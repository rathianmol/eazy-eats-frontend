import React from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import Link from react-router-dom
import logo from '../assets/Logo.png';

function Navbar() {
  const navigate = useNavigate();  // Initialize navigate function
  const token = localStorage.getItem('token'); // Check if the user is logged in

  const handleLogout = async () => {
    const response = await fetch('http://localhost:8000/api/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.ok) {
      // On successful logout, remove the token from localStorage
      localStorage.removeItem('token');
      alert('Logout successful!');
      // Redirect to login page
      navigate('/login');
    } else {
      alert('Logout failed!');
    }
  };

  return (
    <nav className="bg-red-600 p-4">
      <div className="flex justify-between items-center">

        {/* Logo and link to Home page. */}
        <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Eazy Eats Logo" className="h-12" />
        </Link>

        <div className="space-x-4">
          {token ? (
            // Links for logged-in users
            <>
              <Link to="/create-orders" className="text-white">Create Order</Link>
              <Link to="/user-orders" className="text-white">My Orders</Link>
              <button onClick={handleLogout} className="text-white">Logout</button> {/* Logout button */}
            </>
          ) : (
            // Links for users not logged in
            <>
              <Link to="/login" className="text-white">Login</Link>
              <Link to="/register" className="text-white">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
