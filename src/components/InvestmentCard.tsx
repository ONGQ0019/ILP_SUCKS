import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TimelineStep from './TimelineStep';

interface Step {
  title: string;
  description: string;
}

interface InvestmentCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  steps: Step[];
  isSelected: boolean;
  onClick: () => void;
}

const InvestmentCard: React.FC<InvestmentCardProps> = ({
  title,
  icon,
  description,
  steps,
  isSelected,
  onClick,
}) => {
  return (
    <motion.div
      layout="position"
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl border cursor-pointer
                ${isSelected 
                  ? 'bg-gray-800/80 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)]' 
                  : 'bg-gray-800/50 border-gray-700 hover:border-emerald-500/30 hover:shadow-[0_0_15px_rgba(16,185,129,0.1)]'}
                transition-colors duration-300`}
    >
      <motion.div layout="position" className="p-6">
        <motion.div layout="position" className="flex items-center gap-4 mb-4">
          <div className="text-emerald-500">{icon}</div>
          <h2 className="text-xl font-bold text-white">{title}</h2>
        </motion.div>
        
        <motion.div
          layout="position"
          initial={false}
          animate={{ opacity: isSelected ? 1 : 0.7 }}
          className="text-gray-300 mb-6"
        >
          {description}
        </motion.div>

        <AnimatePresence>
          {isSelected && (
            <motion.div
              layout="position"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <h3 className="text-lg font-semibold text-white mb-6">How to Get Started:</h3>
              <div className="space-y-2">
                {steps.map((step, index) => (
                  <TimelineStep
                    key={index}
                    step={index + 1}
                    title={step.title}
                    description={step.description}
                    isLast={index === steps.length - 1}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default InvestmentCard;