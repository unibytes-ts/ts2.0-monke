
import { Link } from 'react-router-dom';
import { Leaf, Facebook, Twitter, Instagram, LinkedinIcon as LinkedIn } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FU</span>
              </div>
              <span className="text-xl font-bold">Flow Up</span>
            </div>
            <p className="text-gray-400 max-w-sm">
              Empowering student entrepreneurs to build sustainable businesses 
              within campus communities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <LinkedIn className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Marketplace */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Marketplace</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/products" className="hover:text-white transition-colors">Browse Products</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Find Services</Link></li>
              <li><Link to="/categories" className="hover:text-white transition-colors">Categories</Link></li>
              <li><Link to="/eco-products" className="hover:text-white transition-colors">Eco-Friendly</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Community</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/startups" className="hover:text-white transition-colors">Student Startups</Link></li>
              <li><Link to="/mentors" className="hover:text-white transition-colors">Find Mentors</Link></li>
              <li><Link to="/events" className="hover:text-white transition-colors">Campus Events</Link></li>
              <li><Link to="/forums" className="hover:text-white transition-colors">Discussion Forums</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/guidelines" className="hover:text-white transition-colors">Community Guidelines</Link></li>
              <li><Link to="/sustainability" className="hover:text-white transition-colors">Sustainability</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2024 Flow Up. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <div className="flex items-center text-green-400 text-sm">
                <Leaf className="w-4 h-4 mr-1" />
                Carbon Neutral Platform
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
