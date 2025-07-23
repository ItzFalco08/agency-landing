import { Slider } from "@/components/ui/Slider";

const dummyQuotes = [
  {
    _id: "1",
    quote: "Working with this agency completely transformed our online presence and digital strategy. The stunning website they built increased our leads by 300% within the first month of launch.",
    author: {
      _id: "author1", 
      _title: "Sarah Johnson",
      role: "CEO",
      company: {
        _title: "TechStartup Inc.",
        image: { url: "", alt: "" }
      },
      image: { url: "", alt: "" }
    }
  },
  {
    _id: "2", 
    quote: "Their innovative mobile app development process exceeded our wildest expectations. The intuitive, user-friendly design helped us successfully launch our startup and attract thousands of users.",
    author: {
      _id: "author2",
      _title: "Michael Chen", 
      role: "Founder",
      company: {
        _title: "AppVenture",
        image: { url: "", alt: "" }
      },
      image: { url: "", alt: "" }
    }
  },
  {
    _id: "3",
    quote: "The comprehensive digital marketing campaigns they created and executed brought us high-quality, qualified leads consistently month after month. The ROI has been absolutely incredible and beyond our projections.", 
    author: {
      _id: "author3",
      _title: "Emily Rodriguez",
      role: "Marketing Director", 
      company: {
        _title: "GrowthCo",
        image: { url: "", alt: "" }
      },
      image: { url: "", alt: "" }
    }
  },
  {
    _id: "4",
    quote: "Highly professional, incredibly responsive, and delivered exactly what we needed on time and within budget. Our custom software solution works flawlessly and has streamlined our entire operation.",
    author: {
      _id: "author4", 
      _title: "David Thompson",
      role: "CTO",
      company: {
        _title: "DataFlow Systems", 
        image: { url: "", alt: "" }
      },
      image: { url: "", alt: "" }
    }
  },
  {
    _id: "5",
    quote: "From initial concept to successful launch, they expertly guided us through every step of the development process. Our e-commerce platform is now generating consistent 6-figure revenue every quarter.",
    author: {
      _id: "author5",
      _title: "Lisa Wang",
      role: "Owner", 
      company: {
        _title: "Fashion Forward",
        image: { url: "", alt: "" }
      },
      image: { url: "", alt: "" }
    }
  }
];

export function Testimonials() {
  return (
      <div className="border-l-[1px] border-r-[1px] border-border  py-12 ">
        <div id='title' className='w-full flex justify-center mb-12'>
          <h2 className="font-semibold text-center  relative z-20 py-6 bg-clip-text text-transparent bg-black dark:bg-gradient-to-b dark:from-neutral-800 dark:via-white dark:to-white">
          Results speak louder <br/> than words
          </h2>
        </div>

        <Slider quotes={dummyQuotes}/>
      </div>
  );
}
