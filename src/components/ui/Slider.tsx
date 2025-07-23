"use client";
import { type EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import { Button } from "@/components/ui/button";

// Type for quote data structure
type QuoteData = {
  _id: string;
  quote: string;
  author: {
    _id: string;
    _title: string;
    role: string;
    company: {
      _title: string;
      image: { url: string; alt: string };
    };
    image: { url: string; alt: string };
  };
};

export function Slider({ quotes }: { quotes: QuoteData[]; }) {

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    breakpoints: {
      640: {
        align: "center",
      },
    },
  });

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const onDotButtonClick = React.useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onInit = React.useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = React.useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 px-4 md:px-0 max-w-3xl mx-auto">

      <div className="w-full flex justify-end md:mb-4 items-center">

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4 ">
          <Button
            variant="outline"
            size="icon"
            aria-label="Previous testimonial"
            className="size-10 cursor-pointer"
            onClick={scrollPrev}
          >
            <ChevronLeft className="size-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            aria-label="Next testimonial"
            className="size-10 cursor-pointer"
            onClick={scrollNext}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>



      <div className="embla w-full self-stretch">
        <div className="embla__viewport w-full overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {quotes.map((testimonial) => (
              <TesimonialCard key={testimonial._id} {...testimonial} />
            ))}
          </div>
        </div>



        <div className="flex items-center justify-center gap-2 pt-12 ">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={clsx(
                "size-2 rounded-full transition-colors",
                index === selectedIndex
                  ? "bg-neutral-900 dark:bg-neutral-100"
                  : "bg-neutral-300 dark:bg-neutral-700"
              )}
              onClick={() => onDotButtonClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function VainillaCard({ quote, author }: QuoteData) {
  return (
    <div className="min-w-0 max-w-full shrink-0 grow-0 basis-[min(740px,100%)] self-stretch md:pr-10">
      <article className="embla__slide flex h-full w-full min-w-0 transform touch-pan-y touch-pinch-zoom select-none flex-col rounded-xl border border-border [backface-visibility:hidden]">
        <div className="flex flex-1 items-start border-b border-border px-5 py-[18px] md:px-8 md:py-7">
          <blockquote className="text-pretty text-xl font-extralight leading-[135%] text-neutral-900 dark:text-neutral-100 sm:text-2xl md:text-3xl">
            &ldquo;{quote}&rdquo;
          </blockquote>
        </div>
        <div className="flex items-center gap-4 pl-5">
          <div className="flex flex-1 items-center gap-5 border-r border-border py-4">
            <div className="hidden size-16 rounded-full bg-neutral-200 dark:bg-neutral-800 md:block" />
            <div className="flex flex-1 flex-col">
              <h5 className="text-base font-medium md:text-lg">{author._title}</h5>
              <p className="text-pretty text-sm text-neutral-600 dark:text-neutral-400 md:text-base">
                {author.role}, {author.company._title}
              </p>
            </div>
          </div>
          <div className="pr-5">
            <div className="w-12 h-12 bg-neutral-200 dark:bg-neutral-800 rounded md:w-16 md:h-16" />
          </div>
        </div>
      </article>
    </div>
  );
}

export const TesimonialCard = React.memo(
  VainillaCard,
  (prevProps, nextProps) =>
    prevProps.quote === nextProps.quote && prevProps.author === nextProps.author,
);
