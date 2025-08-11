"use client"
import {Check} from "lucide-react"

interface serviceLabelProps {
  label: string,
  index: number,
  isTick?: boolean
}

function ServiceLabel({label, index, isTick}: serviceLabelProps) {

  return (
    <div 
        key={index}
        className={`flex px-2 py-1 rounded-full text-sm border-[1px] border-dashed border-neutral-600 items-center justify-center gap-2 ${isTick && "border-none bg-neutral-200 dark:bg-neutral-800"}`}
    >
        {
            isTick ? (
                <Check size={14}/>
            ) : (
                <div 
                    className="w-4 h-4 rounded-full border-[1px] border-neutral-600"
                />
            )
        }

      {label}
    </div>
  )
}

export default ServiceLabel