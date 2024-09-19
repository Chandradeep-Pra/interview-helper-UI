import React from 'react'
import Cardtest from '../Cardtest'

const Dashboard = () => {
  return (
    <div className='h-full  rounded-lg flex flex-col gap-2'>
        <div className='flex flex-col'>
            <h1 className='text-sm text-white/[0.6]'>Dashboard</h1>
            <h1 className='text-lg text-white'>Popular Mocks</h1>
        </div>
        
        <div className='bg-zinc-800 max-h-[calc(100vh-120px)] rounded-lg py-2 px-2 flex-1 overflow-y-auto'>
            {/* Make Grid from Tailwind  */}
            <Cardtest />
        </div>
    </div>
  )
}

export default Dashboard

// 