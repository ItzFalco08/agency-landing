"use client";
import Lenis from 'lenis';
import { useEffect } from 'react'

let lenis: Lenis | undefined;

function SmoothScroll() {
    useEffect(()=> {
        // add smooth scroll
        lenis = new Lenis({
            lerp: 0.15,            // Higher = more friction
        });
        let animationFrameId: number;

        function raf(currentTime: number) {
            lenis?.raf(currentTime);
            // assign the next animation frame
            animationFrameId = requestAnimationFrame(raf);
        }
        animationFrameId = requestAnimationFrame(raf);

        return ()=> {
            // destroy lenis instance
            lenis?.destroy();
            // destroy raf animation frame
            cancelAnimationFrame(animationFrameId);
        }
    },[])

    return null;
}

export { SmoothScroll, lenis };