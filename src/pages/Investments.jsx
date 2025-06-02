import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';

const Investments = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('portfolio');

  const ArrowLeftIcon = getIcon('arrow-left');
  const TrendingUpIcon = getIcon('trending-up');
  const TrendingDownIcon = getIcon('trending-down');
  const DollarSignIcon = getIcon('dollar-sign');
  const PieChartIcon = getIcon('pie-chart');
  const BarChartIcon = getIcon('bar-chart');

  const portfolioData = {
    totalValue: 47830.25,
    totalGain: 5234.18,
    totalGainPercent: 12.3,
    dayChange: 234.56,
    dayChangePercent: 0.49
  };

  const holdings = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      shares: 50,
      avgPrice: 145.30,
      currentPrice: 152.40,
      value: 7620,
      gain: 355,
      gainPercent: 4.88
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      shares: 25,
      avgPrice: 305.20,
      currentPrice: 318.75,
      value: 7968.75,
      gain: 338.75,
      gainPercent: 4.44
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      shares: 15,
      avgPrice: 2650.00,
      currentPrice: 2720.30,
      value: 40804.5,
      gain: 1054.5,
      gainPercent: 2.65
    },
    {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      shares: 10,
      avgPrice: 850.00,
      currentPrice: 798.50,
      value: 7985,
      gain: -515,
      gainPercent: -6.06
    }
  ];

  const watchlist = [
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 3245.20, change: 45.30, changePercent: 1.42 },
    { symbol: 'NFLX', name: 'Netflix Inc.', price: 485.75, change: -12.45, changePercent: -2.50 },
    { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 785.40, change: 23.80, changePercent: 3.12 },
    { symbol: 'AMD', name: 'Advanced Micro Devices', price: 142.30, change: -3.20, changePercent: -2.20 }
  ];

  const handleBuyStock = (symbol) => {
    toast.info(`Buy order for ${symbol} will be available soon!`);
  };

  const handleSellStock = (symbol) => {
    toast.info(`Sell order for ${symbol} will be available soon!`);
  };

  const renderPortfolio = () => (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <h3 className="text-sm font-medium text-surface-500 mb-1">Total Value</h3>
          <p className="text-2xl font-bold">${portfolioData.totalValue.toLocaleString()}</p>
        </div>
        <div className="card text-center">
          <h3 className="text-sm font-medium text-surface-500 mb-1">Total Gain/Loss</h3>
          <p className={`text-2xl font-bold ${portfolioData.totalGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${portfolioData.totalGain.toLocaleString()} ({portfolioData.totalGainPercent.toFixed(1)}%)
          </p>
        </div>
        <div className="card text-center">
          <h3 className="text-sm font-medium text-surface-500 mb-1">Today's Change</h3>
          <p className={`text-2xl font-bold ${portfolioData.dayChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${portfolioData.dayChange.toLocaleString()} ({portfolioData.dayChangePercent.toFixed(2)}%)
          </p>
        </div>
        <div className="card text-center">
          <h3 className="text-sm font-medium text-surface-500 mb-1">Holdings</h3>
          <p className="text-2xl font-bold">{holdings.length}</p>
        </div>
      </div>

      {/* Holdings */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Your Holdings</h3>
        <div className="space-y-3">
          {holdings.map((holding, index) => (
            <motion.div
              key={holding.symbol}
              className="flex items-center justify-between p-4 rounded-lg border border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex-1">
                <h4 className="font-medium">{holding.symbol}</h4>
                <p className="text-sm text-surface-500">{holding.name}</p>
                <p className="text-sm text-surface-500">{holding.shares} shares @ ${holding.avgPrice}</p>
              </div>
              
              <div className="text-center">
                <p className="font-medium">${holding.currentPrice}</p>
                <p className={`text-sm ${holding.gain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {holding.gain >= 0 ? '+' : ''}${holding.gain.toFixed(2)} ({holding.gainPercent.toFixed(2)}%)
                </p>
              </div>
              
              <div className="text-right">
                <p className="font-bold">${holding.value.toLocaleString()}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleBuyStock(holding.symbol)}
                    className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded text-sm hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => handleSellStock(holding.symbol)}
                    className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded text-sm hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                  >
                    Sell
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderWatchlist = () => (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Watchlist</h3>
      <div className="space-y-3">
        {watchlist.map((stock, index) => (
          <motion.div
            key={stock.symbol}
            className="flex items-center justify-between p-4 rounded-lg border border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div>
              <h4 className="font-medium">{stock.symbol}</h4>
              <p className="text-sm text-surface-500">{stock.name}</p>
            </div>
            
            <div className="text-right">
              <p className="font-bold">${stock.price}</p>
              <p className={`text-sm flex items-center gap-1 ${
                stock.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {stock.change >= 0 ? <TrendingUpIcon className="h-3 w-3" /> : <TrendingDownIcon className="h-3 w-3" />}
                {stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
              </p>
            </div>
            
            <button
              onClick={() => handleBuyStock(stock.symbol)}
              className="btn btn-primary"
            >
              Buy
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderAnalysis = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Asset Allocation */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <PieChartIcon className="h-5 w-5" />
            Asset Allocation
          </h3>
          <div className="space-y-3">
            {[
              { category: 'Technology', percentage: 65, color: 'bg-blue-500' },
              { category: 'Healthcare', percentage: 15, color: 'bg-green-500' },
              { category: 'Finance', percentage: 12, color: 'bg-yellow-500' },
              { category: 'Consumer', percentage: 8, color: 'bg-purple-500' }
            ].map((category, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded ${category.color}`}></div>
                <div className="flex-1 flex justify-between">
                  <span className="text-sm">{category.category}</span>
                  <span className="text-sm font-medium">{category.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChartIcon className="h-5 w-5" />
            Performance Metrics
          </h3>
          <div className="space-y-4">
            {[
              { metric: '1 Month Return', value: '+3.2%', positive: true },
              { metric: '3 Month Return', value: '+8.7%', positive: true },
              { metric: '6 Month Return', value: '+12.3%', positive: true },
              { metric: '1 Year Return', value: '+18.9%', positive: true },
              { metric: 'Beta', value: '1.15', neutral: true },
              { metric: 'Sharpe Ratio', value: '1.45', neutral: true }
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-surface-500">{item.metric}</span>
                <span className={`font-medium ${
                  item.positive ? 'text-green-600 dark:text-green-400' : 
                  item.neutral ? 'text-surface-800 dark:text-surface-200' : 
                  'text-red-600 dark:text-red-400'
                }`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Investment Recommendations</h3>
        <div className="space-y-3">
          {[
            { 
              title: 'Diversify into Bonds', 
              description: 'Consider adding bonds to reduce portfolio volatility',
              action: 'Learn More'
            },
            { 
              title: 'Rebalance Technology Holdings', 
              description: 'Technology makes up 65% of your portfolio - consider reducing exposure',
              action: 'View Options'
            },
            { 
              title: 'Dollar-Cost Averaging', 
              description: 'Set up automatic investments to reduce timing risk',
              action: 'Set Up'
            }
          ].map((rec, index) => (
            <div key={index} className="p-4 border border-surface-200 dark:border-surface-700 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium mb-1">{rec.title}</h4>
                  <p className="text-sm text-surface-500">{rec.description}</p>
                </div>
                <button
                  onClick={() => toast.info(`${rec.title} feature coming soon!`)}
                  className="ml-4 text-primary hover:text-primary-dark text-sm font-medium"
                >
                  {rec.action} →
                </button>
              </div>
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
            <h1 className="text-2xl font-bold">Investment Dashboard</h1>
            <p className="text-surface-500">Manage your investment portfolio</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card overflow-hidden mb-6">
          <div className="border-b border-surface-200 dark:border-surface-700">
            <div className="flex">
              {[
                { id: 'portfolio', label: 'Portfolio', icon: 'pie-chart' },
                { id: 'watchlist', label: 'Watchlist', icon: 'eye' },
                { id: 'analysis', label: 'Analysis', icon: 'bar-chart' }
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
              {activeTab === 'portfolio' && renderPortfolio()}
              {activeTab === 'watchlist' && renderWatchlist()}
              {activeTab === 'analysis' && renderAnalysis()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Investments;