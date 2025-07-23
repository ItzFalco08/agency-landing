import React from 'react'

interface OrbitIconProps {
  Icon: React.ComponentType
  radius: number
  animationDuration: number
  rotation: number
  animationDelay: number
  reverse?: boolean
}

export const OrbitIcon: React.FC<OrbitIconProps> = ({
  Icon,
  radius,
  animationDuration,
  rotation,
  animationDelay,
  reverse = false
}) => (
  <div 
    style={{
      "--radius": `${radius}px`,
      animation: `orbit ${animationDuration}s linear infinite${reverse ? ' reverse' : ''}`,
      transform: `rotate(${rotation}deg)`,
      animationDelay: `${animationDelay}s`
    } as React.CSSProperties} 
    className="absolute left-1/2 top-1/2 flex size-[40px] items-center justify-center rounded-full"
  >
    <div className="size-12 flex items-center justify-center">
      <Icon />
    </div>
  </div>
)

interface OrbitRingProps {
  radius: number
  children: React.ReactNode
}

export const OrbitRing: React.FC<OrbitRingProps> = ({ radius, children }) => (
  <>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="pointer-events-none absolute inset-0 size-full">
      <circle className="stroke-black/10 stroke-1 dark:stroke-white/10" cx="50%" cy="50%" r={radius} fill="none"></circle>
    </svg>
    {children}
  </>
)

interface TechStackHeaderProps {
  title: string
  description: React.ReactNode
}

export const TechStackHeader: React.FC<TechStackHeaderProps> = ({ title, description }) => (
  <div id='title' className='w-full py-8 flex flex-col items-center justify-center mb-6'>
    <h2 className="font-semibold text-center relative z-20 py-6 bg-clip-text text-transparent bg-black dark:bg-gradient-to-b dark:from-neutral-800 dark:to-white">
      {title}
    </h2>
    <p className="text-center text-muted-foreground max-w-2xl">
      {description}
    </p>
  </div>
)

export const TechStackContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative h-112 overflow-hidden">
    <div className="relative flex h-[1200px] w-full flex-col items-center justify-center overflow-hidden">
      {children}
    </div>
    
    <div className="absolute bottom-0 h-24 w-full bg-gradient-to-t from-background to-transparent"></div>
    
    <button className="whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([className*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 h-9 has-[>svg]:px-3 group text-md absolute bottom-0 left-1/2 mx-auto mt-24 flex w-fit -translate-x-1/2 items-center justify-center gap-2 rounded-full px-4 py-1 tracking-tight">
      <span>Get Started</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right size-4 -rotate-45 transition-all ease-out group-hover:ml-3 group-hover:rotate-0" aria-hidden="true">
        <path d="M5 12h14"></path>
        <path d="m12 5 7 7-7 7"></path>
      </svg>
    </button>
  </div>
)
