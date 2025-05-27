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

// Banking Tab View Component
const BankingTabView = () => {
  const [activeTab, setActiveTab] = useState('cards');
  
  const tabs = [
    { id: 'cards', label: 'Cards', icon: 'credit-card' },
    { id: 'mutual-funds', label: 'Mutual Funds', icon: 'trending-up' },
    { id: 'international', label: 'International', icon: 'globe' },
    { id: 'help', label: 'Help', icon: 'help-circle' },
    { id: 'investments', label: 'Investments', icon: 'bar-chart-3' },
    { id: 'other', label: 'Other Services', icon: 'more-horizontal' }
  ];
  
  const renderTabContent = () => {
    switch(activeTab) {
      case 'cards':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Your Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm opacity-90">Premium Card</p>
                    <p className="text-lg font-bold">**** **** **** 4589</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm opacity-90">Expires</p>
                    <p className="font-medium">12/25</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs opacity-75">Available Credit</p>
                    <p className="text-xl font-bold">$8,450</p>
                  </div>
                  <button 
                    onClick={() => toast.info('Card management features coming soon!')}
                    className="px-3 py-1 bg-white/20 rounded-md text-sm hover:bg-white/30 transition-colors"
                  >
                    Manage
                  </button>
                </div>
              </div>
              <div className="p-4 border-2 border-dashed border-surface-300 dark:border-surface-600 rounded-lg flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <div className="text-primary text-2xl">+</div>
                </div>
                <p className="font-medium mb-1">Apply for New Card</p>
                <p className="text-sm text-surface-500 mb-3">Get instant approval</p>
                <button 
                  onClick={() => toast.info('Card application process coming soon!')}
                  className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition-colors"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        );
      case 'mutual-funds':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Investment Portfolio</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'Growth Fund A', value: '$12,450', change: '+8.5%', positive: true },
                { name: 'Balanced Fund B', value: '$8,720', change: '+3.2%', positive: true },
                { name: 'Index Fund C', value: '$15,230', change: '-1.8%', positive: false }
              ].map((fund, index) => (
                <div key={index} className="p-4 bg-white dark:bg-surface-800 rounded-lg shadow-card">
                  <h4 className="font-medium mb-2">{fund.name}</h4>
                  <p className="text-2xl font-bold mb-1">{fund.value}</p>
                  <p className={`text-sm ${
                    fund.positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {fund.change} this month
                  </p>
                  <button 
                    onClick={() => toast.info(`${fund.name} details coming soon!`)}
                    className="mt-3 w-full py-2 bg-surface-100 dark:bg-surface-700 rounded-md text-sm hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'international':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">International Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white dark:bg-surface-800 rounded-lg shadow-card">
                <h4 className="font-medium mb-3">Currency Exchange</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>USD to EUR</span>
                    <span className="font-medium">0.85</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>USD to GBP</span>
                    <span className="font-medium">0.73</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>USD to JPY</span>
                    <span className="font-medium">110.25</span>
                  </div>
                </div>
                <button 
                  onClick={() => toast.info('Exchange rates updated in real-time!')}
                  className="mt-4 w-full py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition-colors"
                >
                  Exchange Currency
                </button>
              </div>
              <div className="p-4 bg-white dark:bg-surface-800 rounded-lg shadow-card">
                <h4 className="font-medium mb-3">Wire Transfers</h4>
                <p className="text-sm text-surface-500 mb-4">Send money worldwide securely</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Transfer Fee:</span>
                    <span className="text-sm font-medium">$15 - $45</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Processing Time:</span>
                    <span className="text-sm font-medium">1-3 days</span>
                  </div>
                </div>
                <button 
                  onClick={() => toast.info('Wire transfer service coming soon!')}
                  className="mt-4 w-full py-2 bg-secondary text-white rounded-lg text-sm hover:bg-secondary-dark transition-colors"
                >
                  Send Wire
                </button>
              </div>
            </div>
          </div>
        );
      case 'help':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Help & Support</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium">Frequently Asked Questions</h4>
                {[
                  'How to reset my password?',
                  'What are the transaction limits?',
                  'How to report a lost card?',
                  'International transaction fees'
                ].map((faq, index) => (
                  <button 
                    key={index}
                    onClick={() => toast.info(`FAQ: ${faq} - More details coming soon!`)}
                    className="w-full p-3 text-left bg-white dark:bg-surface-800 rounded-lg shadow-card hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors"
                  >
                    <p className="text-sm">{faq}</p>
                  </button>
                ))}
              </div>
              <div className="space-y-3">
                <h4 className="font-medium">Contact Support</h4>
                <div className="p-4 bg-white dark:bg-surface-800 rounded-lg shadow-card">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      </div>
                      <div>
                        <p className="font-medium">Live Chat</p>
                        <p className="text-sm text-surface-500">Available 24/7</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => toast.info('Live chat feature coming soon!')}
                      className="w-full py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition-colors"
                    >
                      Start Chat
                    </button>
                  </div>
                </div>
                <div className="p-4 bg-white dark:bg-surface-800 rounded-lg shadow-card">
                  <p className="font-medium mb-1">Phone Support</p>
                  <p className="text-sm text-surface-500 mb-2">1-800-SECURE-1</p>
                  <p className="text-xs text-surface-400">Mon-Fri 8AM-8PM EST</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'investments':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Investment Dashboard</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <div className="p-4 bg-white dark:bg-surface-800 rounded-lg shadow-card">
                  <h4 className="font-medium mb-4">Portfolio Performance</h4>
                  <div className="h-48 bg-surface-100 dark:bg-surface-700 rounded-lg flex items-center justify-center">
                    <p className="text-surface-500">Interactive chart will be available here</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-surface-800 rounded-lg shadow-card">
                  <h4 className="font-medium mb-2">Total Portfolio</h4>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">$47,830</p>
                  <p className="text-sm text-green-600 dark:text-green-400">+12.5% this year</p>
                </div>
                <div className="p-4 bg-white dark:bg-surface-800 rounded-lg shadow-card">
                  <h4 className="font-medium mb-3">Quick Actions</h4>
                  <div className="space-y-2">
                    <button 
                      onClick={() => toast.info('Buy stocks feature coming soon!')}
                      className="w-full py-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg text-sm hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                    >
                      Buy Stocks
                    </button>
                    <button 
                      onClick={() => toast.info('Sell stocks feature coming soon!')}
                      className="w-full py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                    >
                      Sell Stocks
                    </button>
                    <button 
                      onClick={() => toast.info('Portfolio analysis coming soon!')}
                      className="w-full py-2 bg-surface-100 dark:bg-surface-700 rounded-lg text-sm hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                    >
                      View Analysis
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'other':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Other Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Loan Services', desc: 'Personal & business loans', icon: 'banknote' },
                { title: 'Insurance', desc: 'Life & property insurance', icon: 'shield' },
                { title: 'Tax Services', desc: 'Tax preparation & filing', icon: 'file-text' },
                { title: 'Financial Planning', desc: 'Retirement & wealth planning', icon: 'calendar' },
                { title: 'Business Banking', desc: 'Corporate banking solutions', icon: 'briefcase' },
                { title: 'Student Services', desc: 'Student loans & accounts', icon: 'graduation-cap' }
              ].map((service, index) => {
                const ServiceIcon = getIcon(service.icon);
                return (
                  <div key={index} className="p-4 bg-white dark:bg-surface-800 rounded-lg shadow-card hover:shadow-lg transition-all duration-200">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <ServiceIcon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{service.title}</h4>
                        <p className="text-sm text-surface-500 mb-3">{service.desc}</p>
                        <button 
                          onClick={() => toast.info(`${service.title} feature coming soon!`)}
                          className="text-sm text-primary hover:text-primary-dark transition-colors"
                        >
                          Learn More →
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      default:
        return <div>Tab content not found</div>;
    }
  };
  
  return (
    <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card overflow-hidden">
      {/* Tab Navigation */}
      <div className="border-b border-surface-200 dark:border-surface-700">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const TabIcon = getIcon(tab.icon);
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-2 ${
                  activeTab === tab.id
                    ? 'border-primary text-primary bg-primary/5'
                    : 'border-transparent text-surface-600 dark:text-surface-400 hover:text-surface-800 dark:hover:text-surface-200 hover:bg-surface-50 dark:hover:bg-surface-700'
                }`}
              >
                <TabIcon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="p-6">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
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
      
      {/* Banking Services Tab View */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Banking Services</h2>
        <BankingTabView />
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

};

export default Home;