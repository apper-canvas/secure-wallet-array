import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

// Account Balance Card Component
const AccountBalanceCard = ({ account }) => {
  const EyeIcon = getIcon('eye');
  const EyeOffIcon = getIcon('eye-off');
  const [showBalance, setShowBalance] = useState(false);
  
  return (
    <motion.div 
      className="card-neu overflow-hidden relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>
      
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-medium">{account.name}</h3>
          <p className="text-sm text-surface-500">{account.number}</p>
        </div>
        <button
          onClick={() => setShowBalance(!showBalance)}
          className="p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
          aria-label={showBalance ? "Hide balance" : "Show balance"}
        >
          {showBalance ? (
            <EyeOffIcon className="h-5 w-5" />
          ) : (
            <EyeIcon className="h-5 w-5" />
          )}
        </button>
      </div>
      
      <div className="mt-4">
        <p className="text-sm text-surface-500">Available Balance</p>
        <h2 className="text-2xl md:text-3xl font-bold">
          {showBalance ? (
            <span>{account.currency} {account.balance.toLocaleString()}</span>
          ) : (
            <span>●●●●●●</span>
          )}
        </h2>
      </div>
    </motion.div>
  );
};

// Quick Action Button Component
const QuickActionButton = ({ icon, label, onClick, delay }) => {
  const IconComponent = getIcon(icon);
  
  return (
    <motion.button
      className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white dark:bg-surface-800 hover:bg-surface-100 dark:hover:bg-surface-700 transition-all duration-200 shadow-card"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
        <IconComponent className="h-5 w-5" />
      </div>
      <span className="text-sm font-medium">{label}</span>
    </motion.button>
  );
};

// Recent Transaction Component
const RecentTransaction = ({ transaction, index }) => {
  // Determine icon based on transaction type
  const getTransactionIcon = (type) => {
    switch(type) {
      case 'deposit': return 'arrow-down-circle';
      case 'withdrawal': return 'arrow-up-circle';
      case 'transfer': return 'repeat';
      case 'payment': return 'credit-card';
      default: return 'circle';
    }
  };
  
  const TransactionIcon = getIcon(getTransactionIcon(transaction.type));
  
  // Determine text color based on transaction type
  const getAmountColor = (type) => {
    return type === 'deposit' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  };
  
  return (
    <motion.div 
      className="flex items-center gap-4 p-3 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center 
        ${transaction.type === 'deposit' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 
          'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
        <TransactionIcon className="h-5 w-5" />
      </div>
      
      <div className="flex-1">
        <h4 className="font-medium">{transaction.description}</h4>
        <p className="text-sm text-surface-500">{transaction.date}</p>
      </div>
      
      <div className={`font-medium ${getAmountColor(transaction.type)}`}>
        {transaction.type === 'deposit' ? '+' : '-'} {transaction.currency} {transaction.amount.toLocaleString()}
      </div>
    </motion.div>
  );
};

// Mock data
const mockAccount = {
  name: "Premium Checking",
  number: "**** **** **** 4589",
  balance: 12467.89,
  currency: "$"
};

const mockTransactions = [
  {
    id: 1,
    description: "Salary Deposit",
    amount: 5000,
    currency: "$",
    date: "Today, 10:45 AM",
    type: "deposit"
  },
  {
    id: 2,
    description: "Grocery Store",
    amount: 85.25,
    currency: "$",
    date: "Yesterday, 6:30 PM",
    type: "withdrawal"
  },
  {
    id: 3,
    description: "Electric Bill",
    amount: 120.50,
    currency: "$",
    date: "Jan 24, 2023",
    type: "payment"
  },
  {
    id: 4,
    description: "Transfer to Savings",
    amount: 500,
    currency: "$",
    date: "Jan 23, 2023",
    type: "transfer"
  }
];

// Home Page
const Home = () => {
  // Function to handle quick action clicks
  const handleQuickAction = (action) => {
    toast.info(`${action} feature will be available soon!`);
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <section className="mb-10">
        <motion.h1 
          className="text-2xl md:text-3xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Welcome to SecureWallet
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AccountBalanceCard account={mockAccount} />
          
          <MainFeature />
        </div>
      </section>
      
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <QuickActionButton 
            icon="send" 
            label="Transfer" 
            onClick={() => handleQuickAction('Transfer')}
            delay={0}
          />
          <QuickActionButton 
            icon="credit-card" 
            label="Pay Bills" 
            onClick={() => handleQuickAction('Bill Payment')}
            delay={1}
          />
          <QuickActionButton 
            icon="arrows-up-down" 
            label="Exchange" 
            onClick={() => handleQuickAction('Currency Exchange')}
            delay={2}
          />
          <QuickActionButton 
            icon="landmark" 
            label="Investments" 
            onClick={() => handleQuickAction('Investments')}
            delay={3}
          />
          <QuickActionButton 
            icon="piggy-bank" 
            label="Savings" 
            onClick={() => handleQuickAction('Savings')}
            delay={4}
          />
          <QuickActionButton 
            icon="file-text" 
            label="Statements" 
            onClick={() => handleQuickAction('Statements')}
            delay={5}
          />
        </div>
      </section>
      
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Recent Transactions</h2>
          <button 
            className="text-sm text-primary hover:text-primary-dark transition-colors"
            onClick={() => toast.info("Full transaction history will be available soon!")}
          >
            View All
          </button>
        </div>
        
        <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card overflow-hidden">
          <div className="divide-y divide-surface-200 dark:divide-surface-700">
            {mockTransactions.map((transaction, index) => (
              <RecentTransaction 
                key={transaction.id} 
                transaction={transaction}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;