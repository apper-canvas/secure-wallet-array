import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';

const Transfer = () => {
  const navigate = useNavigate();
  const [transferData, setTransferData] = useState({
    fromAccount: '',
    toAccount: '',
    amount: '',
    description: '',
    transferType: 'internal'
  });

  const ArrowLeftIcon = getIcon('arrow-left');
  const SendIcon = getIcon('send');
  const UserIcon = getIcon('user');
  const BuildingIcon = getIcon('building');

  const accounts = [
    { id: '1', name: 'Premium Checking', number: '**** 4589', balance: 12467.89 },
    { id: '2', name: 'Savings Account', number: '**** 7823', balance: 25890.45 },
    { id: '3', name: 'Business Account', number: '**** 9012', balance: 45120.33 }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransferData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!transferData.fromAccount || !transferData.toAccount || !transferData.amount) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (transferData.fromAccount === transferData.toAccount) {
      toast.error('Source and destination accounts cannot be the same');
      return;
    }

    if (parseFloat(transferData.amount) <= 0) {
      toast.error('Transfer amount must be greater than zero');
      return;
    }

    // Simulate transfer processing
    toast.success(`Transfer of $${transferData.amount} initiated successfully!`);
    
    // Reset form
    setTransferData({
      fromAccount: '',
      toAccount: '',
      amount: '',
      description: '',
      transferType: 'internal'
    });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Transfer Money</h1>
            <p className="text-surface-500">Send money between accounts or to others</p>
          </div>
        </div>

        {/* Transfer Type Selection */}
        <div className="card mb-6">
          <h2 className="text-lg font-semibold mb-4">Transfer Type</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => setTransferData(prev => ({ ...prev, transferType: 'internal' }))}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                transferData.transferType === 'internal'
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-surface-200 dark:border-surface-700 hover:border-surface-300 dark:hover:border-surface-600'
              }`}
            >
              <UserIcon className="h-8 w-8 mx-auto mb-2" />
              <div className="font-medium">Between My Accounts</div>
              <div className="text-sm text-surface-500">Internal transfer</div>
            </button>
            <button
              onClick={() => setTransferData(prev => ({ ...prev, transferType: 'external' }))}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                transferData.transferType === 'external'
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-surface-200 dark:border-surface-700 hover:border-surface-300 dark:hover:border-surface-600'
              }`}
            >
              <BuildingIcon className="h-8 w-8 mx-auto mb-2" />
              <div className="font-medium">To Another Bank</div>
              <div className="text-sm text-surface-500">External transfer</div>
            </button>
          </div>
        </div>

        {/* Transfer Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-lg font-semibold mb-6">Transfer Details</h2>
          
          <div className="space-y-6">
            {/* From Account */}
            <div>
              <label className="block text-sm font-medium mb-2">From Account *</label>
              <select
                name="fromAccount"
                value={transferData.fromAccount}
                onChange={handleInputChange}
                className="w-full"
                required
              >
                <option value="">Select source account</option>
                {accounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.name} ({account.number}) - ${account.balance.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            {/* To Account */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {transferData.transferType === 'internal' ? 'To Account *' : 'Recipient Account *'}
              </label>
              {transferData.transferType === 'internal' ? (
                <select
                  name="toAccount"
                  value={transferData.toAccount}
                  onChange={handleInputChange}
                  className="w-full"
                  required
                >
                  <option value="">Select destination account</option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name} ({account.number})
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  name="toAccount"
                  value={transferData.toAccount}
                  onChange={handleInputChange}
                  placeholder="Enter recipient account number"
                  className="w-full"
                  required
                />
              )}
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium mb-2">Amount *</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-500">$</span>
                <input
                  type="number"
                  name="amount"
                  value={transferData.amount}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0.01"
                  className="w-full pl-8"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">Description (Optional)</label>
              <input
                type="text"
                name="description"
                value={transferData.description}
                onChange={handleInputChange}
                placeholder="Enter transfer description"
                className="w-full"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full btn btn-primary flex items-center justify-center gap-2"
            >
              <SendIcon className="h-5 w-5" />
              Transfer Money
            </button>
          </div>
        </motion.form>

        {/* Recent Transfers */}
        <div className="card mt-6">
          <h2 className="text-lg font-semibold mb-4">Recent Transfers</h2>
          <div className="space-y-3">
            {[
              { to: 'Savings Account', amount: 500, date: 'Jan 24, 2023', status: 'completed' },
              { to: 'John Doe', amount: 250, date: 'Jan 22, 2023', status: 'completed' },
              { to: 'Business Account', amount: 1000, date: 'Jan 20, 2023', status: 'pending' }
            ].map((transfer, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors">
                <div>
                  <p className="font-medium">{transfer.to}</p>
                  <p className="text-sm text-surface-500">{transfer.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${transfer.amount.toLocaleString()}</p>
                  <p className={`text-sm ${
                    transfer.status === 'completed' 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-yellow-600 dark:text-yellow-400'
                  }`}>
                    {transfer.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transfer;