import React from 'react'
import Sidebar from './Sidebar'
import ContentBoard from './ContentBoard'

const Dashboard = () => {
  return (
    <div className='w-full h-full bg-[#F5F5F7] px-3 py-3 flex gap-2'>
      <Sidebar />
      <ContentBoard />
    </div>
  )
}

export default Dashboard