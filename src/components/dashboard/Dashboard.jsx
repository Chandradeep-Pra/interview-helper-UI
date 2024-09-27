import React from 'react'
import Cardtest from '../Cardtest'

const Dashboard = () => {
  return (
    <div className='h-full  rounded-lg flex flex-col gap-2'>
        <div className='flex flex-col'>
            <h1 className='text-sm text-white/[0.6]'>Dashboard</h1>
            <h1 className='text-lg text-white'>Popular Mocks</h1>
        </div>
        
        <div className='max-h-[calc(100vh-120px)] rounded-lg   flex gap-2'>
            {/* Make Grid from Tailwind  */}
            <div className=' bg-zinc-800 h-full overflow-y-auto p-2 rounded-xl w-1/4'>

            <Cardtest />
            </div>
            <div className='bg-zinc-800 w-full'>
              <div>
              <h1 className='text-lg text-white'>By Tech Stack</h1>
              </div>
              <div></div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard

// 