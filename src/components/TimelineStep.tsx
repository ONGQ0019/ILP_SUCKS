import React from 'react';
import { Check } from 'lucide-react';

interface TimelineStepProps {
  step: number;
  title: string;
  description: string;
  isLast?: boolean;
}

const TimelineStep: React.FC<TimelineStepProps> = ({ step, title, description, isLast = false }) => {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500 text-white">
          <Check className="w-5 h-5" />
        </div>
        {!isLast && <div className="w-0.5 h-full bg-emerald-500/30 mt-2"></div>}
      </div>
      <div className="pb-8">
        <h3 className="text-lg font-semibold text-white mb-2">
          Step {step}: {title}
        </h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export default TimelineStep;