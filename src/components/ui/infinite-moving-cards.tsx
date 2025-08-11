"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  children,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
  vintegge = false,
  hideVinteggeOnMobile = false
}: {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow" | "superfast";
  pauseOnHover?: boolean;
  className?: string;
  vintegge?: boolean;
  isWorking?: boolean;
  hideVinteggeOnMobile?: boolean;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards",
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "superfast") {
        containerRef.current.style.setProperty("--animation-duration", "4s");
      } else if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
return (
  <div
    ref={containerRef}
    className={cn(
      "scroller relative z-20 w-full overflow-hidden",
      className,
    )}
  >

    {
      vintegge && (
        <>
          {/* Left gradient */}
          <div className={`${hideVinteggeOnMobile && "hidden md:block"} pointer-events-none absolute left-0 top-0 h-full w-24 z-20 bg-gradient-to-r from-neutral-100 dark:from-neutral-900 to-transparent`} />
          {/* Right gradient */}
          <div className={`${hideVinteggeOnMobile && "hidden md:block"} pointer-events-none absolute right-0 top-0 h-full w-24 z-20 bg-gradient-to-l from-neutral-100 dark:from-neutral-900 to-transparent`} />
        </>
      )
    }

    <ul
      ref={scrollerRef}
      className={cn(
        "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
        start && "animate-scroll",
        pauseOnHover && "hover:[animation-play-state:paused]",
      )}
    >
      {React.Children.map(children, (child, idx) => (
        <li key={idx} className="shrink-0">
          {child}
        </li>
      ))}
    </ul>
  </div>
);
};
