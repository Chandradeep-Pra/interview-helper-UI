import React from 'react'
import dp from './dp.png'
import Searchbar from '../Searchbar'

const Topbarmobile = () => {
  return (
    <div className='flex justify-between'>
        <div className='flex gap-2'>
            <img src={dp} className='w-[30px] h-[30px] rounded-full border-2 border-blue-600 p-[1px]' alt="" />
            <div className='flex flex-col'>
                    <span className='text-xs flex flex-row'>Hi,</span>
                    <span className='text-sm text-zinc-600 -mt-1 font-bold'>Chandradeep</span>
            </div>
        </div>
        <Searchbar isMobileView = {true} />
    </div>
  )
}

export default Topbarmobile