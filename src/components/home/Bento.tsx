import React from 'react'
import { Cover } from '../ui/cover'

function TachStack() {
  return (
    <div className='relative container '>
      <div className='w-full h-screen relative !border-l-[1px] !border-r-[1px] !border-neutral-800 '>
     

        <div id='title' className='w-full py-8 flex justify-center'>
          <h3 className="font-semibold text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
            Boost Sales & Conversions <br /> at <Cover>light speed</Cover>
          </h3>
        </div>

        {/* bento */}
        <div className='w-full max-w-2xl mx-auto flex gap-4'>
          <div className='relative w-full h-fit flex flex-col gap-4'>
            <div className='h-[96px] p-[24px] rounded-[28px] bg-neutral-900 flex gap-[16px]'></div>
            <div className='h-[96px] p-[24px] rounded-[28px] bg-neutral-900 flex gap-[16px]'></div>

            <div className='h-[296px] p-[24px] rounded-[28px] bg-neutral-900'></div>
          </div>

          <div className='relative w-full h-fit flex flex-col gap-4'>
            <div className='h-[296px] p-[24px] rounded-[28px] bg-neutral-900'></div>

            <div className=' h-[96px] p-[24px] rounded-[28px] bg-neutral-900 flex gap-[16px]'></div>
            <div className=' h-[96px] p-[24px] rounded-[28px] bg-neutral-900 flex gap-[16px]'></div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default TachStack