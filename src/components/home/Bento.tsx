import React from 'react'
import { Cover } from '../ui/cover'
import Bento from '../ui/Bento';

function TachStack() {
  return (
      <div className='w-full min-h-screen pb-12 relative !border-l-[1px] !border-r-[1px] !border-border '>
     
        <div id='title' className='w-full py-8 flex justify-center'>
          <h2 className="font-semibold text-center mb-6 relative z-20 py-6 bg-clip-text text-transparent bg-black dark:bg-gradient-to-b dark:from-neutral-800 dark:via-white dark:to-white">
            Boost Sales & Conversions <br /> at <Cover>light speed</Cover>
          </h2>
        </div>

        {/* bento */}
       <Bento />

      </div>
  )
}

export default TachStack