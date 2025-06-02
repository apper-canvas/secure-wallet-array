import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';

const Exchange = () => {
  const navigate = useNavigate();
  const [exchangeData, setExchangeData] = useState({
    fromCurrency: 'USD',
    toCurrency: 'EUR',
    amount: '',
    accountId: ''
  });
  const [exchangeRate, setExchangeRate] = useState(0.85);
  const [convertedAmount, setConvertedAmount] = useState(0);

  const ArrowLeftIcon = getIcon('arrow-left');
  const ArrowUpDownIcon = getIcon('arrows-up-down');
  const TrendingUpIcon = getIcon('trending-up');

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' }
  ];

  const accounts = [
    { id: '1', name: 'Premium Checking', number: '**** 4589', balance: 12467.89, currency: 'USD' },
    { id: '2', name: 'Savings Account', number: '**** 7823', balance: 25890.45, currency: 'USD' },
    { id: '3', name: 'Euro Account', number: '**** 9012', balance: 8750.30, currency: 'EUR' }
  ];

  // Mock exchange rates
  const exchangeRates = {
    'USD-EUR': 0.85,
    'USD-GBP': 0.73,
    'USD-JPY': 110.25,
    'USD-CAD': 1.25,
    'USD-AUD': 1.35,
    'USD-CHF': 0.92,
    'USD-CNY': 6.45,
    'EUR-USD': 1.18,
    'EUR-GBP': 0.86,
    'GBP-USD': 1.37,
    'GBP-EUR': 1.16
  };

  useEffect(() => {
    const rateKey = `${exchangeData.fromCurrency}-${exchangeData.toCurrency}`;
    const reverseRateKey = `${exchangeData.toCurrency}-${exchangeData.fromCurrency}`;
    
    let rate = exchangeRates[rateKey] || (1 / (exchangeRates[reverseRateKey] || 1));
    
    // Add some random variation to simulate live rates
    rate += (Math.random() - 0.5) * 0.02;
    setExchangeRate(rate);
  }, [exchangeData.fromCurrency, exchangeData.toCurrency]);

  useEffect(() => {
    if (exchangeData.amount) {
      setConvertedAmount(parseFloat(exchangeData.amount) * exchangeRate);
    } else {
      setConvertedAmount(0);
    }
  }, [exchangeData.amount, exchangeRate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExchangeData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwapCurrencies = () => {
    setExchangeData(prev => ({
      ...prev,
      fromCurrency: prev.toCurrency,
      toCurrency: prev.fromCurrency
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!exchangeData.amount || !exchangeData.accountId) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (parseFloat(exchangeData.amount) <= 0) {
      toast.error('Exchange amount must be greater than zero');
      return;
    }

    const fromCurrency = currencies.find(c => c.code === exchangeData.fromCurrency);
    const toCurrency = currencies.find(c => c.code === exchangeData.toCurrency);
    
    toast.success(
      `Exchange of ${fromCurrency.symbol}${exchangeData.amount} to ${toCurrency.symbol}${convertedAmount.toFixed(2)} completed successfully!`
    );
    
    setExchangeData({
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      amount: '',
      accountId: ''
    });
  };

  const getCurrencySymbol = (code) => {
    return currencies.find(c => c.code === code)?.symbol || code;
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
            <h1 className="text-2xl font-bold">Currency Exchange</h1>
            <p className="text-surface-500">Exchange currencies at competitive rates</p>
          </div>
        </div>

        {/* Live Rates */}
        <div className="card mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUpIcon className="h-5 w-5" />
            Live Exchange Rates
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { from: 'USD', to: 'EUR', rate: 0.85 },
              { from: 'USD', to: 'GBP', rate: 0.73 },
              { from: 'USD', to: 'JPY', rate: 110.25 },
              { from: 'EUR', to: 'USD', rate: 1.18 },
              { from: 'GBP', to: 'USD', rate: 1.37 },
              { from: 'EUR', to: 'GBP', rate: 0.86 }
            ].map((rate, index) => (
              <div key={index} className="p-3 bg-surface-50 dark:bg-surface-700 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{rate.from}/{rate.to}</span>
                  <span className="text-green-600 dark:text-green-400">{rate.rate.toFixed(4)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Exchange Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-lg font-semibold mb-6">Exchange Currency</h2>
          
          <div className="space-y-6">
            {/* Account Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">From Account *</label>
              <select
                name="accountId"
                value={exchangeData.accountId}
                onChange={handleInputChange}
                className="w-full"
                required
              >
                <option value="">Select account</option>
                {accounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.name} ({account.number}) - {getCurrencySymbol(account.currency)}{account.balance.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            {/* Currency Exchange */}
            <div className="space-y-4">
              {/* From Currency */}
              <div>
                <label className="block text-sm font-medium mb-2">From</label>
                <div className="flex gap-3">
                  <select
                    name="fromCurrency"
                    value={exchangeData.fromCurrency}
                    onChange={handleInputChange}
                    className="flex-1"
                  >
                    {currencies.map((currency) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.code} - {currency.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    name="amount"
                    value={exchangeData.amount}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0.01"
                    className="flex-1"
                    required
                  />
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleSwapCurrencies}
                  className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                >
                  <ArrowUpDownIcon className="h-5 w-5" />
                </button>
              </div>

              {/* To Currency */}
              <div>
                <label className="block text-sm font-medium mb-2">To</label>
                <div className="flex gap-3">
                  <select
                    name="toCurrency"
                    value={exchangeData.toCurrency}
                    onChange={handleInputChange}
                    className="flex-1"
                  >
                    {currencies.map((currency) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.code} - {currency.name}
                      </option>
                    ))}
                  </select>
                  <div className="flex-1 px-3 py-2 bg-surface-100 dark:bg-surface-700 rounded-lg border border-surface-200 dark:border-surface-600">
                    {convertedAmount.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Exchange Rate Display */}
            {exchangeData.amount && (
              <div className="p-4 bg-surface-50 dark:bg-surface-700 rounded-lg">
                <div className="flex justify-between items-center">
                  <span>Exchange Rate:</span>
                  <span className="font-medium">1 {exchangeData.fromCurrency} = {exchangeRate.toFixed(4)} {exchangeData.toCurrency}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span>You will receive:</span>
                  <span className="font-bold text-lg">{getCurrencySymbol(exchangeData.toCurrency)}{convertedAmount.toFixed(2)}</span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full btn btn-primary"
            >
              Exchange Currency
            </button>
          </div>
        </motion.form>

        {/* Recent Exchanges */}
        <div className="card mt-6">
          <h2 className="text-lg font-semibold mb-4">Recent Exchanges</h2>
          <div className="space-y-3">
            {[
              { from: 'USD', to: 'EUR', amount: 1000, received: 850, date: 'Jan 24, 2023', rate: 0.85 },
              { from: 'EUR', to: 'GBP', amount: 500, received: 430, date: 'Jan 22, 2023', rate: 0.86 },
              { from: 'USD', to: 'JPY', amount: 200, received: 22050, date: 'Jan 20, 2023', rate: 110.25 }
            ].map((exchange, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors">
                <div>
                  <p className="font-medium">{exchange.from} → {exchange.to}</p>
                  <p className="text-sm text-surface-500">{exchange.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{getCurrencySymbol(exchange.from)}{exchange.amount} → {getCurrencySymbol(exchange.to)}{exchange.received.toLocaleString()}</p>
                  <p className="text-sm text-surface-500">Rate: {exchange.rate.toFixed(4)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exchange;