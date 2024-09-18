import React, { useCallback } from 'react';
import dp from './dp.png';
import friends from './friends.png';
import { MdQuestionMark } from "react-icons/md";
import menuIcons from '../../data/menuIcon';

const Sidebar = React.memo(({ toggle, setToggle }) => {
  // Memoized callback for toggling the sidebar
  const handleSidebarToggle = useCallback(() => {
    setToggle(prevToggle => !prevToggle);
  }, [setToggle]);

  return (
    <div className='h-full bg-[#1D1D1F] rounded-xl text-white px-2 py-4 flex flex-col justify-between'>
      <div className='px-2'>
        <span
          className='font-semibold text-2xl text-center text-gradient bg-clip-text text-transparent cursor-pointer'
          onClick={handleSidebarToggle}
        >
          {toggle ? "Placementor" : "P"}
        </span>
      </div>

      <div className='flex flex-col gap-3 items-center'>
        <a href="./aitool">
          <div className='flex items-center gap-3 hover:bg-slate-500/[0.6] rounded-lg px-2 py-2 cursor-pointer'>
            <img src={friends} className='w-[30px] h-auto rounded-lg' alt="AI Assistant" />
            {toggle && <span className='text-sm'>AIssistant</span>}
          </div>
        </a>

        {menuIcons.map((item, index) => (
          <a key={index} href={item.title}>
            <div className='flex items-center gap-3 hover:bg-slate-500/[0.6] rounded-lg px-2 py-2 cursor-pointer'>
              {item.icon}
              {toggle && <span className='text-sm'>{item.title}</span>}
            </div>
          </a>
        ))}
      </div>

      <div className='flex items-center gap-1 px-2 hover:bg-slate-500/[0.6] py-2 rounded-lg'>
        <MdQuestionMark size={20} />
        {toggle && <span className='text-sm'>Support</span>}
      </div>
    </div>
  );
});

export default Sidebar;
