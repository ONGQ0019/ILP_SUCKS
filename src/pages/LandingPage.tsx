import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, DollarSign, TrendingDown } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const cards = [
    {
      icon: <DollarSign className="h-8 w-8 text-red-500" />,
      title: "High Fees",
      description: "ILPs come with multiple layers of fees that eat into your returns, including insurance charges, fund management fees, and policy fees."
    },
    {
      icon: <TrendingDown className="h-8 w-8 text-red-500" />,
      title: "Poor Returns",
      description: "The combination of high fees and insurance costs significantly reduces your potential investment returns compared to direct investments."
    },
    {
      icon: <AlertTriangle className="h-8 w-8 text-red-500" />,
      title: "Lack of Flexibility",
      description: "ILPs often come with long lock-in periods and penalties for early withdrawal, limiting your financial flexibility."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-screen flex items-center justify-center text-center px-4"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            If you hate mosquitoes,<br />you will hate insurance agents too
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-300 mb-12"
          >
            Uncover the truth about Investment Linked Plans through data visualization
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center"
          >
            <button
              onClick={() => navigate('/visualization')}
              className="px-8 py-4 bg-emerald-500 text-white rounded-lg font-bold text-lg
                         hover:bg-emerald-600 transition-all duration-300
                         shadow-[0_0_15px_rgba(16,185,129,0.5)]
                         hover:shadow-[0_0_30px_rgba(16,185,129,0.8)]"
            >
              Discover More
            </button>
            <p className="mt-4 text-gray-400 italic">Your money is your responsibility</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Cards Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white text-center mb-16"
          >
            Why ILPs Are a Bad Investment
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm
                          border border-gray-700 hover:border-emerald-500/50
                          transition-all duration-300
                          shadow-[0_0_15px_rgba(16,185,129,0.1)]
                          hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gray-900 p-3 rounded-full">
                  {card.icon}
                </div>
                <h3 className="mt-8 text-xl font-bold text-white mb-4">{card.title}</h3>
                <p className="text-gray-300">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;