"use client";
import React from 'react'
import { Button } from '@/components/ui/button';
import {lenis} from "@/utility/SmoothScroll";

interface ScrollButtonProps extends React.ComponentProps<typeof Button> {
    scrollElemId: string;
    children: React.ReactNode;
}

function ScrollButton({ scrollElemId, children, ...props }: ScrollButtonProps) {
    const scroll = () => {
        const element = document.getElementById(scrollElemId);
        console.log("Scrolling to element:", element, " elementId:", scrollElemId);

        if (element) {
            lenis?.scrollTo(element, {
                duration: 1.5,                
            })
        }
    };

    return (
        <Button {...props} onClick={scroll}>
            {children}
        </Button>
    );
}

export default ScrollButton