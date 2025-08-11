"use client";
import {motion, useMotionValue, animate} from "framer-motion";
import { useEffect } from "react";


function MovingCursor() {
    const points = [
        {
            x: 100,
            y: -20,
        },
        {
            x: 20,
            y: 20,
        },
        {
            x: 60,
            y: -10,
        },
        {
            x: 120,
            y: -24,
        },
    
    ]

    const x = useMotionValue(points[0].x)
    const y = useMotionValue(points[0].y)

    useEffect(()=> {
        let currentIndex = 0;

        const interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % points.length
            animate(x, points[currentIndex].x, {type:"spring", stiffness: 100, damping: 20})
            animate(y, points[currentIndex].y, {type:"spring", stiffness: 100, damping: 20})
        }, 1200);

        return ()=> clearInterval(interval);
    })

    return (
        <motion.div 
            className="absolute z-[100]"
            style={{x,y}}
        >
            <svg className="w-6 h-6" width="244" height="244" viewBox="0 0 244 244" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M198.28 101.362C210.521 106.333 209.586 123.972 196.887 127.622L132.787 146.054L103.507 205.987C97.7014 217.862 80.1639 215.716 77.3884 202.795L47.5493 63.6129C47.0161 61.139 47.1674 58.5665 47.9871 56.1722C48.8068 53.7779 50.2638 51.6524 52.2013 50.0244C54.1388 48.3964 56.4836 47.3274 58.9833 46.9326C61.483 46.5377 64.0431 46.8318 66.3881 47.7834L198.28 101.362Z" fill="#070707" stroke="white" stroke-width="15.25"/>
            </svg>

            <div className="border-[1px] dark:border-white bg-neutral-900 dark:bg-[#070707] ml-4 mt-[-5px] px-4 py-2  text-white text-sm rounded-full">
                Just Click
            </div>
        </motion.div>
    )
}

export default MovingCursor