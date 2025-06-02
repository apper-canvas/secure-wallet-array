import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';

const Savings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('accounts');
  const [goalData, setGoalData] = useState({
    name: '',
    targetAmount: '',
    targetDate: '',
    monthlyContribution: ''
  });

  const ArrowLeftIcon = getIcon('arrow-left');
  const PiggyBankIcon = getIcon('piggy-bank');
  const TargetIcon = getIcon('target');
  const TrendingUpIcon = getIcon('trending-up');
  const PlusIcon = getIcon('plus');

  const savingsAccounts = [
    {
      id: '1',
      name: 'High-Yield Savings',
      balance: 25890.45,
      interestRate: 4.5,
      accountNumber: '**** 7823',
      type: 'savings'
    },
    {
      id: '2',
      name: 'Emergency Fund',
      balance: 15000.00,
      interestRate: 3.8,
      accountNumber: '**** 9876',
      type: 'savings'
    },
    {
      id: '3',
      name: 'Vacation Fund CD',
      balance: 8500.00,
      interestRate: 5.2,
      accountNumber: '**** 5432',
      type: 'cd',
      maturityDate: '2024-06-15'
    }
  ];

  const savingsGoals = [
    {
      id: '1',
      name: 'Emergency Fund',
      targetAmount: 20000,
      currentAmount: 15000,
      targetDate: '2024-12-31',
      monthlyContribution: 500,
      category: 'emergency'
    },
    {
      id: '2',
      name: 'Dream Vacation',
      targetAmount: 8000,
      currentAmount: 5200,
      targetDate: '2024-07-01',
      monthlyContribution: 400,
      category: 'vacation'
    },
    {
      id: '3',
      name: 'Home Down Payment',
      targetAmount: 50000,
      currentAmount: 32000,
      targetDate: '2025-06-01',
      monthlyContribution: 1200,
      category: 'home'
    },
    {
      id: '4',
      name: 'New Car',
      targetAmount: 25000,
      currentAmount: 12500,
      targetDate: '2024-10-01',
      monthlyContribution: 800,
      category: 'vehicle'
    }
  ];

  const handleGoalSubmit = (e) => {
    e.preventDefault();
    
    if (!goalData.name || !goalData.targetAmount || !goalData.targetDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.success(`Savings goal "${goalData.name}" created successfully!`);
    setGoalData({
      name: '',
      targetAmount: '',
      targetDate: '',
      monthlyContribution: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGoalData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateProgress = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const calculateMonthsToGoal = (current, target, monthly) => {
    if (monthly <= 0) return 0;
    return Math.ceil((target - current) / monthly);
  };

  const getGoalIcon = (category) => {
    const icons = {
      'emergency': 'shield',
      'vacation': 'plane',
      'home': 'home',
      'vehicle': 'car',
      'education': 'graduation-cap',
      'retirement': 'clock'
    };
    return icons[category] || 'target';
  };

  const renderAccounts = () => (
    <div className="space-y-6">
      {/* Accounts Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card text-center">
          <h3 className="text-sm font-medium text-surface-500 mb-1">Total Savings</h3>
          <p className="text-2xl font-bold">${savingsAccounts.reduce((sum, acc) => sum + acc.balance, 0).toLocaleString()}</p>
        </div>
        <div className="card text-center">
          <h3 className="text-sm font-medium text-surface-500 mb-1">Average Interest</h3>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {(savingsAccounts.reduce((sum, acc) => sum + acc.interestRate, 0) / savingsAccounts.length).toFixed(1)}%
          </p>
        </div>
        <div className="card text-center">
          <h3 className="text-sm font-medium text-surface-500 mb-1">Accounts</h3>
          <p className="text-2xl font-bold">{savingsAccounts.length}</p>
        </div>
      </div>

      {/* Savings Accounts */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Your Savings Accounts</h3>
          <button
            onClick={() => toast.info('Account opening process coming soon!')}
            className="btn btn-primary flex items-center gap-2"
          >
            <PlusIcon className="h-4 w-4" />
            Open New Account
          </button>
        </div>
        
        <div className="space-y-4">
          {savingsAccounts.map((account, index) => (
            <motion.div
              key={account.id}
              className="p-4 border border-surface-200 dark:border-surface-700 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium">{account.name}</h4>
                  <p className="text-sm text-surface-500">{account.accountNumber}</p>
                  <p className="text-sm text-surface-500">
                    {account.type === 'cd' ? 'Certificate of Deposit' : 'Savings Account'}
                    {account.maturityDate && ` • Matures: ${new Date(account.maturityDate).toLocaleDateString()}`}
                  </p>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-surface-500">Interest Rate</p>
                  <p className="font-bold text-green-600 dark:text-green-400">{account.interestRate}% APY</p>
                </div>
                
                <div className="text-right">
                  <p className="text-sm text-surface-500">Balance</p>
                  <p className="text-2xl font-bold">${account.balance.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => toast.info('Deposit feature coming soon!')}
                  className="btn btn-primary"
                >
                  Deposit
                </button>
                <button
                  onClick={() => toast.info('Withdrawal feature coming soon!')}
                  className="btn btn-outline"
                >
                  Withdraw
                </button>
                <button
                  onClick={() => toast.info('Account details coming soon!')}
                  className="btn btn-outline"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGoals = () => (
    <div className="space-y-6">
      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {savingsGoals.map((goal, index) => {
          const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
          const monthsLeft = calculateMonthsToGoal(goal.currentAmount, goal.targetAmount, goal.monthlyContribution);
          const GoalIcon = getIcon(getGoalIcon(goal.category));
          
          return (
            <motion.div
              key={goal.id}
              className="card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <GoalIcon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{goal.name}</h4>
                  <p className="text-sm text-surface-500">Target: {new Date(goal.targetDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>${goal.currentAmount.toLocaleString()}</span>
                  <span>${goal.targetAmount.toLocaleString()}</span>
                </div>
                <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-3">
                  <div
                    className="bg-primary rounded-full h-3 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-surface-500 mt-2">{progress.toFixed(1)}% complete</p>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <div>
                  <p className="text-surface-500">Monthly contribution</p>
                  <p className="font-medium">${goal.monthlyContribution.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-surface-500">Months to goal</p>
                  <p className="font-medium">{monthsLeft}</p>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => toast.info('Goal contribution coming soon!')}
                  className="flex-1 btn btn-primary"
                >
                  Contribute
                </button>
                <button
                  onClick={() => toast.info('Goal editing coming soon!')}
                  className="flex-1 btn btn-outline"
                >
                  Edit Goal
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Add New Goal */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Create New Savings Goal</h3>
        
        <form onSubmit={handleGoalSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Goal Name *</label>
              <input
                type="text"
                name="name"
                value={goalData.name}
                onChange={handleInputChange}
                placeholder="e.g., Emergency Fund"
                className="w-full"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Target Amount *</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-500">$</span>
                <input
                  type="number"
                  name="targetAmount"
                  value={goalData.targetAmount}
                  onChange={handleInputChange}
                  placeholder="10000"
                  step="100"
                  min="100"
                  className="w-full pl-8"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Target Date *</label>
              <input
                type="date"
                name="targetDate"
                value={goalData.targetDate}
                onChange={handleInputChange}
                className="w-full"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Monthly Contribution</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-500">$</span>
                <input
                  type="number"
                  name="monthlyContribution"
                  value={goalData.monthlyContribution}
                  onChange={handleInputChange}
                  placeholder="500"
                  step="50"
                  min="0"
                  className="w-full pl-8"
                />
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            className="btn btn-primary flex items-center gap-2"
          >
            <TargetIcon className="h-4 w-4" />
            Create Goal
          </button>
        </form>
      </div>
    </div>
  );

  const renderCalculators = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Compound Interest Calculator */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Compound Interest Calculator</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Initial Amount</label>
              <input type="number" placeholder="1000" className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Monthly Contribution</label>
              <input type="number" placeholder="100" className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Interest Rate (%)</label>
              <input type="number" placeholder="4.5" step="0.1" className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Time Period (years)</label>
              <input type="number" placeholder="10" className="w-full" />
            </div>
            <button
              onClick={() => toast.info('Calculator results coming soon!')}
              className="w-full btn btn-primary"
            >
              Calculate
            </button>
          </div>
        </div>

        {/* Savings Goal Calculator */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Savings Goal Calculator</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Goal Amount</label>
              <input type="number" placeholder="10000" className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Current Savings</label>
              <input type="number" placeholder="2000" className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Target Date</label>
              <input type="date" className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Interest Rate (%)</label>
              <input type="number" placeholder="3.5" step="0.1" className="w-full" />
            </div>
            <button
              onClick={() => toast.info('Calculator results coming soon!')}
              className="w-full btn btn-primary"
            >
              Calculate Monthly Needed
            </button>
          </div>
        </div>
      </div>

      {/* Savings Tips */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Savings Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: 'Automate Your Savings',
              tip: 'Set up automatic transfers to your savings account on payday'
            },
            {
              title: 'Follow the 50/30/20 Rule',
              tip: '50% for needs, 30% for wants, 20% for savings and debt repayment'
            },
            {
              title: 'Start an Emergency Fund',
              tip: 'Aim for 3-6 months of living expenses in a separate account'
            },
            {
              title: 'Take Advantage of High-Yield Accounts',
              tip: 'Maximize your earnings with accounts offering competitive interest rates'
            }
          ].map((tip, index) => (
            <div key={index} className="p-4 bg-surface-50 dark:bg-surface-700 rounded-lg">
              <h4 className="font-medium mb-2">{tip.title}</h4>
              <p className="text-sm text-surface-600 dark:text-surface-400">{tip.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Savings Dashboard</h1>
            <p className="text-surface-500">Manage your savings accounts and goals</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card overflow-hidden">
          <div className="border-b border-surface-200 dark:border-surface-700">
            <div className="flex">
              {[
                { id: 'accounts', label: 'Accounts', icon: 'piggy-bank' },
                { id: 'goals', label: 'Goals', icon: 'target' },
                { id: 'calculators', label: 'Calculators', icon: 'calculator' }
              ].map((tab) => {
                const TabIcon = getIcon(tab.icon);
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-200 border-b-2 ${
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
          
          <div className="p-6">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'accounts' && renderAccounts()}
              {activeTab === 'goals' && renderGoals()}
              {activeTab === 'calculators' && renderCalculators()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Savings;