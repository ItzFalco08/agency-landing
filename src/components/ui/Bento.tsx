"use client";
import { cn } from "@/lib/utils";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Smartphone } from "lucide-react";
import { useRef } from "react";
import { IconWorldWww, IconDeviceMobile, IconBrandGoogleAnalytics, IconDeviceDesktopCode } from "@tabler/icons-react";
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
  return (
    <div className='w-full max-w-3xl mx-auto flex flex-col md:flex-row gap-4 mt-6 px-4 md:px-0'>
      <div className='relative w-full h-fit flex flex-col gap-4'>
        <BentoItem>
          <div className="bg-[#8d42df70] w-[60px] h-[70px] shrink-0 rounded-2xl flex items-center justify-center">
           <IconWorldWww size={28}/>
          </div>
          <div className="h-full flex flex-col justify-between">
            <h5>Website Development</h5>
            <p className="text-neutral-600 dark:text-neutral-400 font-normal text-[16px] leading-relaxed">
              Fast, modern websites to convert leads.
            </p>
          </div>
        </BentoItem>

        <BentoItem>
          <div className="bg-[#8d42df70] w-[60px] h-[70px] shrink-0 rounded-2xl flex items-center justify-center">
            <IconDeviceMobile size={28}/>
          </div>
          <div className="h-full flex flex-col justify-between">
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
          <div className="bg-[#8d42df70] w-[60px] h-[70px] shrink-0 rounded-2xl flex items-center justify-center">
            <IconBrandGoogleAnalytics size={28}/>
          </div>

          <div className="h-full flex flex-col justify-between">
            <h5 className="font-semibold">Digital Marketing</h5>
            <p className="text-neutral-600 dark:text-neutral-400 font-normal text-[16px] leading-relaxed">
              Reach your audience with campaigns.
            </p>
          </div>
        </BentoItem>

        <BentoItem>
          <div className="bg-[#8d42df70] w-[60px] h-[70px] shrink-0 rounded-2xl flex items-center justify-center">
            <IconDeviceDesktopCode size={28}/>
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