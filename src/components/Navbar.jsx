import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo.png';

function Navbar() {
  return (
    <nav className="bg-red-600 p-4 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <img src={logo} alt="Eazy Eats Logo" className="h-12" />
      </Link>

      {/* Navigation Links */}
      <div className="space-x-6">
        <Link to="/register" className="text-white hover:text-gray-200">Register</Link>
        <Link to="/login" className="text-white hover:text-gray-200">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
