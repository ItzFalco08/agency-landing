import React from 'react'
import { Cover } from '../ui/cover'
import Bento from '../ui/Bento';

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
       <Bento />

      </div>
    </div>
  )
}

export default TachStack