import React from 'react'
import {Button} from "@/components/ui/button";
import { TextGenerateEffect } from '../ui/text-generate-effect';
import { Spotlight } from '../ui/spotlight';

function Hero() {
  return (
    <>
    <div className='w-screen min-h-screen bg-background'>
      <Spotlight className='fixed left-1/5 top-[-26%] hidden md:block light:hidden'/>
        {/* Hero content goes here */}
        <div className='container relative min-h-[36rem] flex flex-col'>
          {/* hero content */}
          <div className='w-full flex-1 border-l-[1px] border-r-[1px] border-neutral-800 flex items-center justify-center'>
            <div className='space-y-6 flex flex-col items-center gap-4'>
              <div className='text-center text-[clamp(2rem,6vw,3rem)] max-w-xl font-medium leading-tight tracking-tight'>
                <TextGenerateEffect 
                  words="Build Scalable Websites That" 
                  className="font-poppins"
                  delay={0}
                />
                {" "}
                <TextGenerateEffect 
                  words="Converts" 
                  className="font-playfair italic"
                  duration={0.5}
                  delay={1}
                />
              </div>
              
              <div className='flex gap-4'>
                <Button size="lg" className='cursor-pointer'> LET&apos;S TALK</Button>
                <Button size="lg" variant="secondary" className='cursor-pointer'>OUR WORK</Button>
              </div>
            </div>
          </div>

        </div>
        
        <div className='w-full border-t-[1px] border-neutral-800 pt-4'>

        </div>
    </div>
    </>
  )
}

export default Hero