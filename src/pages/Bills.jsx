import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';

const Bills = () => {
  const navigate = useNavigate();
  const [selectedBill, setSelectedBill] = useState(null);
  const [paymentData, setPaymentData] = useState({
    accountId: '',
    amount: '',
    paymentDate: ''
  });

  const ArrowLeftIcon = getIcon('arrow-left');
  const CreditCardIcon = getIcon('credit-card');
  const ZapIcon = getIcon('zap');
  const WifiIcon = getIcon('wifi');
  const CarIcon = getIcon('car');
  const HomeIcon = getIcon('home');
  const PhoneIcon = getIcon('phone');

  const bills = [
    { 
      id: '1', 
      name: 'Electric Company', 
      icon: 'zap', 
      amount: 120.50, 
      dueDate: '2023-02-15', 
      status: 'due',
      accountNumber: '****5678'
    },
    { 
      id: '2', 
      name: 'Internet Provider', 
      icon: 'wifi', 
      amount: 79.99, 
      dueDate: '2023-02-18', 
      status: 'upcoming',
      accountNumber: '****9012'
    },
    { 
      id: '3', 
      name: 'Car Insurance', 
      icon: 'car', 
      amount: 145.00, 
      dueDate: '2023-02-20', 
      status: 'upcoming',
      accountNumber: '****3456'
    },
    { 
      id: '4', 
      name: 'Mortgage Payment', 
      icon: 'home', 
      amount: 1850.00, 
      dueDate: '2023-02-01', 
      status: 'paid',
      accountNumber: '****7890'
    },
    { 
      id: '5', 
      name: 'Phone Bill', 
      icon: 'phone', 
      amount: 65.99, 
      dueDate: '2023-02-25', 
      status: 'upcoming',
      accountNumber: '****2345'
    }
  ];

  const accounts = [
    { id: '1', name: 'Premium Checking', number: '**** 4589', balance: 12467.89 },
    { id: '2', name: 'Savings Account', number: '**** 7823', balance: 25890.45 }
  ];

  const handlePayBill = (bill) => {
    setSelectedBill(bill);
    setPaymentData({
      accountId: '',
      amount: bill.amount.toString(),
      paymentDate: new Date().toISOString().split('T')[0]
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    
    if (!paymentData.accountId || !paymentData.amount) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.success(`Payment of $${paymentData.amount} to ${selectedBill.name} scheduled successfully!`);
    setSelectedBill(null);
    setPaymentData({ accountId: '', amount: '', paymentDate: '' });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'due': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
      case 'upcoming': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
      case 'paid': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      default: return 'text-surface-600 dark:text-surface-400 bg-surface-100 dark:bg-surface-800';
    }
  };

  const getBillIcon = (iconName) => {
    const icons = {
      'zap': ZapIcon,
      'wifi': WifiIcon,
      'car': CarIcon,
      'home': HomeIcon,
      'phone': PhoneIcon
    };
    return icons[iconName] || CreditCardIcon;
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Pay Bills</h1>
            <p className="text-surface-500">Manage and pay your bills</p>
          </div>
        </div>

        {/* Bills Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="card text-center">
            <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">Due Now</h3>
            <p className="text-2xl font-bold">{bills.filter(b => b.status === 'due').length}</p>
          </div>
          <div className="card text-center">
            <h3 className="text-lg font-semibold text-yellow-600 dark:text-yellow-400">Upcoming</h3>
            <p className="text-2xl font-bold">{bills.filter(b => b.status === 'upcoming').length}</p>
          </div>
          <div className="card text-center">
            <h3 className="text-lg font-semibold text-green-600 dark:text-green-400">Paid This Month</h3>
            <p className="text-2xl font-bold">{bills.filter(b => b.status === 'paid').length}</p>
          </div>
        </div>

        {/* Bills List */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Your Bills</h2>
          <div className="space-y-4">
            {bills.map((bill) => {
              const BillIcon = getBillIcon(bill.icon);
              return (
                <motion.div
                  key={bill.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-700 transition-all duration-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <BillIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium">{bill.name}</h3>
                      <p className="text-sm text-surface-500">Account: {bill.accountNumber}</p>
                      <p className="text-sm text-surface-500">Due: {new Date(bill.dueDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-bold">${bill.amount.toLocaleString()}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bill.status)}`}>
                        {bill.status}
                      </span>
                    </div>
                    
                    {bill.status !== 'paid' && (
                      <button
                        onClick={() => handlePayBill(bill)}
                        className="btn btn-primary"
                      >
                        Pay Now
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Payment Modal */}
        {selectedBill && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <motion.div
              className="bg-white dark:bg-surface-800 rounded-xl p-6 w-full max-w-md"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-lg font-semibold mb-4">Pay {selectedBill.name}</h3>
              
              <form onSubmit={handleSubmitPayment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Pay From Account *</label>
                  <select
                    name="accountId"
                    value={paymentData.accountId}
                    onChange={handleInputChange}
                    className="w-full"
                    required
                  >
                    <option value="">Select account</option>
                    {accounts.map((account) => (
                      <option key={account.id} value={account.id}>
                        {account.name} ({account.number}) - ${account.balance.toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Amount *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-500">$</span>
                    <input
                      type="number"
                      name="amount"
                      value={paymentData.amount}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0.01"
                      className="w-full pl-8"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Payment Date *</label>
                  <input
                    type="date"
                    name="paymentDate"
                    value={paymentData.paymentDate}
                    onChange={handleInputChange}
                    className="w-full"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedBill(null)}
                    className="flex-1 btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 btn btn-primary"
                  >
                    Schedule Payment
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bills;