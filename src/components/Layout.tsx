import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-black/50 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <TrendingUp className="h-6 w-6 text-emerald-500" />
              <span className="text-xl font-bold text-white">ILP Sucks</span>
            </motion.div>
            
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden text-white"
            >
              {isSidebarOpen ? <X /> : <Menu />}
            </button>

            <nav className="hidden lg:flex space-x-8">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                href="/" 
                className={`transition-colors ${
                  location.pathname === '/' ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                Home
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                href="/visualization" 
                className={`transition-colors ${
                  location.pathname === '/visualization' ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                Visualize
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                href="/how-to-invest" 
                className={`transition-colors ${
                  location.pathname === '/how-to-invest' ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                How to Invest
              </motion.a>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <motion.div 
        initial={false}
        animate={{ x: isSidebarOpen ? 0 : '100%' }}
        className="fixed top-0 right-0 h-full w-64 bg-black/95 z-40 lg:hidden"
      >
        <div className="flex flex-col p-4 space-y-4 mt-16">
          <a 
            href="/" 
            className={`transition-colors ${
              location.pathname === '/' ? 'text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            Home
          </a>
          <a 
            href="/visualization" 
            className={`transition-colors ${
              location.pathname === '/visualization' ? 'text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            Visualize
          </a>
          <a 
            href="/how-to-invest" 
            className={`transition-colors ${
              location.pathname === '/how-to-invest' ? 'text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            How to Invest
          </a>
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="pt-16">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-md border-t border-gray-800 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-bold mb-4">ILP Sucks</h3>
              <p className="text-gray-400">Your trusted source for financial transparency</p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="/visualization" className="text-gray-400 hover:text-white transition-colors">Visualize</a></li>
                <li><a href="/how-to-invest" className="text-gray-400 hover:text-white transition-colors">How to Invest</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Contact</h3>
              <p className="text-gray-400">info@ilpsucks.com</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} ILP Sucks. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;