import React, { useState } from 'react'

import { MdQuestionMark } from "react-icons/md";
import menuIcons from '../../data/menuIcon';

const Sidebar = () => {
    const [toggle, setToggle] = useState(true)
  return (
    <div className='h-full bg-[#1D1D1F] rounded-xl text-white px-2 py-4 flex flex-col justify-between'>
        <div className='px-2'>
        
            <a className='font-semibold text-2xl text-center bg-gradient-to-r from-fuchsia-600 to-purple-600 bg-clip-text text-transparent cursor-pointer' onClick={() => setToggle(prevToggle => !prevToggle)}>
                {toggle?"Placementor":"P"}
            </a>
            {/* <img 
            className='border-2 rounded-full px-1 py-1'
            src={manOnRocket} 
            alt="Rocket"
            id='rocket'
            style={{ 
              width: '40px', 
              height: 'auto', 
            }}
            /> */}
        </div>
        
        <div className='flex flex-col gap-3'>
            {menuIcons.map((item,index)=>(
                <div className='flex items-center gap-3 hover:bg-slate-500/[0.6] rounded-lg px-2 py-2 cursor-pointer'>
                    {item.icon}
                    {toggle && <span className='text-sm'>{item.title}</span>}
                </div> 
        ))}
            
        </div>
        
        <div className='flex items-center gap-1 px-2 hover:bg-slate-500/[0.6] py-2 rounded-lg'>
                <MdQuestionMark size={20} />
                {toggle && <span className='text-sm'>Support</span>}
        </div>
    </div>
  )
}

export default Sidebar