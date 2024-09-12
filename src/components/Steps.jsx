import React, { useState } from 'react';

const Steps = () => {
  const [activeStep, setActiveStep] = useState(null);
  const stepDet = ['Upload Resume', 'Enter Job description'];

  const handleStepClick = (index) => {
    setActiveStep(index === activeStep ? null : index); // Toggle the visibility of the step
  };

  return (
    <div className='flex  gap-1 bg-zinc-700 rounded-full items-center justify-around'>
      {stepDet?.map((step, i) => (
        <div key={i} className='text-gray-200 px-1 py-1 flex gap-1  items-center justify-center '>
          <span
            className='bg-white text-black px-1 text-xs text-center rounded-full cursor-pointer'
            onClick={() => handleStepClick(i)}
          >
            {i + 1}
          </span>
          {activeStep === i && (
            <span className='text-xs text-gray-100'>
              {step}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Steps;
