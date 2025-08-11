import MovingCursor from "./ui/MovingCursor";
import {InfiniteMovingCards} from "@/components/ui/infinite-moving-cards";
import ServiceLabel from "./ui/ServiceLabel"

function Cta() {
  const services = [
    "Landing Page",
    "Branding",
    "Contact Page need to update",
    "Pitch deck urgent",
    "Mobile app needed",
    "Logo"
  ]

  return (
    <div className="w-full h-fit border-t-[1px] border-b-[1px] border-border flex items-center gap-16 p-4 py-10 sm: md:p-12 flex-col">
      <div className="flex flex-col gap-6">
        <h3 className="text-xl text-center md:text-3xl">If you scrolled this far,  It's time to LEVEL UP</h3>
        
        <div className="mx-auto">
          <button id="customBtn" className="relative rounded-full text-white dark:text-black w-[200px] h-[60px] cursor-pointer ">
            {/* content */}
            <div id="content" className="absolute z-[2] rounded-full items-center justify-center font-semibold flex gap-2 bg-neutral-900 dark:bg-white">
              {/* svg */}
              <div className=" flex-shrink-0 w-6 h-6" style={{imageRendering: "pixelated"}} aria-hidden="true">
                <svg
                  viewBox="0 0 23 23"
                  width="100%"
                  height="100%"
                  role="img"
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M15.529 2.998C15.471 2.02 16.782 1.644 17.251 2.505L17.275 2.549 17.322 2.634C17.896 3.676 19.038 4.274 20.222 4.152C21.23 4.049 21.617 5.429 20.704 5.865C19.624 6.381 18.96 7.495 19.02 8.691L19.026 8.819C19.074 9.798 17.761 10.16 17.299 9.296L17.249 9.199C16.685 8.142 15.537 7.53 14.345 7.651C13.338 7.753 12.951 6.378 13.864 5.941C14.94 5.425 15.6 4.311 15.536 3.119L15.532 3.039Z M6.187 8.778C6.09 7.125 8.307 6.49 9.099 7.946L9.139 8.02 9.219 8.164C10.191 9.925 12.12 10.934 14.121 10.729C15.824 10.555 16.479 12.887 14.935 13.625C13.109 14.497 11.986 16.381 12.088 18.402L12.098 18.617C12.18 20.273 9.96 20.885 9.179 19.424L9.095 19.26C8.14 17.473 6.201 16.439 4.185 16.644C2.484 16.817 1.83 14.492 3.372 13.752C5.191 12.879 6.307 10.998 6.2 8.983L6.193 8.848Z"/>
                </svg>
              </div>
              
              Join the Elite Club
            </div>
          </button>

          <MovingCursor/>
          
        </div>
       

      </div>

      <div className="w-full h-[16rem] bg-neutral-100 dark:bg-neutral-900 rounded-xl flex flex-col gap-12 justify-center items-center">
        <span className="font-medium text-md md:text-lg">Trust me we are good at this :)</span>
        
        <div className="relative h-[60px] w-full  z-[100] flex">
          <div className="relative h-full flex-1 border-r-[1px] border-black dark:border-white rounded-lg overflow-hidden">
            <InfiniteMovingCards className="w-full h-full" vintegge={true} direction="right" pauseOnHover={false} hideVinteggeOnMobile={true}>
              {
                services.map((service, index)=> (
                  <ServiceLabel key={index} label={service} index={index} />
                ))
              }
            </InfiniteMovingCards>
          </div>
          
          <div className="h-full w-[150px] bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-semibold text-sm md:text-lg">
            Working...
          </div>
          
          <div className="relative h-full flex-1 border-l-[1px] border-black dark:border-white rounded-lg overflow-hidden">
              <InfiniteMovingCards className="w-full h-full" vintegge={true} direction="right" pauseOnHover={false} hideVinteggeOnMobile={true}>
              {
                services.map((service, index)=> (
                  <ServiceLabel key={index} label={service} index={index} isTick={true} />
                ))
              }
            </InfiniteMovingCards>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Cta;