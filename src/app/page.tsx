import BottomShadow from "@/components/BottomShadow";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import Bento from "@/components/home/Bento";
import { SmoothScroll } from "@/utility/SmoothScroll";
import Faq from "@/components/home/Faq";
import Projects from "@/components/home/Projects";
import { Testimonials } from "@/components/home/Testimonials";
import TechStack from "@/components/home/TechStack";
import Team from "@/components/home/Team";
import Cta from "@/components/home/Cta";

export default function Home() {
  return (
    <div className="">
      <SmoothScroll/>
      <Hero/>

      <div className='relative container '>
        <Bento/>
        <Projects/>
        <TechStack/>
        <Testimonials/>
        <Team/>
        <Faq/>
      </div>
      {/* <Cta/> */}
      <div className="relative container z-[101]">
        <Footer/>
      </div>

      <BottomShadow/>
    </div>
  );
}
