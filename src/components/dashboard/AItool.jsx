import React from 'react'
import Steps from '../Steps'

const AItool = () => {
  return (
    <div className='h-full  rounded-lg flex flex-col gap-2'>
        <div className='flex gap-4 items-center'>
            <h1 className='text-2xl text-white'>AI Tool</h1>
            <Steps />
        </div>
        
        <div className='bg-zinc-800 h-full rounded-lg'>

        </div>
    </div>
  )
}

export default AItool