import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { getIcon } from './utils/iconUtils';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

// Header component with dark mode toggle
const Header = ({ darkMode, toggleDarkMode }) => {
  const SunIcon = getIcon('sun');
  const MoonIcon = getIcon('moon');
  const WalletIcon = getIcon('wallet');
  
  return (
    <header className="sticky top-0 z-10 bg-white/80 dark:bg-surface-900/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-700">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <motion.div 
            whileHover={{ rotate: [0, -10, 10, -5, 0] }}
            transition={{ duration: 0.5 }}
            className="text-primary dark:text-primary-light"
          >
            <WalletIcon className="h-7 w-7" />
          </motion.div>
          <span className="font-heading font-bold text-xl">SecureWallet</span>
        </a>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <SunIcon className="h-5 w-5 text-yellow-400" />
            ) : (
              <MoonIcon className="h-5 w-5 text-surface-600" />
            )}
          </button>
          
          <button 
            onClick={() => {
              toast.success('Logged out successfully!');
              // Add actual logout logic here when authentication is implemented
            }}
            className="px-3 py-1.5 text-sm rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
          >
            Logout
          </button>
        </div>
    </header>
  );
};

// Footer component
const Footer = () => {
  const ShieldIcon = getIcon('shield');
  
  return (
    <footer className="bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <ShieldIcon className="h-5 w-5 text-primary" />
            <p className="text-sm">Secure Banking Technology</p>
          </div>
          
          <div className="text-sm text-surface-500">
            &copy; {new Date().getFullYear()} SecureWallet. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  
  // Check user preference on initial load
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);
  
  // Apply dark mode class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className="flex flex-col min-h-screen">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      <Footer />
      
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
        toastClassName="!bg-white dark:!bg-surface-800 !shadow-card"
      />
    </div>
  );
}

export default App;