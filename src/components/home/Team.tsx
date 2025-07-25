"use client";
import { type EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import * as React from "react";
import { ChevronLeft, ChevronRight, Mail, User, MapPin, Calendar, Loader2 } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePublicData } from "@/hooks/usePublicData";



interface TeamMember {
  _id: string
  name: string
  role: string
  email?: string
  bio: string
  avatar?: string
  joinedYear?: string
  location?: string
}

function TeamSlider({ members }: { members: TeamMember[] }) {

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
    <div className="flex w-full flex-col items-center justify-center gap-10 px-4 lg:px-0 max-w-4xl mx-auto">

      <div className="w-full flex justify-end lg:mb-4 items-center">

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4 ">
          <Button
            variant="outline"
            size="icon"
            aria-label="Previous team member"
            className="size-10 cursor-pointer"
            onClick={scrollPrev}
          >
            <ChevronLeft className="size-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            aria-label="Next team member"
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
            {members.map((member) => (
              <TeamCard key={member._id} {...member} />
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

export function VanillaTeamCard({ _id, name, role, email, avatar, joinedYear, location }: TeamMember) {
  return (
    <div className="min-w-0 max-w-full shrink-0 grow-0 basis-[min(400px,100%)] self-stretch lg:pr-6">
      <article className="embla__slide flex h-full w-full min-w-0 transform touch-pan-y touch-pinch-zoom select-none flex-col rounded-xl border border-border [backface-visibility:hidden]   transition-colors">
        <div className="flex flex-1 flex-col p-6 relative">
          {/* Profile Section */}
          <div className="flex flex-col items-center text-center mb-6">
            {/* Profile Icon/Avatar */}
            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center border-2 border-primary/20 mb-4 overflow-hidden">
              {avatar ? (
                <Image
                  src={avatar}
                  alt={`${name} avatar`}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-8 h-8 text-primary/70" />
              )}
            </div>

            {/* Name */}
            <h3 className="text-xl font-regular text-foreground mb-2">
              {name}
            </h3>
            
            {/* Role - Enhanced hierarchy */}
            <div className="bg-primary/10 px-3 py-1 rounded-full mb-6">
              <p className="text-primary text-sm font-regular">
                {role}
              </p>
            </div>
          </div>

          {/* Details - Only show for non-CEO */}
          {_id !== "1" && (
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground mb-4">
              {joinedYear && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>Joined {joinedYear}</span>
                </div>
              )}
              {location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{location}</span>
                </div>
              )}
            </div>
          )}

          {/* CEO special info */}
          {_id === "1" && location && (
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-4">
              <MapPin className="w-3 h-3" />
              <span>{location}</span>
            </div>
          )}
          
          {/* Email Contact */}
          {email && (
            <div className="absolute justify-center pt-4 top-0 left-4">
              <Link
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group/email w-10 h-10 justify-center bg-primary/5 rounded-full hover:bg-primary/10"
              >
                <Mail className="w-4 h-4 group-hover/email:scale-110 transition-transform" />
              </Link>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}

export const TeamCard = React.memo(
  VanillaTeamCard,
  (prevProps, nextProps) =>
    prevProps.name === nextProps.name && prevProps.role === nextProps.role,
);

function Team() {
  const { teamMembers, loading, error } = usePublicData()

  if (loading) {
    return (
      <section className="border-l-[1px] border-r-[1px] border-border py-12">
        <div id='title' className='w-full flex justify-center mb-12'>
          <h2 className="font-semibold text-center relative z-20 py-6 bg-clip-text text-transparent bg-black dark:bg-gradient-to-b dark:from-neutral-800 dark:via-white dark:to-white">
            Meet Our Team
          </h2>
        </div>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="border-l-[1px] border-r-[1px] border-border py-12">
        <div id='title' className='w-full flex justify-center mb-12'>
          <h2 className="font-semibold text-center relative z-20 py-6 bg-clip-text text-transparent bg-black dark:bg-gradient-to-b dark:from-neutral-800 dark:via-white dark:to-white">
            Meet Our Team
          </h2>
        </div>
        <div className="text-center text-muted-foreground">
          Failed to load team members. Please try again later.
        </div>
      </section>
    )
  }

  return (
    <section className="border-l-[1px] border-r-[1px] border-border py-12">
      <div id='title' className='w-full flex justify-center mb-12'>
        <h2 className="font-semibold text-center relative z-20 py-6 bg-clip-text text-transparent bg-black dark:bg-gradient-to-b dark:from-neutral-800 dark:via-white dark:to-white">
          Meet Our Team
        </h2>
      </div>

      {teamMembers.length > 0 ? (
        <TeamSlider members={teamMembers} />
      ) : (
        <div className="text-center text-muted-foreground py-12">
          No team members available at the moment.
        </div>
      )}

      {/* Join Team CTA */}
      <div className="text-center mt-16 max-w-4xl mx-auto px-4 lg:px-0">
        <div className="bg-card dark:bg-neutral-950 rounded-2xl border p-8">
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-semibold mb-4">Want to Join Our Team?</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              We&apos;re always looking for talented people to join our growing team. 
            </p>
            <a
              href="mailto:careers@weanovas.co.in"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-full font-medium hover:bg-primary/90 transition-colors group"
            >
              Get In Touch
              <Mail className="w-4 h-4 transition-all ease-out group-hover:ml-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Team
