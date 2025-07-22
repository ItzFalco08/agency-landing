import BottomShadow from "@/components/BottomShadow";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import Bento from "@/components/home/Bento";
import { SmoothScroll } from "@/utility/SmoothScroll";

export default function Home() {
  return (
    <div className="">
      <SmoothScroll/>
      <Hero/>
      <Bento/>
      {/* <Footer/> */}

      <BottomShadow/>
    </div>
  );
}
