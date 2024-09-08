import React from 'react'
import { MdSearch } from 'react-icons/md'

const Searchbar = () => {
    const query=""
    const handleChange = () => {}
  return (
    <div className='relative'>
      <input
        type="search"
        placeholder="Search by Job Position, Company"
        
        
        className="h-10 px-1 pl-10 w-40 md:w-80 rounded-lg focus:outline-none focus:border-gray-200 text-black"
      />
      <MdSearch
        size={20}
        className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
      />
    </div>
   
  )
}

export default Searchbar