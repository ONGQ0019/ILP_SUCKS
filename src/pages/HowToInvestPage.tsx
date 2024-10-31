import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Wallet, Landmark, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import InvestmentCard from '../components/InvestmentCard';

const investmentOptions = [
  {
    id: 'savings',
    title: 'Investing in Savings',
    icon: <Wallet className="w-6 h-6" />,
    description: 'Start your investment journey with high-yield savings accounts and fixed deposits. A safe way to grow your wealth while maintaining liquidity.',
    steps: [
      {
        title: 'Research Banks',
        description: 'Compare interest rates and terms across different banks to find the best savings account or fixed deposit rates.'
      },
      {
        title: 'Prepare Documents',
        description: 'Gather your identification documents, proof of address, and initial deposit amount.'
      },
      {
        title: 'Open Account',
        description: 'Visit the bank website or branch to open your chosen account. Most banks now offer fully online applications.'
      },
      {
        title: 'Set Up Regular Deposits',
        description: 'Establish automatic monthly transfers to ensure consistent savings and maximize interest earnings.'
      }
    ]
  },
  {
    id: 'bonds',
    title: 'Investing in Bonds',
    icon: <Landmark className="w-6 h-6" />,
    description: 'Explore government and corporate bonds for steady, reliable income through fixed-interest payments. A balanced approach to wealth building.',
    steps: [
      {
        title: 'Open a Securities Account',
        description: 'Set up an account with a licensed broker or use government platforms for bond purchases.'
      },
      {
        title: 'Choose Bond Type',
        description: 'Decide between government bonds (lower risk) or corporate bonds (potentially higher returns).'
      },
      {
        title: 'Review Bond Terms',
        description: 'Understand the maturity period, interest rates, and payment schedule before investing.'
      },
      {
        title: 'Monitor and Reinvest',
        description: 'Track your bond investments and plan for reinvestment upon maturity.'
      }
    ]
  },
  {
    id: 'equities',
    title: 'Investing in Equities',
    icon: <TrendingUp className="w-6 h-6" />,
    description: 'Take advantage of stock market growth through index funds and ETFs. A long-term approach to building significant wealth.',
    steps: [
      {
        title: 'Choose a Broker',
        description: 'Select a reputable online broker with competitive fees and a user-friendly platform.'
      },
      {
        title: 'Open Trading Account',
        description: 'Complete the brokers application process and fund your account.'
      },
      {
        title: 'Select Index Funds',
        description: 'Choose low-cost index funds or ETFs that match your investment goals and risk tolerance.'
      },
      {
        title: 'Set Up Regular Investments',
        description: 'Implement a dollar-cost averaging strategy through regular monthly investments.'
      }
    ]
  }
];

const HowToInvestPage = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen pb-20">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <Link 
              to="/"
              className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-400 hover:text-white" />
            </Link>
            <h1 className="text-3xl font-bold text-white">How to Invest</h1>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {investmentOptions.map((option) => (
              <InvestmentCard
                key={option.id}
                title={option.title}
                icon={option.icon}
                description={option.description}
                steps={option.steps}
                isSelected={selectedCard === option.id}
                onClick={() => setSelectedCard(selectedCard === option.id ? null : option.id)}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HowToInvestPage;