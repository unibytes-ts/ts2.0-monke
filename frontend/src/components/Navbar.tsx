
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Heart, Menu, X } from 'lucide-react';
import logo from '../assets/logo.svg';
import { Button } from './ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0.5 z-50 bg-white/70 dark:bg-neutral-800/70 backdrop-blur-lg shadow-lg px-6 py-3 flex items-center justify-between max-w-7xl mx-auto border border-white/20 dark:border-neutral-700/50 rounded-xl w-[calc(100%-2rem)] mt-4 transition-all duration-300 hover:shadow-xl hover:bg-white/80 dark:hover:bg-neutral-800/80">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <img src={logo} alt="Flow Up Logo" className="w-8 h-8" />
        <span className="text-xl font-bold text-[#1A2A36]">Flow Up</span>
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-8">
        <Link to="/marketplace" className="text-[#1A2A36] hover:text-green-700 font-medium transition-colors focus:underline underline-offset-4">Marketplace</Link>
        <Link to="/startups" className="text-[#1A2A36] hover:text-green-700 font-medium transition-colors focus:underline underline-offset-4">Startups</Link>
        <Link to="/mentor-connect" className="text-[#1A2A36] hover:text-green-700 font-medium transition-colors focus:underline underline-offset-4">Mentors</Link>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center space-x-3">
        <Link to="/signin">
          <Button variant="primary" className="rounded-lg px-6 py-2">Sign In</Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
