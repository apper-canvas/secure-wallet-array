import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getIcon } from '../utils/iconUtils';

const NotFound = () => {
  const AlertTriangleIcon = getIcon('alert-triangle');
  const HomeIcon = getIcon('home');
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="mx-auto mb-6 w-24 h-24 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center"
        >
          <AlertTriangleIcon className="h-12 w-12 text-amber-500" />
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          404
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl font-medium mb-2"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          Page Not Found
        </motion.p>
        
        <motion.p 
          className="text-surface-600 dark:text-surface-400 mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors duration-200"
          >
            <HomeIcon className="h-5 w-5" />
            Return Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;