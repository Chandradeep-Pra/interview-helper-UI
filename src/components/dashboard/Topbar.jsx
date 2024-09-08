import React from 'react';
import Searchbar from '../Searchbar';
import { MdNotifications } from 'react-icons/md';
import dp from './dp.png'


const Topbar = () => {
    const count = 2; // Change this to test different values

    return (
        <div className='flex justify-between items-center '>
            <div>
                <Searchbar />
            </div>
            <div className='flex items-center gap-16 justify-between'>
                <div>
                    <span className='text-base flex flex-row'>Friday</span>
                    <span className='text-sm text-zinc-600'>April 10, 2024</span>
                </div>
                <div className='flex items-center gap-2 '>
                    <div className="relative  items-center">
                        <MdNotifications size={24} className="text-gray-800" />
                            {(count !== 0) > 0 && (
                            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                                {count}
                            </span>
                            )}
                    </div>
                    <img src={dp} className='w-[30px] h-auto rounded-full border-2 border-slate-900' alt="" />
                </div>
                
            </div>
        </div>
    );
};

export default Topbar;
