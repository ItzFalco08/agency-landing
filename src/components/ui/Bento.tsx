"use client";
import { cn } from "@/lib/utils";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Globe, Marketing, Code, Software } from "@/icons/Icons";
import { useTheme } from "next-themes";


function BentoItem({children, className}: {children?: React.ReactNode, className?: string}) {
  const ref = useRef(null);
  
  
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ["start end", "end start"], // Animation from when element enters to when it leaves
  });

  const scale = useSpring(useTransform(scrollYProgress, [0, 0.16], [0.86, 1]), { damping: 30, stiffness: 200 });

  return (
    <motion.div ref={ref} style={{scale}} className={
      cn('h-fit md:min-h-[96px] p-[20px] rounded-[28px] bg-neutral-100 dark:bg-neutral-900 flex gap-[16px]', className)
    }>
      {children}
    </motion.div>
  )
}

function Bento() {
  
    const { theme } = useTheme();
    const colors:string = theme === "dark"  ? "primary:#FBACF4,secondary:#FBACF4" : "primary:#a4529f,secondary:#a4529f";
  
  return (
    <div className='w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-4 mt-6  px-4 md:px-0'>
      <div className='relative w-full h-fit flex flex-col gap-4'>
        <BentoItem>
          <div className="bg-primary/20 w-[60px] h-[70px] shrink-0 rounded-2xl flex items-center justify-center">
            <Globe colors={colors}/>
          </div>
          <div className="h-full flex flex-col ">
            <h5>Website Development</h5>
            <p className="text-neutral-600 dark:text-neutral-400 font-normal text-[16px] leading-relaxed">
              Fast, modern websites to convert leads.
            </p>
          </div>
        </BentoItem>

        <BentoItem>
          <div className="bg-primary/20 w-[60px] h-[70px] shrink-0 rounded-2xl flex items-center justify-center">
            <Code colors={colors}/>
          </div>
          <div className="h-full flex flex-col ">
            <h5>Mobile Apps</h5>
            <p className="text-neutral-600 dark:text-neutral-400 font-normal text-[16px] leading-relaxed">
              Launch your startup with a user-friendly app.
            </p>
          </div>
        </BentoItem>

        <BentoItem className='!h-[296px] flex-col gap-2'>
          <div className="flex flex-col gap-2">
            <h5>Companies that trust us</h5>
            <p className="text-neutral-600 dark:text-neutral-400 font-normal text-[16px] leading-relaxed">
              From startups to enterprises, we deliver results.
            </p>
          </div>
        </BentoItem>
      </div>

      <div className='relative w-full h-fit flex flex-col gap-4'>
        <BentoItem className='!h-[296px] flex flex-col gap-2'>
          <h5 className=" font-semibold">50+ Projects Delivered</h5>
          <p className="text-neutral-600 dark:text-neutral-400 font-normal text-[16px] leading-relaxed">
            High-impact digital solutions across industries.
          </p>
        </BentoItem>

        <BentoItem>
          <div className="bg-primary/20 w-[60px] h-[70px] shrink-0 rounded-2xl flex items-center justify-center">
            <Marketing colors={colors} />
          </div>

          <div className="h-full flex flex-col justify-between">
            <h5 className="font-semibold">Digital Marketing</h5>
            <p className="text-neutral-600 dark:text-neutral-400 font-normal text-[16px] leading-relaxed">
              Reach your audience with campaigns.
            </p>
          </div>
        </BentoItem>

        <BentoItem>
          <div className="bg-primary/20 w-[60px] h-[70px] shrink-0 rounded-2xl flex items-center justify-center">
            <Software colors={colors} />
          </div>

          <div className="h-full flex flex-col justify-between">
            <h5>Software Development</h5>
            <p className="text-neutral-600 dark:text-neutral-400 font-normal text-[16px] leading-relaxed">
              Custom software to solve unique challenges.
            </p>
          </div>
        </BentoItem>
      </div>
    </div>
  )
}

export default Bento