import Starfield from './Starbg';
import { useNavigate } from 'react-router-dom';

import Landinglogo from './Landinglogo';
const Landing = () => {
  const navigate = useNavigate();

  const handleTryFree = () =>{
    navigate('/dashboard')
  }
  return (
    <div className="relative w-full h-full">
      <Starfield />
      <div className="top-0 left-0 w-full h-full flex flex-row py-2">
        
        <Landinglogo />
        <div className='rounded-lg flex flex-col px-2 py-6 items-center  w-4/6'>
            
            
            <div>
              {/* <h1 className="text-xl font ext-center text-white/[0.6]">Learn with Confidence</h1> */}
              <h1 className="text-4xl mb-8 text-center text-white/[0.7]">Transfer your interview preaparation with, <a className='text-6xl font-bold bg-gradient-to-r from-fuchsia-600 to-purple-600 bg-clip-text text-transparent cursor-pointer' href='./'>PlaceMentor</a></h1>

              <span className='text-yellow-50 text-sm '>Ready to excel in your next interview? Our AI-powered tool provides personalized practice sets to help you prepare quickly and effectively. Enhance your skills and boost your confidence with targeted interview prep designed for rapid success.</span>
           </div>
            <div className='flex justify-around w-full mt-12'>
              <div className='flex  flex-col items-center gap-1'>
                <div className='h-[40px] w-[40px] bg-orange-200 text-xl font-bold rounded-full text-center py-1 text-slate-900'>1</div>
                <h1 className='text-xs text-center text-orange-200'>Upload Resume</h1>
              </div>
              <div className='flex  flex-col items-center gap-1'>
                <div className='h-[40px] w-[40px] bg-orange-200 text-xl font-bold rounded-full text-center py-1 text-slate-900'>2</div>
                <h1 className='text-xs text-center text-orange-200'>Job Description</h1>
              </div>
              
              <div className='flex  flex-col items-center gap-1'>
                <div className='h-[40px] w-[40px] bg-orange-200 text-xl font-bold rounded-full text-center py-1 text-slate-900'>3</div>
                <h1 className='text-xs text-center text-orange-200'>Practice</h1>
              </div>
            </div>
            <div className='w-[70%] flex gap-2 flex-col mt-16'>
                <div className='flex w-full gap-2'>
                  <button onClick={handleTryFree} className='w-1/3 rounded-lg bg-blue-600 px-2 py-2 font-bold text-white'>Try for Free</button>
                  <button className='w-2/3 rounded-lg bg-transparent border-2 border-blue-800 text-white font-bold px-2 py-2'>Prepare with an Expert</button>
                </div>
                <button className='w-full bg-green-600 px-2 py-2 rounded-lg text-white font-bold'>OA & Interview Preparation</button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Landing;