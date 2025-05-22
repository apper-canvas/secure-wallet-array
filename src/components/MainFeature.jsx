import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';

const MainFeature = () => {
  // States for expense tracking
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [expenses, setExpenses] = useState([
    { id: 1, amount: 45.99, category: 'Groceries', description: 'Weekly shopping', date: 'Jan 25' },
    { id: 2, amount: 12.50, category: 'Transportation', description: 'Bus fare', date: 'Jan 24' }
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Icons
  const PlusIcon = getIcon('plus');
  const CheckIcon = getIcon('check');
  const XIcon = getIcon('x');
  const EditIcon = getIcon('edit-3');
  const TrashIcon = getIcon('trash-2');
  const ReceiptIcon = getIcon('receipt');
  const PieChartIcon = getIcon('pie-chart');
  const ArrowRightIcon = getIcon('arrow-right');
  const ClipboardListIcon = getIcon('clipboard-list');
  
  // Handle adding new expense
  const handleAddExpense = (e) => {
    e.preventDefault();
    
    // Validate inputs
    const newErrors = {};
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    if (!category) {
      newErrors.category = 'Please select a category';
    }
    if (!description) {
      newErrors.description = 'Please enter a description';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Add new expense
    const newExpense = {
      id: Date.now(),
      amount: parseFloat(amount),
      category,
      description,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
    
    setExpenses([newExpense, ...expenses]);
    
    // Reset form
    setAmount('');
    setCategory('');
    setDescription('');
    setIsAdding(false);
    setErrors({});
    
    // Show success toast
    toast.success('Expense added successfully!');
  };
  
  // Handle expense deletion
  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
    toast.success('Expense deleted successfully!');
  };
  
  // Get total expenses
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  
  // Category options
  const categories = [
    'Groceries',
    'Transportation',
    'Entertainment',
    'Utilities',
    'Dining',
    'Shopping',
    'Healthcare',
    'Education',
    'Travel',
    'Other'
  ];
  
  return (
    <motion.div
      className="card-neu overflow-hidden relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-accent"></div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
            <ReceiptIcon className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-medium">Expense Tracker</h3>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAdding(!isAdding)}
            className={`p-2 rounded-full transition-colors ${
              isAdding ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
              'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
            }`}
            aria-label={isAdding ? "Cancel adding expense" : "Add new expense"}
          >
            {isAdding ? <XIcon className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />}
          </button>
        </div>
      </div>
      
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-surface-500">Total Expenses</p>
          <h2 className="text-2xl font-bold">${totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
        </div>
        
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
            onClick={() => toast.info("Budget analytics coming soon!")}
          >
            <PieChartIcon className="h-5 w-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
            onClick={() => toast.info("Export feature coming soon!")}
          >
            <ClipboardListIcon className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
      
      <AnimatePresence>
        {isAdding && (
          <motion.form
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden mb-4"
            onSubmit={handleAddExpense}
          >
            <div className="p-4 bg-surface-100 dark:bg-surface-700 rounded-lg space-y-3">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium mb-1">Amount ($)</label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className={`w-full ${errors.amount ? 'border-red-500 dark:border-red-500' : ''}`}
                  step="0.01"
                  min="0.01"
                />
                {errors.amount && <p className="text-xs text-red-500 mt-1">{errors.amount}</p>}
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-1">Category</label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={`w-full ${errors.category ? 'border-red-500 dark:border-red-500' : ''}`}
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description"
                  className={`w-full ${errors.description ? 'border-red-500 dark:border-red-500' : ''}`}
                />
                {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
              </div>
              
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-dark transition-colors flex items-center gap-1"
                >
                  <CheckIcon className="h-4 w-4" />
                  <span>Save Expense</span>
                </motion.button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
      
      <div className="max-h-[280px] overflow-y-auto scrollbar-hide">
        {expenses.length === 0 ? (
          <div className="text-center py-6 text-surface-500">
            <p>No expenses recorded yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-surface-200 dark:divide-surface-700">
            {expenses.map((expense, index) => (
              <motion.div
                key={expense.id}
                className="py-3 flex items-center justify-between"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-secondary"></div>
                  <div>
                    <h4 className="font-medium">{expense.description}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-surface-200 dark:bg-surface-700">
                        {expense.category}
                      </span>
                      <span className="text-xs text-surface-500">{expense.date}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="font-medium">${expense.amount.toFixed(2)}</span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => {
                        toast.info("Edit feature coming soon!");
                      }}
                      className="p-1 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
                    >
                      <EditIcon className="h-3.5 w-3.5 text-surface-500" />
                    </button>
                    <button
                      onClick={() => handleDeleteExpense(expense.id)}
                      className="p-1 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
                    >
                      <TrashIcon className="h-3.5 w-3.5 text-surface-500" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      {expenses.length > 0 && (
        <div className="mt-4 pt-3 border-t border-surface-200 dark:border-surface-700 flex justify-center">
          <button 
            className="text-sm text-secondary hover:text-secondary-dark transition-colors flex items-center gap-1"
            onClick={() => toast.info("Full expense history will be available soon!")}
          >
            <span>View All Expenses</span>
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default MainFeature;