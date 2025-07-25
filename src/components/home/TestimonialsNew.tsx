'use client'

import { Slider } from "@/components/ui/Slider";
import { usePublicData } from "@/hooks/usePublicData";
import { Loader2 } from "lucide-react";

export function Testimonials() {
  const { testimonials, loading, error } = usePublicData()

  if (loading) {
    return (
      <div className="border-l-[1px] border-r-[1px] border-border py-12">
        <div id='title' className='w-full flex justify-center mb-12'>
          <h2 className="font-semibold text-center relative z-20 py-6 bg-clip-text text-transparent bg-black dark:bg-gradient-to-b dark:from-neutral-800 dark:via-white dark:to-white">
            Results speak louder <br/> than words
          </h2>
        </div>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="border-l-[1px] border-r-[1px] border-border py-12">
        <div id='title' className='w-full flex justify-center mb-12'>
          <h2 className="font-semibold text-center relative z-20 py-6 bg-clip-text text-transparent bg-black dark:bg-gradient-to-b dark:from-neutral-800 dark:via-white dark:to-white">
            Results speak louder <br/> than words
          </h2>
        </div>
        <div className="text-center text-muted-foreground">
          Failed to load testimonials. Please try again later.
        </div>
      </div>
    )
  }

  // Transform testimonials to match the Slider component's expected format
  const formattedTestimonials = testimonials.map(testimonial => ({
    _id: testimonial._id,
    quote: testimonial.quote,
    author: {
      _id: testimonial._id,
      _title: testimonial.author,
      role: testimonial.role || "Client",
      company: {
        _title: testimonial.company || "Company",
        image: { url: "", alt: "" }
      },
      image: { url: "", alt: "" }
    }
  }))

  return (
    <div className="border-l-[1px] border-r-[1px] border-border py-12">
      <div id='title' className='w-full flex justify-center mb-12'>
        <h2 className="font-semibold text-center relative z-20 py-6 bg-clip-text text-transparent bg-black dark:bg-gradient-to-b dark:from-neutral-800 dark:via-white dark:to-white">
          Results speak louder <br/> than words
        </h2>
      </div>

      {testimonials.length > 0 ? (
        <Slider quotes={formattedTestimonials}/>
      ) : (
        <div className="text-center text-muted-foreground py-12">
          No testimonials available at the moment.
        </div>
      )}
    </div>
  )
}
