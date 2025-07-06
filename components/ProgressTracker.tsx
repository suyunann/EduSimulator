
import React from 'react';
import { SIMULATION_STEPS } from '../constants';
import { StepId } from '../types';

interface ProgressTrackerProps {
  currentStepId: StepId;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ currentStepId }) => {
  return (
    <div className="p-4">
      <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">黃金銷售流程</h2>
      <nav>
        <ul className="space-y-2">
          {SIMULATION_STEPS.map((step, index) => {
            const isCompleted = currentStepId > step.id;
            const isCurrent = currentStepId === step.id;

            let statusClasses = 'bg-white text-slate-500';
            if (isCurrent) {
              statusClasses = 'bg-indigo-600 text-white shadow-md';
            } else if (isCompleted) {
              statusClasses = 'bg-green-100 text-green-700';
            }

            return (
              <li key={step.id}>
                <div className={`flex items-center p-3 rounded-lg transition-all duration-300 ${statusClasses}`}>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 ${isCurrent ? 'bg-indigo-500' : isCompleted ? 'bg-green-200' : 'bg-slate-200'}`}>
                    {isCompleted ? <i className="fa-solid fa-check"></i> : step.icon}
                  </div>
                  <div className="flex-grow">
                    <p className={`font-bold text-sm ${isCurrent ? 'text-white' : 'text-slate-800'}`}>{step.title}</p>
                    <p className={`text-xs ${isCurrent ? 'text-indigo-200' : 'text-slate-500'}`}>{step.description}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default ProgressTracker;
