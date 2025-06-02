import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';

const Statements = () => {
  const navigate = useNavigate();
  const [selectedAccount, setSelectedAccount] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('3months');
  const [searchTerm, setSearchTerm] = useState('');

  const ArrowLeftIcon = getIcon('arrow-left');
  const FileTextIcon = getIcon('file-text');
  const DownloadIcon = getIcon('download');
  const SearchIcon = getIcon('search');
  const FilterIcon = getIcon('filter');
  const EyeIcon = getIcon('eye');

  const accounts = [
    { id: 'all', name: 'All Accounts' },
    { id: '1', name: 'Premium Checking (**** 4589)' },
    { id: '2', name: 'Savings Account (**** 7823)' },
    { id: '3', name: 'Business Account (**** 9012)' },
    { id: '4', name: 'Credit Card (**** 5678)' }
  ];

  const periods = [
    { id: '1month', name: 'Last Month' },
    { id: '3months', name: 'Last 3 Months' },
    { id: '6months', name: 'Last 6 Months' },
    { id: '1year', name: 'Last Year' },
    { id: 'custom', name: 'Custom Range' }
  ];

  const statements = [
    {
      id: '1',
      accountName: 'Premium Checking',
      accountNumber: '**** 4589',
      statementDate: '2023-12-31',
      period: 'December 2023',
      type: 'monthly',
      size: '245 KB',
      transactions: 28,
      startingBalance: 11250.30,
      endingBalance: 12467.89
    },
    {
      id: '2',
      accountName: 'Savings Account',
      accountNumber: '**** 7823',
      statementDate: '2023-12-31',
      period: 'December 2023',
      type: 'monthly',
      size: '189 KB',
      transactions: 12,
      startingBalance: 24890.45,
      endingBalance: 25890.45
    },
    {
      id: '3',
      accountName: 'Premium Checking',
      accountNumber: '**** 4589',
      statementDate: '2023-11-30',
      period: 'November 2023',
      type: 'monthly',
      size: '298 KB',
      transactions: 34,
      startingBalance: 10890.15,
      endingBalance: 11250.30
    },
    {
      id: '4',
      accountName: 'Credit Card',
      accountNumber: '**** 5678',
      statementDate: '2023-12-15',
      period: 'December 2023',
      type: 'credit',
      size: '156 KB',
      transactions: 45,
      startingBalance: -1250.00,
      endingBalance: -892.45
    },
    {
      id: '5',
      accountName: 'Business Account',
      accountNumber: '**** 9012',
      statementDate: '2023-12-31',
      period: 'Q4 2023',
      type: 'quarterly',
      size: '567 KB',
      transactions: 128,
      startingBalance: 42850.30,
      endingBalance: 45120.33
    }
  ];

  const taxDocuments = [
    {
      id: '1',
      name: '1099-INT Interest Income',
      year: '2023',
      date: '2024-01-31',
      size: '98 KB',
      type: 'tax'
    },
    {
      id: '2',
      name: '1099-DIV Dividend Income',
      year: '2023',
      date: '2024-01-31',
      size: '112 KB',
      type: 'tax'
    },
    {
      id: '3',
      name: 'Annual Summary Statement',
      year: '2023',
      date: '2024-01-15',
      size: '445 KB',
      type: 'summary'
    }
  ];

  const handleDownload = (statementId, type = 'statement') => {
    toast.success(`${type === 'statement' ? 'Statement' : 'Document'} download started successfully!`);
  };

  const handleView = (statementId, type = 'statement') => {
    toast.info(`${type === 'statement' ? 'Statement' : 'Document'} viewer will be available soon!`);
  };

  const handleEmail = (statementId) => {
    toast.success('Statement has been emailed to your registered email address!');
  };

  const filteredStatements = statements.filter(statement => {
    const matchesAccount = selectedAccount === 'all' || statement.accountNumber.includes(selectedAccount);
    const matchesSearch = statement.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         statement.period.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesAccount && matchesSearch;
  });

  const getStatementIcon = (type) => {
    switch(type) {
      case 'credit': return 'credit-card';
      case 'quarterly': return 'calendar';
      case 'tax': return 'file-text';
      case 'summary': return 'bar-chart';
      default: return 'file-text';
    }
  };

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
            <h1 className="text-2xl font-bold">Statements & Documents</h1>
            <p className="text-surface-500">View and download your account statements</p>
          </div>
        </div>

        {/* Filters */}
        <div className="card mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Account Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Account</label>
              <select
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                className="w-full"
              >
                {accounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Period Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Time Period</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full"
              >
                {periods.map((period) => (
                  <option key={period.id} value={period.id}>
                    {period.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Search</label>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-surface-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search statements..."
                  className="w-full pl-10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => toast.info('Bulk download feature coming soon!')}
            className="card hover:shadow-lg transition-all duration-200 text-center"
          >
            <DownloadIcon className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-medium">Download All</h3>
            <p className="text-sm text-surface-500">Get all statements at once</p>
          </button>
          
          <button
            onClick={() => toast.info('Email delivery setup coming soon!')}
            className="card hover:shadow-lg transition-all duration-200 text-center"
          >
            <div className="h-8 w-8 mx-auto mb-2 text-primary flex items-center justify-center">
              📧
            </div>
            <h3 className="font-medium">Email Delivery</h3>
            <p className="text-sm text-surface-500">Setup automatic delivery</p>
          </button>
          
          <button
            onClick={() => toast.info('Tax document compilation coming soon!')}
            className="card hover:shadow-lg transition-all duration-200 text-center"
          >
            <FileTextIcon className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-medium">Tax Documents</h3>
            <p className="text-sm text-surface-500">Get tax-ready documents</p>
          </button>
        </div>

        {/* Statements List */}
        <div className="card mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Account Statements</h2>
            <span className="text-sm text-surface-500">{filteredStatements.length} statements found</span>
          </div>
          
          <div className="space-y-3">
            {filteredStatements.map((statement, index) => {
              const StatementIcon = getIcon(getStatementIcon(statement.type));
              return (
                <motion.div
                  key={statement.id}
                  className="flex items-center gap-4 p-4 border border-surface-200 dark:border-surface-700 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <StatementIcon className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-medium">{statement.accountName}</h4>
                    <p className="text-sm text-surface-500">{statement.accountNumber} • {statement.period}</p>
                    <p className="text-sm text-surface-500">
                      {statement.transactions} transactions • {statement.size}
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-surface-500">Starting Balance</p>
                    <p className="font-medium">${statement.startingBalance.toLocaleString()}</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-surface-500">Ending Balance</p>
                    <p className="font-medium">${Math.abs(statement.endingBalance).toLocaleString()}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleView(statement.id)}
                      className="btn btn-outline flex items-center gap-1"
                      title="View Statement"
                    >
                      <EyeIcon className="h-4 w-4" />
                      View
                    </button>
                    <button
                      onClick={() => handleDownload(statement.id)}
                      className="btn btn-primary flex items-center gap-1"
                      title="Download Statement"
                    >
                      <DownloadIcon className="h-4 w-4" />
                      Download
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Tax Documents */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Tax Documents & Annual Summaries</h2>
          
          <div className="space-y-3">
            {taxDocuments.map((doc, index) => {
              const DocIcon = getIcon(getStatementIcon(doc.type));
              return (
                <motion.div
                  key={doc.id}
                  className="flex items-center gap-4 p-4 border border-surface-200 dark:border-surface-700 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                    <DocIcon className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-medium">{doc.name}</h4>
                    <p className="text-sm text-surface-500">Tax Year {doc.year} • Available since {new Date(doc.date).toLocaleDateString()}</p>
                    <p className="text-sm text-surface-500">Size: {doc.size}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleView(doc.id, 'document')}
                      className="btn btn-outline flex items-center gap-1"
                    >
                      <EyeIcon className="h-4 w-4" />
                      View
                    </button>
                    <button
                      onClick={() => handleDownload(doc.id, 'document')}
                      className="btn btn-primary flex items-center gap-1"
                    >
                      <DownloadIcon className="h-4 w-4" />
                      Download
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Notice */}
        <div className="mt-6 p-4 bg-surface-50 dark:bg-surface-700 rounded-lg">
          <h3 className="font-medium mb-2">Important Notice</h3>
          <p className="text-sm text-surface-600 dark:text-surface-400">
            Statements are available for up to 7 years. For older statements or specific documents, 
            please contact customer service at 1-800-SECURE-1 or visit any branch location.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Statements;